import { sql } from '../../pgsql';
import postgres from 'postgres';
import Question from '../models/Question';

export class QuestionsDbPg {
  async existingQuestion(
    info: string,
  ): Promise<postgres.RowList<postgres.Row[]>> {
    const query = sql`
      SELECT * FROM questions WHERE id = ${info}
    `;
    const result = await query;

    return result;
  }

  async list(): Promise<postgres.PendingQuery<postgres.Row[]>> {
    const query = sql`
      SELECT * FROM questions
    `;

    const result = await query;

    return result;
  }

  async createQuestion(
    newQuestion: Question,
  ): Promise<postgres.PendingQuery<postgres.Row[]>> {
    const { author_id, author_name, create_at, id, question, title } =
      newQuestion;

    const query = sql`
      INSERT INTO questions (id,created_at, author_id, author_name, title, question)
      VALUES (${id}, ${create_at}, ${author_id}, ${author_name}, ${title}, ${question})
    `;

    const result = await query;

    return result;
  }

  async deleteQuestion(
    questionId: string,
  ): Promise<postgres.PendingQuery<postgres.Row[]>> {
    const query = sql`DELETE FROM questions WHERE id = ${questionId}`;

    const result = await query;

    return result;
  }
}
