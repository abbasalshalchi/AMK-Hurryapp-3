import logger from "../utils/logger.js"
import Fingerprint from "../models/fingerprint.model.js"

export const addFingerPrint = async (pin, image) => {
  logger.info(`Attempting to add fingerprint with pin: ${pin}`);

  try {
    const newFingerprint = await Fingerprint.create({pin, name:"joe"});

    logger.info(`Fingerprint created successfully with pin: ${newFingerprint._id} and pin: ${newFingerprint.pin}`);
    return newFingerprint;
  } catch (error) {
    logger.error(`Error creating fingerprint: ${error.message}`);
  }
};

export const getFingerPrintsByPin = async (pin) => {
  logger.debug(`Attempting to fetch fingerprint with ID: ${pin}`);
  try {
    // Find a single fingerprint by its ID, ensuring it's active
    const fingerprints = await Fingerprint.find({ pin });

    if (!fingerprints) {
      logger.warn(
        `fingerprint fetch failed: fingerprint not found or inactive with pin ${pin}.`
      );
      const error = new Error("fingerprint not found.");
      error.statusCode = 404; // Not Found
      logger.error("fingerprint not found.")
    }

    logger.debug(`fingerprint fetched successfully: ${pin}`);
    return fingerprints;
  } catch (error) {
    logger.error(
      `Error fetching fingerprint with ID ${pin}: ${error.message}`
    );
    // Re-throw the error, preserving statusCode if set (like the 404)
    if (!error.statusCode) {
      error.statusCode = 500;
      error.message = error.message || "Error retrieving fingerprint.";
    }
    throw error;
  }
};

// import logger from "../utils/logger.js";
// import Fingerprint from "../models/fingerprint.model.js";
// import axios from 'axios';

// // Get the Python backend URL from environment variables
// const PYTHON_BACKEND_URL = process.env.PYTHON_BACKEND_URL;

// export const addFingerPrint = async (pin, image) => {
//   logger.info(`Attempting to add fingerprint for pin: ${pin}`);
//   if (!PYTHON_BACKEND_URL) {
//     throw new Error("PYTHON_BACKEND_URL environment variable is not set.");
//   }
//   try {
//     // Step 1: Send fingerprint image to Python backend for verification and identification.
//     logger.info('Forwarding fingerprint to Python backend for identification...');
//     const pythonResponse = await axios.post(
//       `${PYTHON_BACKEND_URL}/fingerprints/verify`, // Endpoint to identify fingerprint
//       image, // Raw image buffer
//       {
//         headers: {
//           'Content-Type': 'application/octet-stream' // Assuming raw binary data
//         },
//         responseType: 'json' // Expecting a JSON response, e.g., { "name": "john_doe" }
//       }
//     );

//     const { name } = pythonResponse.data;

//     if (!name) {
//       logger.error('Python backend did not return a name for the fingerprint.');
//       throw new Error('Could not identify fingerprint.');
//     }

//     logger.info(`Python backend identified fingerprint as belonging to: ${name}`);

//     // Step 2: Create a new fingerprint record with the identified name and the user's pin.
//     const newFingerprint = await Fingerprint.create({ pin, name });

//     logger.info(`Fingerprint created successfully for user '${name}' with ID: ${newFingerprint._id}`);
//     return newFingerprint;
//   } catch (error) {
//     logger.error(`Error adding fingerprint: ${error.message}`);
//     if (error.response) {
//       // The request was made and the server responded with a status code
//       // that falls out of the range of 2xx
//       logger.error(`Python backend responded with status: ${error.response.status}`);
//       logger.error(`Response data: ${JSON.stringify(error.response.data)}`);
//       // Create a more specific error message
//       throw new Error(`Python backend error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
//     } else if (error.request) {
//         // The request was made but no response was received
//         logger.error('No response received from Python backend.');
//         throw new Error('Python backend is unavailable or not responding.');
//     } else {
//         // Something happened in setting up the request that triggered an Error
//         throw error;
//     }
//   }
// };

// export const getFingerPrintsByPin = async (pin) => {
//   logger.debug(`Attempting to fetch fingerprint with ID: ${pin}`);
//   try {
//     // Find a single fingerprint by its ID, ensuring it's active
//     const fingerprints = await Fingerprint.find({ pin });

//     if (!fingerprints) {
//       logger.warn(
//         `fingerprint fetch failed: fingerprint not found or inactive with pin ${pin}.`
//       );
//       const error = new Error("fingerprint not found.");
//       error.statusCode = 404; // Not Found
//       logger.error("fingerprint not found.")
//     }

//     logger.debug(`fingerprint fetched successfully: ${pin}`);
//     return fingerprints;
//   } catch (error) {
//     logger.error(
//       `Error fetching fingerprint with ID ${pin}: ${error.message}`
//     );
//     // Re-throw the error, preserving statusCode if set (like the 404)
//     if (!error.statusCode) {
//       error.statusCode = 500;
//       error.message = error.message || "Error retrieving fingerprint.";
//     }
//     throw error;
//   }
// };
