const mongoose = require('mongoose');
const { Pool } = require('pg');

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('Connected to the database');
  } catch (error) {
    console.error('Failed to connect to the database', error);
    process.exit(1);
  }
};

// connect to postgresql database via pg
const pool = new Pool({
  user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DB,
});


// connect to postgresql database via pg
const connectPostgreSQL = async () => { 
  try {
    const client = await pool.connect();
    console.log(`Connected to the database via ${process.env.PG_DB} on port ${process.env.PG_PORT}`);
  } catch (error) {
    console.error('Failed to connect to the database', error);
    process.exit(1);
  }
};

module.exports = {connectMongoDB, connectPostgreSQL,pool};





