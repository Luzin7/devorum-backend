import { readFile, writeFile } from 'fs/promises';
import { ContentDataProps } from '../../types';

type ChangePasswordProps = {
  id: string;
  userId: string;
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
};

const changeUserPassword = async ({
  userId,
  currentPassword,
  newPassword,
  newPasswordConfirm,
}: ChangePasswordProps): Promise<void> => {
  const usersData: ContentDataProps = JSON.parse(
    await readFile('./src/data/users.json', 'utf-8'),
  );

  const { users } = usersData;

  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    throw new Error('User not found');
  }

  const userObj = users[userIndex];

  if (!userObj) {
    throw new Error('User not found');
  }

  if (userObj.password !== currentPassword) {
    throw new Error('Current password is incorrect');
  }

  if (newPassword !== newPasswordConfirm) {
    throw new Error('New passwords do not match');
  }

  if (newPassword.length < 6) {
    throw new Error('New password must have at least 6 characters');
  }

  userObj.password = newPassword;

  await writeFile('./src/data/users.json', JSON.stringify(usersData, null, 2), {
    encoding: 'utf-8',
  });
};

export default changeUserPassword;
