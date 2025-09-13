import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import jwt from 'jsonwebtoken'; // Already imported
import router from './routes/index.js';
import { connectDB } from "./config/db.js";
import aiRoutes from './routes/ai.routes.js'; // Import AI routes

// Load environment variables
dotenv.config();

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 4000;

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // Frontend URL
    credentials: true,
  },
});

// A middleware to handle raw body for image forwarding
app.use(express.raw({ type: 'image/*', limit: '30mb' }));


// Mount AI-related routes under the '/ai' path
// e.g., POST /api/v1/ai/process-image
app.use('/ai', aiRoutes);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// A middleware to handle raw body for image forwarding
app.use(express.raw({ type: 'image/*', limit: '10mb' }));

const allowedOrigins = ['http://localhost:5173', 'https://your-production-frontend.com'];

app.use(cors({
  // origin: function (origin, callback) {
  //   // allow requests with no origin (like mobile apps or curl requests)
  //   if (!origin) return callback(null, true);
    
  //   if (allowedOrigins.indexOf(origin) === -1) {
  //     const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
  //     return callback(new Error(msg), false);
  //   }
  //   return callback(null, true);
  // },
  origin: function (origin, callback) {
    // In development, or if you want to allow all, you can simply callback with the origin.
    // This will reflect the request's origin in the Access-Control-Allow-Origin header.
    callback(null, origin);
  },
  credentials: true,
}));



app.use(express.json());

// API routes
app.use("/api/v1", router);



httpServer.listen(PORT, '::', () => {
  connectDB(); // Connect to MongoDB
  console.log(`Node.js bridge server is running on port ${PORT} over IPv6`);
});