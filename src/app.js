require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const routes = require('./api/routes');
const handleRouteError = require('./api/middleware/errorMiddleware');
const { connectPostgreSQL } = require('./config/db');
const handleSuccessResponse = require('./api/middleware/successMiddleware');
connectPostgreSQL();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet());

// Routes
app.use('/api', routes);
// Error and success handlers, to be provide a consistent response format for all routes
app.use(handleSuccessResponse)
app.use(handleRouteError)

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  ``
  console.log(`Server is running on port ${port}`);
});