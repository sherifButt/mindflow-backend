


import { createAvatar, getAvatarById } from '../src/api/controllers/avatarController';

describe('Avatar Model', () => {
  describe('createAvatar', () => {
    it('should create a new avatar', async () => {
      const avatarData = {
        id: 1,
        imageUrl: 'https://example.com/avatar.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const createdAvatar = await createAvatar(avatarData);

      expect(createdAvatar).toEqual(avatarData);
    });
  });

  describe('getAvatarById', () => {
    it('should get an avatar by ID', async () => {
      const avatarId = 1;
      const avatarData = {
        id: avatarId,
        imageUrl: 'https://example.com/avatar.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const fetchedAvatar = await getAvatarById(avatarId);

      expect(fetchedAvatar).toEqual(avatarData);
    });

    it('should return null if avatar is not found', async () => {
      const avatarId = 2;

      const fetchedAvatar = await getAvatarById(avatarId);

      expect(fetchedAvatar).toBeNull();
    });
  });
});



