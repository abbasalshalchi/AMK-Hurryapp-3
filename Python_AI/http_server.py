
from flask import render_template, jsonify, request, Response
import cv2
import numpy as np

'''
    HTTP API Endpoints
'''
def register_http(app):
    '''
        Health check route
    '''
    @app.route("/healthz")
    def healthz():
        return jsonify({"status": "ok"}), 200
    
    '''
        Root route
    '''
    @app.route('/')
    def handle_root():
        return render_template('index.html')
    
    '''
        Process an image sent by the user
    '''
    @app.route("/images/process/", methods=["POST"])
    def handle_process_image():
        # the image is expected to be sent in the body of the request as raw binary bytes of a JPEG image
        img_data = request.data

        # Convert bytes → numpy array → OpenCV image
        nparr = np.frombuffer(img_data, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if img is None:
            return jsonify({"error": "Invalid image"}), 400

        # Convert to grayscale
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

        # Encode grayscale image back to JPEG
        success, encoded_img = cv2.imencode(".jpg", gray)
        if not success:
            return jsonify({"error": "Failed to encode image"}), 500

        # Return JPEG as response
        return Response(encoded_img.tobytes(), mimetype="image/jpeg")
