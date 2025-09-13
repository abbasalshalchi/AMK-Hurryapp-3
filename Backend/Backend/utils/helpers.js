/**
 * Creates a standardized API response object.
 * Controllers can use this to structure the data sent back to the client.
 *
 * @param {boolean} success - Indicates if the operation was successful.
 * @param {string} message - A descriptive message about the outcome.
 * @param {any} [data=null] - The payload/data to be returned (optional).
 * @param {any} [error=null] - Error details if success is false (optional).
 * @param {number} [statusCode=200] - Suggested HTTP status code (primarily for reference, controller sets the actual status).
 * @returns {object} Standardized response object.
 */
export const apiResponse = (success, message, data = null, error = null, statusCode = 200) => {
    // Basic structure for all responses
    const response = {
      success: success,
      message: message || (success ? 'Operation successful' : 'Operation failed'),
      statusCode: statusCode // Include statusCode for potential internal use/logging
    };
  
    // Add data only if it's provided and the operation was successful
    if (success && data !== null) {
      response.data = data;
    }
  
    // Add error details only if provided and the operation failed
    if (!success && error !== null) {
      // Avoid leaking sensitive error details in production if not intended
      // In a real app, you might process the error object further here
      response.error = process.env.NODE_ENV === 'development' ? error : { message: 'An unexpected error occurred.' };
      // Adjust statusCode if it wasn't set appropriately for an error
      if (response.statusCode < 400) {
          response.statusCode = 500; // Default error code if not specified
      }
    }
  
    return response;
  };
  
  