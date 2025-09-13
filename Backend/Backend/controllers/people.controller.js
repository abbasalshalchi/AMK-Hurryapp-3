import logger from '../utils/logger.js';
import { getPeopleByPin, addPerson, deletePersonByName } from '../services/person.service.js';
import { apiResponse } from '../utils/helpers.js';

export const getPeopleController = async (req, res, next) => {
  const pin = req.params.pin; // Assuming pin is a URL parameter, e.g., /people/:pin
  logger.debug(`Controller: Handling request to get person by pin: ${pin}`);

  try {
    const person = await getPeopleByPin(pin);

    // Service throws an error if not found, so we assume success here
    logger.info(`Controller: Retrieved person ${person}`);
    res.status(200).json(apiResponse(true, 'person retrieved successfully', person, null, 200));
  } catch (error) {
    // Catches errors like 'person not found' or backend errors from the service
    logger.error(`Controller: Error getting person with pin ${pin} - ${error.message}`);
    next(error);
  }
};

export const addPersonController = async (req, res, next) => {
  // Extract data from request
  const pin = req.pin; // Assuming pin is added by middleware
  const { name, image } = req.body;

  // Basic validation
  if (!name || !image || !pin) {
    const error = new Error("Missing required fields: pin, name, and image are required.");
    error.statusCode = 400;
    return next(error);
  }

  logger.debug(`Controller: Handling request to add person with name: ${name}`);
  try {
    // CRITICAL: Added 'await' here
    const newPerson = await addPerson(pin, name, image);
    res.status(201).json(apiResponse(true, 'person added successfully', newPerson, null, 201));
  } catch (error) {
    logger.error(`Controller: Error adding person ${name} - ${error.message}`);
    next(error);
  }
};

export const deletePersonController = async (req, res, next) => {
  const pin = req.pin; // Assuming pin is added by middleware
  const { name } = req.body;
  logger.debug(`Controller: Handling request to delete person with pin: ${pin} and name: ${name}`);
  
  if (!name || !pin) {
    const error = new Error("Missing required fields: pin and name are required.");
    error.statusCode = 400;
    return next(error);
  }

  try {
    const deletionResult = await deletePersonByName(pin, name);

    // Service throws an error if not found, so we assume success here
    logger.info(`Controller: Deleted person with pin ${pin}`);
    res.status(200).json(apiResponse(true, 'person deleted successfully', deletionResult, null, 200));
  } catch (error) {
    // Catches errors from the service
    // Corrected the log to use 'pin' instead of an undefined variable
    logger.error(`Controller: Error deleting person with pin ${pin} - ${error.message}`);
    next(error);
  }
};
