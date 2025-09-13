import express from 'express';
import { processImage } from '../controllers/ai.controller.js';

const router = express.Router();

// Route to forward image processing requests to the Python backend
router.post("/process-image", processImage);

export default router;
