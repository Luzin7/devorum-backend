import { Request, Response } from 'express';
import { writeFile, readFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

const askQuestion = async (req: Request, res: Response): Promise<void> => {
  const { text, name } = req.body;
  // const userId = req.user.id; this part is user id verification to submit question code

  if (!text) {
    res.status(400).json({ message: 'Missing question text.' });
  }

  try {
    const questionsData = await readFile('./src/data/questions.json', 'utf-8');

    const parseQuestions = JSON.parse(questionsData);

    const newQuestionId = uuidv4();
    const currentTime = new Date().getTime();
    const someUpvote = 0;

    const newQuestion = {
      id: newQuestionId,
      author: name,
      date: currentTime,
      upvotes: someUpvote,
      question: text,
      comments: [], // Se necessário, adicione os comentários aqui
    };

    parseQuestions.push(newQuestion);

    await writeFile(
      './src/data/questions.json',
      JSON.stringify(parseQuestions, null, 2),
      { encoding: 'utf-8' },
    );

    res.status(201).json({ id: newQuestionId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export default askQuestion;
