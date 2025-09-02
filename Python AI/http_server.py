
from flask import Flask, jsonify, request

app = Flask(__name__)

'''
    HTTP API Endpoints
'''
@app.route("/", methods=["GET"])
def handle_root():
    return "Hello world!, this is the root."

'''
    process an image sent by the user
'''
@app.route("/images/process/", methods=["POST"])
def handle_process_image(img):

    # the image is expected to be sent in the body of the request as raw binary bytes of a JPEG image
    img_data = request.data

    # do some AI stuff with the image
    detection_result = process_image(img_data)

    return jsonify(detection_result)

'''
    fake function that applies computer vision or AI processing on the image, and returns the detetction result
'''
def process_image(img):
    return {"Detections": [1, 2, 3, 4]}

'''
    Main Entry
'''
if __name__ == "__main__":
    app.run(debug=True)
