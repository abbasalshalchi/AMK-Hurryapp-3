import os
from flask import Flask, jsonify, render_template
from http_server import register_http

# Create app
app = Flask(__name__)

register_http(app)

# This is your health check route from your original main.py
@app.route("/healthz")
def healthz():
    return jsonify({"status": "ok"}), 200

# This is your root route from http_server.py t
@app.route('/')
def handle_root():
    # We will return a simple JSON response instead of rendering a template
    # to avoid needing the /templates folder for this test.
    return render_template('index.html')

# This is the standard run block for local development
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host="::", port=port)
#
# from flask import Flask, render_template
#
# app = Flask(__name__)
#
# @app.route('/')
# def index():
#   return render_template('index.html')
#
# if __name__ == '__main__':
#   app.run(port=5000)