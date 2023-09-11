import { promises as fsPromises } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import User from '../../models/User';
import * as crypto from 'crypto'; // Import the crypto module
import encryptPassword from '../../functions/generateCriptoPassword';

const { readFile, writeFile } = fsPromises;

const registerNewUser = async ({
  name,
  password,
  contact,
}: {
  name: string;
  password: string;
  contact: string;
}): Promise<void> => {
  const usersData: User[] = JSON.parse(
    await readFile('./src/data/users.json', 'utf-8'),
  );

  const userAlreadyExists = usersData.find(
    (user) => user.name === name || user.contact === contact,
  );

  if (userAlreadyExists !== undefined) {
    throw new Error('Name or contact already exists');
  }

  const currentTime = new Date().getTime();
  const newUserID = uuidv4();

  let salt = '';
  if (!('salt' in usersData[0])) {
    salt = crypto.randomBytes(16).toString('hex');
  }

  const encryptedPassword = encryptPassword(password, salt);

  const newUser = new User(
    currentTime,
    newUserID,
    name,
    encryptedPassword,
    contact,
    salt,
  );

  usersData.push(newUser);

  await writeFile('./src/data/users.json', JSON.stringify(usersData, null, 2), {
    encoding: 'utf-8',
  });
};

export default registerNewUser;
