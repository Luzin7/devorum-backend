import { Request, Response } from 'express';
import { writeFile, readFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

interface UsersProps {
  date: number;
  id: string;
  name: string;
  password: string;
  contact: string;
  question: string[];
}

const registerUsers = async (req: Request, res: Response): Promise<void> => {
  const { name, password, contact } = req.body;

  const notFilled = !name || !password || !contact;

  if (notFilled) {
    res.status(409).json({ message: 'not filled' });
  }

  try {
    const usersData = await readFile('./src/data/users.json', 'utf-8');
    const parseUsers = JSON.parse(usersData);

    console.log(parseUsers);

    const userAlreadyExists = parseUsers.find((user: UsersProps) => {
      return user.name === name || user.contact === contact;
    });

    if (userAlreadyExists) {
      res.status(409).json({ message: 'Name user already exists' });
    }

    const currentTime = new Date().getTime();
    const newUserID = uuidv4();

    const newUser = {
      date: currentTime,
      id: newUserID,
      name,
      password,
      contact,
      question: [],
    };

    parseUsers.push(newUser);

    await writeFile(
      './src/data/users.json',
      JSON.stringify(parseUsers, null, 2),
      { encoding: 'utf-8' },
    );

    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export default registerUsers;
