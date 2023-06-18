


const { promisify } = require('util');

// Create a Redis client
const client = redis.createClient();

// Promisify Redis client functions
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const delAsync = promisify(client.del).bind(client);

// Function to create a new job
const createJob = async (jobId, data) => {
  try {
    await setAsync(jobId, JSON.stringify(data));
    console.log(`Job created with ID: ${jobId}`);
  } catch (error) {
    console.error('Error creating job:', error);
  }
};

// Function to get a job by ID
const getJob = async (jobId) => {
  try {
    const jobData = await getAsync(jobId);
    return JSON.parse(jobData);
  } catch (error) {
    console.error('Error getting job:', error);
    return null;
  }
};

// Function to update a job by ID
const updateJob = async (jobId, data) => {
  try {
    await setAsync(jobId, JSON.stringify(data));
    console.log(`Job updated with ID: ${jobId}`);
  } catch (error) {
    console.error('Error updating job:', error);
  }
};

// Function to delete a job by ID
const deleteJob = async (jobId) => {
  try {
    await delAsync(jobId);
    console.log(`Job deleted with ID: ${jobId}`);
  } catch (error) {
    console.error('Error deleting job:', error);
  }
};

module.exports = {
  createJob,
  getJob,
  updateJob,
  deleteJob,
};

