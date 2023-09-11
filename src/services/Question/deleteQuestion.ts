import { readFile, writeFile } from 'fs/promises';
import Question from '../../models/Question';
import User from '../../models/User';
import { ContentDataProps } from '../../types';

const deleteQuestion = async (questionId: string): Promise<void> => {
  const usersData: ContentDataProps = JSON.parse(
    await readFile('./src/data/users.json', 'utf-8'),
  );
  const questionsData: ContentDataProps = JSON.parse(
    await readFile('./src/data/questions.json', 'utf-8'),
  );
  const { users } = usersData;
  const { questions } = questionsData;

  const questionIndex = questions.findIndex(
    (question: Question) => question.id === questionId,
  );

  if (questionIndex === -1) {
    throw new Error('Question does not exist');
  }

  const userId = questions[questionIndex].authorId;

  const userIndex = users.findIndex((user: User) => user.id === userId);

  const userQuestionIndex = users[userIndex].questions.indexOf(questionId);

  if (userQuestionIndex === -1) {
    throw new Error('Question not found in User');
  }

  questions.splice(questionIndex, 1);
  users[userIndex].questions.splice(userQuestionIndex, 1);

  await writeFile(
    './src/data/questions.json',
    JSON.stringify(questionsData, null, 2),
    { encoding: 'utf-8' },
  );
  await writeFile('./src/data/users.json', JSON.stringify(usersData, null, 2), {
    encoding: 'utf-8',
  });
};

export default deleteQuestion;
