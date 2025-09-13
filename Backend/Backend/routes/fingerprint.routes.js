import express from 'express';
import { addFingerPrintController, getFingerPrintController } from '../controllers/fingerprint.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const fingerPrintRouter = express.Router();
// // get /api/v1/hardware/fingerprint
// // Route to forward image processing requests to the Python backend
// fingerPrintRouter.get("/fingerprint", getFingerPrintController);

// POST /api/v1/hardware/fingerprint
// Route to forward image processing requests to the Python backend
fingerPrintRouter.post("/fingerprint", addFingerPrintController);

export default fingerPrintRouter;
