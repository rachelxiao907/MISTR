# MISTR: Rachel Xiao, Michelle Lo, Theo Fahey, Sadid Ethun
# SoftDev
# P04 -- Le Fin
# 2022-05-27

from flask import Flask, request, redirect, render_template, session
import db

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
	# if logged_in():
	#     return redirect("/")

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
	# if logged_in():
	# 	return redirect("/")

	# Default page
	if request.method == "GET":
		return render_template("register.html")

	# Check sign up
	user = request.form["newusername"]
	pwd = request.form["newpassword"]
	if user.strip() == "" or pwd.strip == "":
		return render_template("register.html", explain="Username or Password cannot be blank")

	# Add user information if passwords match
	if (request.form["newpassword"] != request.form["newpassword1"]):
		return render_template("register.html", explain="The passwords do not match")

	register_success = db.register_user(user, pwd) #checks if not successful in the database file
	if not register_success:
		return render_template("register.html", explain="Username already exists")
	else:
		return redirect("/login")


@app.route("/game")
def game():
    return render_template("game.html")


if __name__ == "__main__":
    app.debug = True
    app.run()
