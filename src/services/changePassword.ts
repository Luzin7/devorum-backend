import { readFile, writeFile } from 'fs/promises';
type ChangePasswordProps = {
  id: string;
  userId: string;
  currentPassword: string; // Senha atual
  newPassword: string;
  newPasswordConfirm: string;
};
//CORRIJI bug de localizador do ID
const changeUserPassword = async ({
  userId,
  currentPassword,
  newPassword,
  newPasswordConfirm,
}: ChangePasswordProps): Promise<void> => {
  const users = await readFile('./src/data/users.json', 'utf-8');
  const usersData = JSON.parse(users);
  console.log(usersData);

  const userIndex = usersData.findIndex(
    (user: ChangePasswordProps) => user.id === userId,
  );
  console.log(userId);

  if (userIndex === -1) {
    throw new Error('User not found');
  }

  const user = usersData[userIndex];

  if (!user) {
    throw new Error('User not found');
  }

  if (user.password !== currentPassword) {
    throw new Error('Current password is incorrect');
  }

  if (newPassword !== newPasswordConfirm) {
    throw new Error('New passwords do not match');
  }

  if (newPassword.length < 6) {
    throw new Error('New password must have at least 6 characters');
  }

  user.password = newPassword;

  await writeFile('./src/data/users.json', JSON.stringify(usersData, null, 2), {
    encoding: 'utf-8',
  });
};

export default changeUserPassword;
