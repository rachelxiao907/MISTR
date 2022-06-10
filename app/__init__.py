# MISTR: Rachel Xiao, Michelle Lo, Theo Fahey, Sadid Ethun
# SoftDev
# P04 -- Le Fin
# 2022-05-27

from flask import Flask, request, redirect, render_template, session, jsonify
import db
import json


app = Flask(__name__)
app.secret_key = "foo"


def logged_in():
    return "user" in session


@app.route("/")
def home():
    return render_template("login.html")


@app.route("/login", methods=['GET', 'POST'])
def login():
	"""
	Retrieves user login inputs and checks it against the "users" database table.
	Brings user to home page after successful login.
	"""
	if logged_in():
	    return redirect("/game")

	if request.method == "GET": #just getting to the page with no inputs
		return render_template("login.html")

	username = request.form["username"]
	password = request.form["password"]

	if username.strip() == "" or password.strip() == "":
		return render_template("login.html", explain="Username or Password cannot be blank")

	# Verify this user and password exists
	user_id = db.fetch_user_id(username, password)
	if user_id is None:
		return render_template("login.html", explain="Username or Password is incorrect")

	# Adds user and user id to session if all is well
	session["user"] = db.fetch_username(user_id)
	session["user_id"] = user_id

	return redirect("/game")


@app.route("/register", methods=['GET', 'POST'])
def register():
	"""
	Retrieves user inputs from signup page.
	Checks it against the database to make sure the information is unique.
	Adds information to the "users" database table.
	"""
	if logged_in():
		return redirect("/game")

	# Default page
	if request.method == "GET":
		return render_template("register.html")

	# Check sign up
	user = request.form["new_username"]
	pwd = request.form["new_password"]
	if user.strip() == "" or pwd.strip == "":
		return render_template("register.html", explain="Username or Password cannot be blank")

	# Add user information if passwords match
	if (request.form["new_password"] != request.form["confirm_password"]):
		return render_template("register.html", explain="The passwords do not match")

	register_success = db.register_user(user, pwd) #checks if not successful in the database file
	if not register_success:
		return render_template("register.html", explain="Username already exists")
	else:
		return redirect("/login")


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/logout")
def logout():
	"""
	Removes user from session.
	"""
	if logged_in():
		session.pop("user")
		session.pop("user_id")
	return redirect("/")


@app.route("/game", methods=['GET', 'POST'])
def game():
    if request.method == "GET":
        return render_template("lobby.html")
    elif request.method == "POST":
        code = request.form["code"]
        if code == "": #if no code is entered, assume user is creating a game
            code = db.create_game(session["user"])
            session["game_id"] = code
            turn = db.fetch_turn(session["game_id"])
            latest_chat = db.fetch_latest_chat(session["game_id"])
            print("latest chat from game: " + latest_chat)
            return render_template("game.html", code=code, latest_chat=latest_chat, turn=turn, user=session["user"])
        else:
            session["game_id"] = code
            turn = db.fetch_turn(session["game_id"])
            joined = db.join_game(code, session["user"])
            if joined:
                latest_chat = db.fetch_latest_chat(session["game_id"])
                print("latest chat from game: " + latest_chat)
                return render_template("game.html", code=code, latest_chat=latest_chat, turn=turn, user=session["user"])
            else:
                return render_template("lobby.html", explain="Game is full or doesn't exist")


@app.route("/chatbox", methods=['GET', 'POST'])
def chatbox():
    print(request.method)
    if request.method == "POST":
        msg = request.get_json()['usermsg']
        db.add_message(session["game_id"], session["user"], msg)
        return db.fetch_latest_chat(session["game_id"])


@app.route("/updating_chat", methods=['GET', 'POST'])
def updating_chat():
    latest_chat = db.fetch_latest_chat(session["game_id"])
    json = jsonify({
        "chat": latest_chat
    })
    return json

@app.route("/turn_process", methods=['GET', 'POST'])
def update_turn():
    db.update_turn(session["game_id"])
    print("turn: " + db.fetch_turn(session["game_id"]))
    return "true"


@app.route("/firstclick", methods=['GET', 'POST'])
def firstClick():
	if request.method == "POST":
		char_name = request.get_json()['char_name']
		db.choose_character(session["game_id"], session["user"], char_name)
		return ""

@app.route("/select_process", methods=['GET', 'POST'])
def select_process():
    print("asfdsasdf")
    chosen = db.fetch_otherchosen(session["user"], session["game_id"])
    json = jsonify({
        "chosen": chosen
    })
    return json

@app.route("/win", methods=['GET', 'POST'])
def win():
    db.update_win(session['user'], session['game_id'])
    print("winner: " + db.fetch_winner(session["game_id"]))
    if request.method == "POST":
        print("does this work??")
        is_win = request.get_json()['win']

        print("is_win: " + str(is_win))
        if (is_win):
            print("stuff happens here??")
            return redirect("/gameover")
        else:
            print("or here??")
            return redirect("/gameover")
    return render_template("gameover.html")

@app.route("/iswin_process", methods=['GET', 'POST'])
def iswin():
    print("iswin processing")
    json = jsonify({
        "winner": db.fetch_winner(session["game_id"]),
        "username": session['user']
    })
    return json

@app.route("/gameover", methods=['GET', 'POST'])
def gameover():
    winner = db.fetch_winner(session["game_id"]);
    return render_template("gameover.html", winner=winner);

if __name__ == "__main__":
    app.debug = True
    app.run()
