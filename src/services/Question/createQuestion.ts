import { randomUUID } from 'node:crypto';
import Question from '../../models/Question';
import { QuestionsDbPg } from '../../repositories/QuestionRepository';
import { UsersDbPg } from '../../repositories/UserRepository';

const questionsDb = new QuestionsDbPg();
const usersDb = new UsersDbPg();

const registerNewQuestion = async ({
  question,
  author_id,
  title,
}: Question): Promise<void> => {
  const userExists = await usersDb.existingUser(author_id);

  if (userExists.length <= 0) {
    throw new Error('User not found');
  }

  const authorName = userExists[0].name;

  const newQuestionId = randomUUID();
  const currentTime = new Date().getTime();

  const newQuestion = new Question(
    currentTime,
    newQuestionId,
    author_id,
    authorName,
    title,
    question,
  );

  questionsDb.createQuestion(newQuestion);
  usersDb.addQuestionToUser(newQuestionId, author_id);
};

export default registerNewQuestion;
