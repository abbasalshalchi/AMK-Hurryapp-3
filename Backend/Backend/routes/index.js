import express from 'express';
import fingerPrintRouter from './fingerprint.routes.js';
const router = express.Router();

router.use('/hardware', fingerPrintRouter);

// Catch-all for 404 routes
router.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found on the Node.js bridge"
    });
});

export default router
