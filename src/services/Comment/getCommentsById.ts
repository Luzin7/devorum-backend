import postgres from 'postgres';
import { CommentsDbPg } from '../../repositories/CommentRepository';

const database = new CommentsDbPg();

const getCommentsById = async (
  question_id: string,
): Promise<postgres.PendingQuery<postgres.Row[]>> => {
  const comments = await database.listById(question_id);

  return comments;
};

export default getCommentsById;
