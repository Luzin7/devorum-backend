import { writeFile, readFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import Question from '../models/Question';
import { UsersProps } from '../types';

type RegisterQuestionProps = {
  question: string;
  authorId: string;
};

const registerNewQuestion = async ({
  question,
  authorId,
}: RegisterQuestionProps): Promise<void> => {
  const questions = await readFile('./src/data/questions.json', 'utf-8');
  const users = await readFile('./src/data/users.json', 'utf-8');

  const questionsData = JSON.parse(questions);
  const usersData = JSON.parse(users);

  const newQuestionId = uuidv4();
  const currentTime = new Date().getTime();
  const someUpvote = 0;

  const userIndex = usersData.findIndex(
    (user: UsersProps) => user.id === authorId,
  );

  usersData[userIndex].questions.push(newQuestionId);

  const newQuestion = new Question(
    currentTime,
    newQuestionId,
    authorId,
    question,
    someUpvote,
  );

  questionsData.push(newQuestion);

  await writeFile(
    './src/data/questions.json',
    JSON.stringify(questionsData, null, 2),
    { encoding: 'utf-8' },
  );
  await writeFile('./src/data/users.json', JSON.stringify(usersData, null, 2), {
    encoding: 'utf-8',
  });
};

export default registerNewQuestion;
