import { Request, Response } from 'express';
import { writeFile, readFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import Question from '../models/Question';

const askQuestion = async (req: Request, res: Response): Promise<void> => {
  const { text, name } = req.body;
  // const userId = req.user.id; this part is user id verification to submit question code

  if (!text) {
    res.status(400).json({ message: 'Missing question text.' });
  }

  try {
    const questionsData = await readFile('./src/data/questions.json', 'utf-8');

    const parseQuestions = JSON.parse(questionsData);
    console.log(parseQuestions);
    const newQuestionId = uuidv4();

    const currentTime = new Date().getTime();

    let someUpvote = 0;

    const newQuestion = new Question(
      newQuestionId,
      name,
      currentTime,
      someUpvote++,
      [],
    );

    parseQuestions.push(newQuestion);
    console.log(parseQuestions);

    await writeFile(
      './src/data/questions.json',
      JSON.stringify({ newQuestion }, null, 2),
      {
        encoding: 'utf-8',
      },
    );

    res.status(201).json({ id: newQuestionId });
  } catch (err) {
    console.error(err);
  }
};

export default askQuestion;
