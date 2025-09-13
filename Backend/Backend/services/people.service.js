import logger from "../utils/logger.js";
import axios from 'axios';

// Get the Python backend URL from environment variables
const PYTHON_BACKEND_URL = process.env.PYTHON_BACKEND_URL;

export const addPerson = async (pin, name, image) => {
  logger.info(`Attempting to add person with pin: ${pin}`);

  try {
    const pythonResponse = await axios.post(
      `${PYTHON_BACKEND_URL}/people`,
      { pin, name, image },
      {
        headers: {
          'Content-Type': 'image/bmp'
        },
        // This tells axios to receive the data as a binary buffer
        responseType: 'arraybuffer'
      }
    );

    logger.info(`Person created successfully with name: ${name} and pin: ${pin}`);
    return pythonResponse.data;
  } catch (error) {
    logger.error(`Error creating person: ${error.response ? error.response.data : error.message}`);
    // Re-throw the error to be handled by the controller
    throw error;
  }
};

export const getPeopleByPin = async (pin) => {
  logger.debug(`Attempting to fetch person with pin: ${pin} from Python backend`);
  try {
    // GET request to find a single person by their pin
    const pythonResponse = await axios.get(`${PYTHON_BACKEND_URL}/people`, {
      data: { pin }
    });

    logger.debug(`Person fetched successfully with pin: ${pin}`);
    return pythonResponse.data;
  } catch (error) {
    logger.error(`Error fetching person with pin ${pin}: ${error.response ? error.response.data : error.message}`);
    // Re-throw the error for the controller to handle
    throw error;
  }
};

export const deletePersonByName = async (pin, name) => {
  logger.info(`Attempting to delete person with pin: ${pin} and name: ${name} from Python backend`);

  try {
    // DELETE request, sending pin and name in the request body
    const pythonResponse = await axios.delete(`${PYTHON_BACKEND_URL}/people`, {
      data: { pin, name }
    });

    logger.info(`Person with pin ${pin} and name ${name} deleted successfully.`);
    return pythonResponse.data;
  } catch (error) {
    logger.error(`Error deleting person with pin ${pin}: ${error.response ? error.response.data : error.message}`);
    // Re-throw the error for the controller to handle
    throw error;
  }
};
