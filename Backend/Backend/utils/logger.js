import winston from 'winston';
import config from '../config/index.js';

// Define logging levels (npm levels are standard: error, warn, info, http, verbose, debug, silly)
const levels = winston.config.npm.levels;

// Determine the logging level based on the environment
// In development, log everything down to 'debug'. In production, perhaps only 'warn' or 'info'.
const level = config.env === 'development' ? 'debug' : 'warn';

// Define color scheme for log levels
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};
winston.addColors(colors);

// Define the format for log messages
const logFormat = winston.format.combine(
  // Add a timestamp to each log entry
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  // Add colors to the output
  winston.format.colorize({ all: true }),
  // Define the printf format for the log message
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

// Define the transports (where the logs should go)
const transports = [
  // Always log to the console
  new winston.transports.Console(),

  // --- Optional: File Transports for Production ---
  // Uncomment and configure these if you want to log to files in production
  /*
  // Log all errors to a separate error file
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error', // Only log errors to this file
  }),
  // Log all messages (based on the determined level) to a combined file
  new winston.transports.File({ filename: 'logs/combined.log' }),
  */
];

// Create the Winston logger instance
const logger = winston.createLogger({
  level: level, // Set the minimum logging level
  levels: levels, // Use the standard npm logging levels
  format: logFormat, // Apply the defined format
  transports: transports, // Use the defined transports
  // Do not exit on handled exceptions
  // We will handle uncaught exceptions/rejections separately
  exitOnError: false,
});

// Log a message indicating logger initialization (optional)
logger.info(`Logger initialized at level: ${level}`);

// Export the configured logger
export default logger;
