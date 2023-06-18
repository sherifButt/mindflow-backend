


import { createJob, getJobById, updateJobStatus } from '../src/api/controllers/jobController';

describe('Job Model', () => {
  describe('createJob', () => {
    it('should create a new job', () => {
      // Mock data
      const jobData = {
        id: 1,
        name: 'Test Job',
        status: 'pending',
      };

      // Call the createJob function
      const createdJob = createJob(jobData);

      // Assert that the job is created successfully
      expect(createdJob).toEqual(jobData);
    });
  });

  describe('getJobById', () => {
    it('should return the job with the specified ID', () => {
      // Mock data
      const jobId = 1;
      const jobData = {
        id: jobId,
        name: 'Test Job',
        status: 'pending',
      };

      // Call the getJobById function
      const job = getJobById(jobId);

      // Assert that the correct job is returned
      expect(job).toEqual(jobData);
    });

    it('should return null if the job with the specified ID does not exist', () => {
      // Mock data
      const jobId = 2;

      // Call the getJobById function
      const job = getJobById(jobId);

      // Assert that null is returned
      expect(job).toBeNull();
    });
  });

  describe('updateJobStatus', () => {
    it('should update the status of the job with the specified ID', () => {
      // Mock data
      const jobId = 1;
      const newStatus = 'completed';
      const updatedJobData = {
        id: jobId,
        name: 'Test Job',
        status: newStatus,
      };

      // Call the updateJobStatus function
      const updatedJob = updateJobStatus(jobId, newStatus);

      // Assert that the job status is updated correctly
      expect(updatedJob).toEqual(updatedJobData);
    });

    it('should return null if the job with the specified ID does not exist', () => {
      // Mock data
      const jobId = 2;
      const newStatus = 'completed';

      // Call the updateJobStatus function
      const updatedJob = updateJobStatus(jobId, newStatus);

      // Assert that null is returned
      expect(updatedJob).toBeNull();
    });
  });
});

