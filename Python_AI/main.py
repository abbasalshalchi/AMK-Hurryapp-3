# 1. Import necessary modules
import logging
import os
from flask import Flask, request, jsonify
from flask_socketio import SocketIO
from flask_cors import CORS

from http_server import register_http
from websocket_server import register_websocket

import eventlet
eventlet.spawn_after(30, lambda: print(">>> Heartbeat alive"))

# 2. Configure basic logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Debug: mark import start
print(">>> Starting Flask-SocketIO app import...")

# Create app + socketio
app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'

# Enable CORS for HTTP routes
CORS(app)

# Enable CORS for Websockets
socketio = SocketIO(app, cors_allowed_origins="*")

# Debug: confirm app and socketio created
print(">>> Flask app and SocketIO initialized")

# 3. Add a logging middleware for all requests
@app.after_request
def log_request_info(response):
    """Logs information about each request."""
    app.logger.info(
        f'Request: {request.method} {request.path} - '
        f'Status: {response.status_code}'
    )
    return response

# 4. Add health check route (important for Railway)
@app.route("/healthz")
def healthz():
    return jsonify({"status": "ok"}), 200

# Initialize routes and websocket handlers (register them)
register_http(app)
print(">>> HTTP routes registered")

register_websocket(socketio)
print(">>> Websocket handlers registered")

'''
    Main Entry

    local dev only (Railway will use Gunicorn instead)
'''
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    print(f">>> Running on http://0.0.0.0:{port}")
    # Use eventlet or gevent for production
    socketio.run(app, host="0.0.0.0", port=port)
