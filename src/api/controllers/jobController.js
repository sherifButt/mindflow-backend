


const Job = require('../models/jobModel');

/**
 * Create a new job.
 * @param {Object} jobData - The data for the job.
 * @returns {Promise<Object>} - The created job.
 */
const createJob = async (jobData) => {
  try {
    const job = await Job.create(jobData);
    await redis.enqueueJob(job.id);
    return job;
  } catch (error) {
    throw new Error('Failed to create job');
  }
};

/**
 * Get a job by its ID.
 * @param {string} jobId - The ID of the job.
 * @returns {Promise<Object>} - The job.
 */
const getJob = async (jobId) => {
  try {
    const job = await Job.findById(jobId);
    if (!job) {
      throw new Error('Job not found');
    }
    return job;
  } catch (error) {
    throw new Error('Failed to get job');
  }
};

/**
 * Update a job by its ID.
 * @param {string} jobId - The ID of the job.
 * @param {Object} jobData - The updated data for the job.
 * @returns {Promise<Object>} - The updated job.
 */
const updateJob = async (jobId, jobData) => {
  try {
    const job = await Job.findByIdAndUpdate(jobId, jobData, { new: true });
    if (!job) {
      throw new Error('Job not found');
    }
    return job;
  } catch (error) {
    throw new Error('Failed to update job');
  }
};

/**
 * Delete a job by its ID.
 * @param {string} jobId - The ID of the job.
 * @returns {Promise<void>}
 */
const deleteJob = async (jobId) => {
  try {
    const job = await Job.findByIdAndDelete(jobId);
    if (!job) {
      throw new Error('Job not found');
    }
    await redis.removeJobFromQueue(job.id);
  } catch (error) {
    throw new Error('Failed to delete job');
  }
};

module.exports = {
  createJob,
  getJob,
  updateJob,
  deleteJob,
};

