
from flask import render_template, jsonify, request

'''
    HTTP API Endpoints
'''
def register_http(app):
    @app.route('/')
    def handle_root():
        return render_template('index.html')

    '''
        process an image sent by the user
    '''
    @app.route("/images/process/", methods=["POST"])
    def handle_process_image():

        # the image is expected to be sent in the body of the request as raw binary bytes of a JPEG image
        img_data = request.data

        # do some AI stuff with the image
        detection_result = process_image(img_data)

        return jsonify(detection_result)

    '''
        fake function that applies computer vision or AI processing on the image, and returns the detetction result
    '''
    def process_image(img):
        return {"Detections": [2, 2, 3, 4]}
