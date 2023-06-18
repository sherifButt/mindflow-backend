


import passwordResetController from '../src/api/controllers/passwordResetController';

describe('PasswordReset Model', () => {
  describe('createPasswordResetToken', () => {
    it('should create a password reset token', async () => {
      const user = {
        id: 1,
        email: 'test@example.com',
      };

      const token = await passwordResetController.createPasswordResetToken(user);

      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
    });
  });

  describe('verifyPasswordResetToken', () => {
    it('should verify a valid password reset token', async () => {
      const token = 'valid_token';

      const user = await passwordResetController.verifyPasswordResetToken(token);

      expect(user).toBeDefined();
      expect(user.id).toBe(1);
      expect(user.email).toBe('test@example.com');
    });

    it('should return null for an invalid password reset token', async () => {
      const token = 'invalid_token';

      const user = await passwordResetController.verifyPasswordResetToken(token);

      expect(user).toBeNull();
    });
  });

  describe('resetPassword', () => {
    it('should reset the password for a user', async () => {
      const user = {
        id: 1,
        email: 'test@example.com',
      };

      const newPassword = 'new_password';

      const result = await passwordResetController.resetPassword(user, newPassword);

      expect(result).toBeTruthy();
    });
  });
});

