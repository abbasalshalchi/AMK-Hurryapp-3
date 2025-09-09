import os
from flask import Flask, jsonify, render_template

# Create app
app = Flask(__name__)

# This is your health check route from your original main.py
@app.route("/healthz")
def healthz():
    return jsonify({"status": "ok"}), 200

# This is your root route from http_server.py
@app.route('/')
def handle_root():
    # We will return a simple JSON response instead of rendering a template
    # to avoid needing the /templates folder for this test.
    return jsonify({"message": "Minimal app is running!"})

# This is the standard run block for local development
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)