import time
import requests

# ===== User config =====
# The URL of the Node.js backend that will receive the image and PIN.
BACKEND_URL = "http://127.0.0.1:4000/api/v1/hardware/fingerprint"
MAX_RETRIES = 3
RETRY_DELAY_SECONDS = 2

def send_fingerprint_and_pin(pin: str, image_data: bytes) -> bool:
    """
    Sends the captured fingerprint image and session PIN to the backend.

    Args:
        pin: The session PIN generated at launch.
        image_data: The raw bytes of the captured fingerprint image.

    Returns:
        True if the data was sent and acknowledged successfully, False otherwise.
    """
    print(f"Attempting to send fingerprint and PIN to backend at {BACKEND_URL}...")

    headers = {
        'Content-Type': 'image/bmp',
        'pin': pin  # Send the PIN as a custom header
    }

    for attempt in range(MAX_RETRIES):
        try:
            # Send the raw image data in the request body.
            response = requests.post(BACKEND_URL, data=image_data, headers=headers, timeout=10)

            # Check if the server responded with a success status code (e.g., 200 OK).
            if 200 <= response.status_code < 300:
                print("Backend successfully processed the fingerprint.")
                return True
            else:
                print(f"Backend responded with an error: {response.status_code} - {response.text}")

        except requests.exceptions.RequestException as e:
            # Handle network errors like connection refused, timeouts, etc. [cite: 122]
            print(f"An error occurred while trying to contact the backend: {e}")

        if attempt < MAX_RETRIES - 1:
            print(f"Retrying in {RETRY_DELAY_SECONDS} seconds... (Attempt {attempt + 2}/{MAX_RETRIES})")
            time.sleep(RETRY_DELAY_SECONDS)

    return False