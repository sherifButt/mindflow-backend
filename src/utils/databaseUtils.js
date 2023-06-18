let pool;

/**
 * Function to connect to the database.
 * @returns {Promise<void>}
 */
async function connectDB() {
  try {
    pool = new Pool({
      user: 'your_username',
      host: 'your_host',
      database: 'your_database',
      password: 'your_password',
      port: 5432, // Change the port if necessary
    });

    await pool.connect();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}

/**
 * Function to close the database connection.
 * @returns {Promise<void>}
 */
async function closeDB() {
  try {
    await pool.end();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error closing the database connection:', error);
    throw error;
  }
}

module.exports = {
  connectDB,
  closeDB,
};

