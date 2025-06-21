from flask import Flask, render_template, request, redirect, url_for, session, jsonify
import json
import os

app = Flask(__name__)
app.secret_key = 'super-secret-key'  # Change this in production

# Paths
USERS_FILE = 'data/users.json'

# Load data
with open('data/characters.json', 'r', encoding='utf-8') as f:
    characters = json.load(f)

def load_users():
    if os.path.exists(USERS_FILE):
        with open(USERS_FILE, 'r') as f:
            return json.load(f)
    return {}

def save_users(users):
    with open(USERS_FILE, 'w') as f:
        json.dump(users, f, indent=4)

@app.route('/')
def home():
    return render_template('index.html', user=session.get('user'), theme_class=session.get('theme', 'theme-jinwoo'))

@app.route('/character')
def character():
    return render_template('character.html', user=session.get('user'), theme_class=session.get('theme', 'theme-jinwoo'))

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        users = load_users()
        if username in users:
            return render_template('signup.html', error="Username already exists", hide_nav=True, theme_class=session.get('theme', 'theme-jinwoo'))
        users[username] = password
        save_users(users)
        session['user'] = username
        return redirect(url_for('home'))
    return render_template('signup.html', hide_nav=True, theme_class=session.get('theme', 'theme-jinwoo'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        users = load_users()
        if username in users and users[username] == password:
            session['user'] = username
            return redirect(url_for('home'))
        else:
            return render_template('login.html', error="Invalid credentials", hide_nav=True, theme_class=session.get('theme', 'theme-jinwoo'))
    return render_template('login.html', hide_nav=True, theme_class=session.get('theme', 'theme-jinwoo'))

@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('home'))

@app.route('/about')
def about():
    return render_template('about.html', user=session.get('user'))

@app.route('/about/<section>')
def about_section(section):
    valid_sections = ['affiliation', 'status', 'relationships', 'skills', 'troops', 'weapons']
    if section in valid_sections:
        return render_template(f'about/{section}.html', user=session.get('user'))
    return redirect(url_for('about'))

@app.route('/api/characters')
def get_characters():
    return jsonify(characters)

@app.route("/set-theme")
def set_theme():
    theme = request.args.get("theme", "jinwoo")
    session["theme"] = f"theme-{theme}"
    return '', 204

if __name__ == '__main__':
    app.run(debug=True)

