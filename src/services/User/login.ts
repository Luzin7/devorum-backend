import { readFile } from 'fs/promises';
import User from '../../models/User';
import encryptPassword from '../../functions/generateCriptoPassword';

const login = async ({
  name,
  password,
}: {
  name: string;
  password: string;
}): Promise<User> => {
  const users = await readFile('./src/data/users.json', 'utf-8');
  const usersData: User[] = JSON.parse(users);

  const user = usersData.find((user) => user.name === name);

  if (!user) {
    throw new Error('User does not exist');
  }

  const isPasswordValid =
    user.password === encryptPassword(password, user.salt);

  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  return user;
};

export default login;
