import express from 'express';
import { addFingerPrintController, getFingerPrintController, getPeopleController } from '../controllers/fingerprint.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const fingerPrintRouter = express.Router();
// post /api/v1/hardware/people
// Route to forward image processing requests to the Python backend
fingerPrintRouter.get("/", protect, getPeopleController);

// post /api/v1/hardware/people
// Route to forward image processing requests to the Python backend
fingerPrintRouter.post("/", protect, addPersonController);

// delete /api/v1/hardware/people
// Route to forward image processing requests to the Python backend
fingerPrintRouter.delete("/", protect, deletePersonController);

export default fingerPrintRouter;
