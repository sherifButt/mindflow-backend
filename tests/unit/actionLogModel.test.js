


import { createLog, getLogs } from '../src/api/controllers/actionLogController';

describe('ActionLog Model', () => {
  describe('createLog', () => {
    it('should create a new action log', () => {
      const logData = {
        userId: 1,
        action: 'User login',
        timestamp: new Date(),
      };

      const createdLog = createLog(logData);

      expect(createdLog).toHaveProperty('id');
      expect(createdLog.userId).toBe(logData.userId);
      expect(createdLog.action).toBe(logData.action);
      expect(createdLog.timestamp).toBe(logData.timestamp);
    });
  });

  describe('getLogs', () => {
    it('should return all action logs', () => {
      const logs = getLogs();

      expect(logs).toHaveLength(3); // Assuming there are 3 logs in the database
    });

    it('should return action logs for a specific user', () => {
      const userId = 1;
      const logs = getLogs(userId);

      expect(logs).toHaveLength(2); // Assuming there are 2 logs for the user with ID 1
      expect(logs.every((log) => log.userId === userId)).toBe(true);
    });
  });
});

