import axios from 'axios';
import logger from '../utils/logger.js';

// Get the Python backend URL from environment variables
const PYTHON_BACKEND_URL = process.env.PYTHON_BACKEND_URL;

export const processImage = async (req, res) => {
  try {
    // Check if the request body is present
    if (!req.body || req.body.length === 0) {
      return res.status(400).json({ message: "No image data received." });
    }
    
    logger.info('Forwarding image processing request to Python backend...');
    // Forward the raw image data to the Python backend
    const pythonResponse = await axios.post(
      `${PYTHON_BACKEND_URL}/images/process`,
      req.body,
      {
        headers: {
          'Content-Type': req.get('Content-Type')
        },
        // 1. This tells axios to receive the data as a binary buffer
        responseType: 'arraybuffer' 
      }
    );
    // 2. MODIFIED: Log the size instead of the raw data to avoid garbled text
    logger.info(`Received response from Python backend. Image size: ${pythonResponse.data.length} bytes`);
    // Send the response from the Python backend back to the original client
    // 3. MODIFIED: Set the correct content-type header and send the raw buffer
    res.set('Content-Type', pythonResponse.headers['content-type']);
    res.status(pythonResponse.status).send(pythonResponse.data);
    
  } catch (error) {
    console.error("Error forwarding request to Python backend:", error.message);

    // Handle errors, such as if the Python service is down
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return res.status(error.response.status).json({
        message: "Error from Python backend.",
        error: JSON.parse(Buffer.from(error.response.data).toString('utf8'))
      });
    } else if (error.request) {
      // The request was made but no response was received
      return res.status(503).json({
        message: "Python backend is unavailable or not responding.",
      });
    } else {
      // Something happened in setting up the request that triggered an Error
      res.status(500).json({
        message: "An internal error occurred in the Node.js bridge.",
        error: error.message
      });
    }
  }
};
