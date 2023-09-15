import User from '../../models/User';
import encryptPassword from '../../functions/generateCriptoPassword';
import { UsersDbPg } from '../../repositories/UserRepository';
import { Row } from 'postgres';

const database = new UsersDbPg();

const login = async ({ name, password }: User): Promise<Row> => {
  try {
    const userExists = await database.existingUser(name);

    if (userExists.length <= 0) {
      throw new Error('User does not exist');
    }

    const isPasswordValid =
      userExists[0].password === encryptPassword(password, userExists[0].salt);

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const user = {
      id: userExists[0].id,
      name: userExists[0].name,
      contact: userExists[0].contact,
      questions: userExists[0].questions,
    };

    return user;
  } catch (error) {
    throw new Error(error);
  }
};

export default login;
