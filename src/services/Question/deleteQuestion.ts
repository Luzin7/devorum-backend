import { readFile, writeFile } from 'fs/promises';
import Question from '../../models/Question';
import User from '../../models/User';

const deleteQuestion = async (questionId: string): Promise<void> => {
  const questions = await readFile('./src/data/questions.json', 'utf-8');
  const users = await readFile('./src/data/users.json', 'utf-8');
  const questionsData = JSON.parse(questions);
  const usersData = JSON.parse(users);

  const questionIndex = questionsData.findIndex(
    (question: Question) => question.id === questionId,
  );

  if (questionIndex === -1) {
    throw new Error('Question does not exist');
  }

  const userId = questionsData[questionIndex].authorId;

  const userIndex = usersData.findIndex((user: User) => user.id === userId);

  const userQuestionIndex = usersData[userIndex].questions.indexOf(questionId);

  if (userQuestionIndex === -1) {
    throw new Error('Question not found in User');
  }

  questionsData.splice(questionIndex, 1);
  // NÃO QUER APAGAR O ELEMENTO DO ARRAY DO USUARIO
  usersData[userIndex].questions.splice(userQuestionIndex, 1);

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
