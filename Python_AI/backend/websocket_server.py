
from flask import request
from flask_socketio import emit, join_room

# Dictionary to store users and their assigned rooms
users = {}

def register_websocket(socketio):
    '''
        Handle new user joining
    '''
    @socketio.on('join')
    def handle_join(username):
        users[request.sid] = username  # Store username by session ID
        join_room(username)  # Each user gets their own "room"
        emit("message", f"{username} joined the chat", room=username)

    '''
        Handle user messages
    '''
    @socketio.on('message')
    def handle_message(data):
        username = users.get(request.sid, "Anonymous")  # Get the user's name
        emit("message", f"{username}: {data}", broadcast=True)  # Send to everyone

    '''
        Handle disconnects
    '''
    @socketio.on('disconnect')
    def handle_disconnect():
        username = users.pop(request.sid, "Anonymous")
        emit("message", f"{username} left the chat", broadcast=True)
