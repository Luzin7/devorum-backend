import encryptPassword from '../../functions/generateCriptoPassword';
import { UsersDbPg } from '../../repositories/UserRepository';
import { ChangePasswordProps } from '../../types';
import crypto from 'node:crypto';

const database = new UsersDbPg();

const changeUserPassword = async ({
  userId,
  currentPassword,
  newPassword,
  newPasswordConfirm,
}: ChangePasswordProps): Promise<void> => {
  try {
    const userExists = await database.existingUser(userId);

    if (userExists.length <= 0) {
      throw new Error('User not found');
    }
    const user = userExists[0];

    if (user.password !== currentPassword) {
      throw new Error('Current password is incorrect');
    }

    if (newPassword !== newPasswordConfirm) {
      throw new Error('New passwords do not match');
    }

    if (newPassword.length < 6 || newPassword.length > 16) {
      throw new Error('New password must have at least 6 or 16 characters');
    }

    const salt = crypto.randomBytes(16).toString('hex');

    const encryptedNewPassword = encryptPassword(newPassword, salt);

    database.updatePassword(userId, encryptedNewPassword, salt);
  } catch (error) {
    throw new Error(error);
  }
};

export default changeUserPassword;
