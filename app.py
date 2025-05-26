from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__)

# Basic route to serve the main HTML page
@app.route('/')
def index():
    return render_template('index.html')

# Route to serve static files (CSS, JS, images)
# This is usually handled automatically by Flask for 'static' folder,
# but it's good to be explicit if you encounter issues or have complex paths.
# However, for this setup, Flask's default static handling should work.
# @app.route('/static/<path:filename>')
# def static_files(filename):
#     return send_from_directory(os.path.join(app.root_path, 'static'), filename)

if __name__ == '__main__':
    app.run(debug=True) # debug=True is good for development, disable in production