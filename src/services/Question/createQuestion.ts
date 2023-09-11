import { writeFile, readFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import { ContentDataProps } from '../../types';
import Question from '../../models/Question';

type QuestionProps = {
  question: string;
  authorId: string;
};

const registerNewQuestion = async ({
  question,
  authorId,
}: QuestionProps): Promise<void> => {
  const usersData: ContentDataProps = JSON.parse(
    await readFile('./src/data/users.json', 'utf-8'),
  );
  const questionsData: ContentDataProps = JSON.parse(
    await readFile('./src/data/questions.json', 'utf-8'),
  );

  const { users } = usersData;
  const { questions } = questionsData;

  const newQuestionId = uuidv4();
  const currentTime = new Date().getTime();
  const someUpvote = 0;

  const userIndex = users.findIndex((user) => user.id === authorId);

  if (userIndex === -1) {
    throw new Error('User not found');
  }

  const authorName = users[userIndex].name;

  console.log(authorName);

  const newQuestion = new Question(
    currentTime,
    newQuestionId,
    authorId,
    authorName,
    question,
    someUpvote,
  );

  questions.push(newQuestion);
  users[userIndex].questions.push(newQuestionId);

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
