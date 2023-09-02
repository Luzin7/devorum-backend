import { Request, Response } from 'express';
import { writeFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import User from '../models/User';
import { format } from 'date-fns';

const registerUsers = async (req: Request, res: Response): Promise<void> => {
  const { name, password, contact } = req.body;

  const notFilled = !name || !password || !contact;

  if (notFilled) {
    res.status(409).json({ message: 'not filled' });
  }

  try {
    const hoursAndDate = format(new Date(), 'dd-MM-yyyy HH:mm:ss');

    const newUser = new User(
      hoursAndDate,
      uuidv4(),
      name,
      password,
      contact,
      [],
    );

    await writeFile(
      './src/data/users.json',
      JSON.stringify({ Users: [newUser] }, null, 2),
      { encoding: 'utf-8' },
    );

    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export default registerUsers;
