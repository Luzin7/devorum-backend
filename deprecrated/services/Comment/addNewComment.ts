import { randomUUID } from 'node:crypto';
import { CommentsDbPg } from '../../repositories/CommentRepository';
import Comment from '../../models/Comment';
import { UsersDbPg } from '../../repositories/UserRepository';

const commentsDb = new CommentsDbPg();
const usersDb = new UsersDbPg();

const addNewComment = async ({
  comment,
  author_id,
  question_id,
}: Comment): Promise<void> => {
  const userExists = await usersDb.existingUser(author_id);

  if (userExists.length <= 0) {
    throw new Error('User not found');
  }

  const authorName = userExists[0].name;

  const newQuestionId = randomUUID();
  const currentTime = new Date().getTime();

  const newComment = new Comment(
    currentTime,
    newQuestionId,
    author_id,
    authorName,
    comment,
    question_id,
  );

  commentsDb.createComment(newComment);
};

export default addNewComment;
