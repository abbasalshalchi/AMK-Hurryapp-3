import logger from '../utils/logger.js';
import { addFingerPrint, getFingerPrintsByPin } from '../services/fingerprint.service.js'
import { apiResponse } from '../utils/helpers.js';
import { set } from 'mongoose';

export const addFingerPrintController = async (req, res, next) => {
  const pin = "12341234"; // Assume pin is set in req by earlier middleware
  const image = req.body; // Raw image data is in req.body
  logger.debug(`adding fingerPrint for pin ${pin}`);
  try {
    // Await the async service function
    const newFingerprint = {
      r: Math.random() * 70 + 30,
      time: Math.random() * 2000,
    }
    setTimeout(() => {
      // Use 201 for resource creation
      res.status(201).json(apiResponse(true, 'fingerprint added successfully', newFingerprint, null, 201)) 
    }, newFingerprint.time)
  } catch (error) {
    logger.error(`Controller: Error adding fingerprint for pin ${pin} - ${error.message}`);
    next(error);
  }
};


export const getFingerPrintController = async (req, res, next) => {
  const pin = req.pin;
  logger.debug(`Controller: Handling request to get fingerprints by ID: ${pin}`);

  try {
    const fingerprints = await getFingerPrintsByPin(pin);

    // Service throws 404 if not found, so we assume success here
    logger.info(`Controller: Retrieved fingerprint ${fingerprints}`);
    const response = apiResponse(true, 'fingerprint retrieved successfully.', fingerprints, null, 200);
    res.status(response.statusCode).json(response);

  } catch (error) {
    // Catches errors like 'fingerprint not found' (404) or DB errors (500) from the service
    logger.error(`Controller: Error getting fingerprint ${pin} - ${error.message}`);
    next(error);
  }
}
