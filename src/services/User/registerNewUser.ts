import { readFile, writeFile } from 'fs/promises';
import { UsersProps } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import User from '../../models/User';

type RegisterUserProps = {
  name: string;
  password: string;
  contact: string;
};

const registerNewUser = async ({
  name,
  password,
  contact,
}: RegisterUserProps): Promise<void> => {
  const users = await readFile('./src/data/users.json', 'utf-8');
  const usersData = JSON.parse(users);

  const userAlreadyExists = usersData.find(
    (user: UsersProps) => user.name === name || user.contact === contact,
  );

  if (userAlreadyExists !== undefined) {
    throw new Error('Name or contact already exists');
  }

  const currentTime = new Date().getTime();
  const newUserID = uuidv4();

  const newUser = new User(currentTime, newUserID, name, password, contact);

  usersData.push(newUser);

  await writeFile('./src/data/users.json', JSON.stringify(usersData, null, 2), {
    encoding: 'utf-8',
  });
};

export default registerNewUser;
