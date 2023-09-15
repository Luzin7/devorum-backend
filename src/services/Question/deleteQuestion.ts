import { QuestionsDbPg } from '../../repositories/QuestionRepository';
import { UsersDbPg } from '../../repositories/UserRepository';

const questionsDb = new QuestionsDbPg();
const usersDb = new UsersDbPg();

const deleteQuestion = async (question_id: string): Promise<void> => {
  const questionExists = await questionsDb.existingQuestion(question_id);

  if (questionExists.length <= 0) {
    throw new Error('User not found');
  }

  const authorId = questionExists[0].author_id;

  questionsDb.deleteQuestion(question_id);
  usersDb.removeQuestion(authorId, question_id);
};

export default deleteQuestion;
