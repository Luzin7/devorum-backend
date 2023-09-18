import { sql } from '../../pgsql';
import postgres from 'postgres';
import User from '../models/User';

export class UsersDbPg {
  async addQuestionToUser(
    questionId: string,
    userId: string,
  ): Promise<postgres.RowList<postgres.Row[]>> {
    const query = sql`
  UPDATE users SET questions = array_append(questions, ${questionId}) WHERE id = ${userId}
  `;

    const result = await query;

    return result;
  }

  async removeQuestion(
    userId: string,
    questionId: string,
  ): Promise<postgres.RowList<postgres.Row[]>> {
    const query = sql`
  UPDATE users SET questions = array_remove(questions, ${questionId}) WHERE id = ${userId}
  `;

    const result = await query;

    return result;
  }

  async existingUser(info: string): Promise<postgres.RowList<postgres.Row[]>> {
    const query = sql`
      SELECT * FROM users WHERE name = ${info} OR contact = ${info} OR id = ${info}
    `;
    const result = await query;

    return result;
  }

  async login(): Promise<postgres.PendingQuery<postgres.Row[]>> {
    const query = sql`
      SELECT * FROM users
    `;

    const result = await query;

    return result;
  }

  async createUser(user: User): Promise<postgres.PendingQuery<postgres.Row[]>> {
    const { contact, created_at, id, name, password, salt } = user;

    const query = sql`
      INSERT INTO users (id, created_at, name, password, salt, contact)
      VALUES (${id}, ${created_at}, ${name}, ${password}, ${salt}, ${contact})
    `;

    const result = await query;

    return result;
  }

  async updatePassword(
    userId: string,
    hashedPassword: string,
    salt: string,
  ): Promise<postgres.PendingQuery<postgres.Row[]>> {
    const query = sql`
    UPDATE users
    SET password = ${hashedPassword}, salt = ${salt}
    WHERE id = ${userId}
    `;

    const result = await query;

    return result;
  }

  async deleteUser(
    userId: string,
  ): Promise<postgres.PendingQuery<postgres.Row[]>> {
    const query = sql`DELETE FROM users WHERE id = ${userId}`;

    const result = await query;

    return result;
  }
}
