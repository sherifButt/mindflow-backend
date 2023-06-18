


import { createNotification, getNotifications, markNotificationAsRead } from '../src/api/controllers/notificationController';

describe('Notification Model', () => {
  describe('createNotification', () => {
    it('should create a new notification', () => {
      // Mock data
      const userId = 'user123';
      const content = 'New notification';

      // Call the createNotification function
      const notification = createNotification(userId, content);

      // Assert the result
      expect(notification.userId).toBe(userId);
      expect(notification.content).toBe(content);
      expect(notification.isRead).toBe(false);
    });
  });

  describe('getNotifications', () => {
    it('should return all notifications for a user', () => {
      // Mock data
      const userId = 'user123';

      // Call the getNotifications function
      const notifications = getNotifications(userId);

      // Assert the result
      expect(notifications.length).toBe(2);
      expect(notifications[0].userId).toBe(userId);
      expect(notifications[1].userId).toBe(userId);
    });
  });

  describe('markNotificationAsRead', () => {
    it('should mark a notification as read', () => {
      // Mock data
      const notificationId = 'notification123';

      // Call the markNotificationAsRead function
      const notification = markNotificationAsRead(notificationId);

      // Assert the result
      expect(notification.isRead).toBe(true);
    });
  });
});

