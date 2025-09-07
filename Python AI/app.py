
from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS

from http_server import register_http
from websocket_server import register_websocket

# Create app + socketio
app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'

# Enable CORS for HTTP routes
CORS(app)

# Enable CORS for Websockets
socketio = SocketIO(app, cors_allowed_origins="*")

# Initialize routes and websocket handlers (register them)
register_http(app)
register_websocket(socketio)

'''
    Main Entry

    local dev only (Railway will use Gunicorn instead)
'''
if __name__ == '__main__':
    socketio.run(app, debug=True, allow_unsafe_werkzeug=True)
