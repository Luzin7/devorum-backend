import postgres from 'postgres';
import { QuestionsDbPg } from '../../repositories/QuestionRepository';

const database = new QuestionsDbPg();

const getQuestions = async (): Promise<
postgres.PendingQuery<postgres.Row[]>
> => {
  const questions = await database.list();

  return questions;
};

export default getQuestions;
