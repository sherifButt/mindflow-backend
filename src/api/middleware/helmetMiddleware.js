



/**
 * Middleware function to handle security using Helmet.
 * @param {Object} app - Express app instance.
 */
const helmetMiddleware = (app) => {
  // Enable various security headers
  app.use(helmet());

  // Prevent opening the application in an iframe
  app.use(helmet.frameguard({ action: 'deny' }));

  // Enable XSS protection
  app.use(helmet.xssFilter());

  // Enable HSTS (HTTP Strict Transport Security)
  app.use(
    helmet.hsts({
      maxAge: 31536000, // 1 year
      includeSubDomains: true,
      preload: true,
    })
  );

  // Prevent MIME type sniffing
  app.use(helmet.noSniff());

  // Disable caching
  app.use(helmet.noCache());

  // Enable content security policy
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:'],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"],
        frameAncestors: ["'none'"],
      },
    })
  );
};

module.exports = helmetMiddleware;



