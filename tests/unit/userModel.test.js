


import { createUser, getUserById, updateUser } from '../src/api/controllers/userController';

describe('User Model', () => {
  describe('createUser', () => {
    it('should create a new user', () => {
      // Mock data
      const userData = {
        email: 'test@example.com',
        password: 'password123',
      };

      // Call the createUser function
      const newUser = createUser(userData);

      // Assert that the new user has been created successfully
      expect(newUser.email).toBe(userData.email);
      expect(newUser.password).toBe(userData.password);
    });
  });

  describe('getUserById', () => {
    it('should get a user by ID', () => {
      // Mock data
      const userId = 1;

      // Call the getUserById function
      const user = getUserById(userId);

      // Assert that the correct user has been retrieved
      expect(user.id).toBe(userId);
    });
  });

  describe('updateUser', () => {
    it('should update a user', () => {
      // Mock data
      const userId = 1;
      const updatedUserData = {
        email: 'updated@example.com',
        password: 'newpassword123',
      };

      // Call the updateUser function
      const updatedUser = updateUser(userId, updatedUserData);

      // Assert that the user has been updated successfully
      expect(updatedUser.email).toBe(updatedUserData.email);
      expect(updatedUser.password).toBe(updatedUserData.password);
    });
  });
});

