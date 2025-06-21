from flask import Flask, render_template, request, redirect, url_for, session, jsonify
import json
import os

app = Flask(__name__)
app.secret_key = 'supersecretkey'  # Replace this with a secure key in production

# Load character data
with open('data/characters.json', 'r', encoding='utf-8') as f:
    characters = json.load(f)

# Load user data
USERS_FILE = 'data/users.json'
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
    return render_template('index.html', user=session.get('user'))

@app.route('/character')
def character():
    return render_template('character.html', user=session.get('user'))

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
            return render_template('login.html', error="Invalid credentials")
    return render_template('login.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        users = load_users()
        if username in users:
            return render_template('signup.html', error="Username already exists")
        users[username] = password
        save_users(users)
        session['user'] = username
        return redirect(url_for('home'))
    return render_template('signup.html')

@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('home'))

@app.route('/about')
def about():
    return render_template('about.html', user=session.get('user'))

# Subpages under About
@app.route('/about/<section>')
def about_section(section):
    valid_sections = ['affiliation', 'status', 'relationships', 'skills', 'troops', 'weapons']
    if section in valid_sections:
        return render_template(f'about/{section}.html', user=session.get('user'))
    return redirect(url_for('about'))

# API for character data (optional use in frontend)
@app.route('/api/characters')
def get_characters():
    return jsonify(characters)

if __name__ == '__main__':
    app.run(debug=True)

from flask import Flask, render_template, request, redirect, url_for, session, flash

app.secret_key = 'your-secret-key'

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        # Your signup logic here (store to DB etc.)
        session['user'] = request.form['username']
        return redirect(url_for('index'))  # This auto-closes the signup page
    return render_template('signup.html')
