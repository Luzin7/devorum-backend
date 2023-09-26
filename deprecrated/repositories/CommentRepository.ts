import { sql } from '../../pgsql'
import postgres from 'postgres'
import Comment from '../models/Comment'

export class CommentsDbPg {
  async existingComment(id: string): Promise<postgres.RowList<postgres.Row[]>> {
    const query = sql`
      SELECT * FROM comments WHERE id = ${id}
    `

    const result = await query

    return result
  }

  async listById(
    question_id: string,
  ): Promise<postgres.PendingQuery<postgres.Row[]>> {
    const query = sql`
      SELECT * FROM comments WHERE question_id = ${question_id}
    `

    const result = await query

    return result
  }

  async createComment(
    newComment: Comment,
  ): Promise<postgres.PendingQuery<postgres.Row[]>> {
    const { author_id, author_name, comment, created_at, id, question_id } =
      newComment

    const query = sql`
      INSERT INTO comments (id, created_at, author_id, author_name, comment, question_id)
      VALUES (${id}, ${created_at}, ${author_id}, ${author_name}, ${comment}, ${question_id})
    `

    const result = await query

    return result
  }

  async deleteQuestion(
    id: string,
  ): Promise<postgres.PendingQuery<postgres.Row[]>> {
    const query = sql`DELETE FROM comments WHERE question_id = ${id} OR id = ${id}`

    const result = await query

    return result
  }
}
