# MISTR: Rachel Xiao, Michelle Lo, Theo Fahey, Sadid Ethun
# SoftDev
# P04 -- Le Fin
# 2022-05-27

from flask import Flask, request, redirect, render_template, session

app = Flask(__name__)
app.secret_key = "foo"

@app.route("/")
def home():
    return render_template("login.html")

if __name__ == "__main__":
    app.debug = True
    app.run()