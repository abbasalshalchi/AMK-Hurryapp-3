import os
from flask import Flask, jsonify, render_template
from http_server import register_http

# Create app
app = Flask(__name__)

register_http(app)

# This is the standard run block for local development
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host="::", port=port)
