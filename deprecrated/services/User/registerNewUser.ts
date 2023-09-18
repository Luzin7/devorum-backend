import { randomUUID } from 'crypto';
import User from '../../models/User';
import crypto from 'node:crypto';
import encryptPassword from '../../functions/generateCriptoPassword';
import { UsersDbPg } from '../../repositories/UserRepository';

const database = new UsersDbPg();

const registerNewUser = async ({
  name,
  password,
  contact,
}: {
  name: string;
  password: string;
  contact: string;
}): Promise<void> => {
  const userAlreadyExists = await database.existingUser(name);

  if (userAlreadyExists.length > 0) {
    throw new Error('Name or contact already exists');
  }

  const createAt = new Date().getTime();
  const id = randomUUID();

  const salt = crypto.randomBytes(16).toString('hex');

  const encryptedPassword = encryptPassword(password, salt);

  const newUser = new User(
    createAt,
    id,
    name,
    encryptedPassword,
    contact,
    salt,
  );

  database.createUser(newUser);
};

export default registerNewUser;
