/**
 * Handles CORS (Cross-Origin Resource Sharing) for the application.
 * @param {Object} app - Express application object.
 */
function corsMiddleware(app) {
  // Enable CORS for all routes
  app.use(cors());
}

module.exports = corsMiddleware;

