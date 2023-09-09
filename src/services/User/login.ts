import { readFile } from 'fs/promises';
import User from '../../models/User';

const login = async ({ name, password }: User): Promise<void> => {
  const users = await readFile('./src/data/users.json', 'utf-8');
  const usersData = JSON.parse(users);

  const userExists = usersData.find(
    (user: User) => user.name === name && user.password === password,
  );

  if (userExists === undefined) {
    throw new Error('User does not exists');
  }

  return userExists;
};

export default login;
