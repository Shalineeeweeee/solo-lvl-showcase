from flask import Flask, render_template, request, redirect, url_for, session, jsonify
import json
import os

app = Flask(__name__)
app.secret_key = 'super-secret-key'

# Load characters
with open('data/characters.json', 'r', encoding='utf-8') as f:
    characters = json.load(f)


@app.route('/')
def home():
    return render_template('index.html', user=session.get('user'), theme_class=session.get('theme', 'theme-jinwoo'))


@app.route("/character")
def character():
    return render_template("character_selector.html", characters=characters, default_key="sung-jin-woo")



@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        with open('data/users.json', 'r') as f:
            users = json.load(f)
        if username in users and users[username] == password:
            session["user"] = username
            return redirect(url_for("home"))
        else:
            return render_template("login.html", error="Invalid credentials", hide_nav=True)
    return render_template("login.html", hide_nav=True)

@app.route("/signup", methods=["GET", "POST"])
def signup():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        with open('data/users.json', 'r') as f:
            users = json.load(f)
        if username in users:
            return render_template("signup.html", error="Username already exists", hide_nav=True)
        users[username] = password
        with open('data/users.json', 'w') as f:
            json.dump(users, f, indent=4)
        session["user"] = username
        return redirect(url_for("home"))
    return render_template("signup.html", hide_nav=True)

@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('home'))

@app.route('/set-theme')
def set_theme():
    theme = request.args.get("theme")
    if theme:
        session['theme'] = theme
    return '', 204

@app.context_processor
def inject_user():
    return dict(user=session.get('user'))

if __name__ == '__main__':
    app.run(debug=True)






