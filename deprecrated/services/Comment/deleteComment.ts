import { CommentsDbPg } from '../../repositories/CommentRepository';

const commentsDb = new CommentsDbPg();

const deleteComment = async (comment_id: string): Promise<void> => {
  const commentExists = await commentsDb.existingComment(comment_id);

  console.log(commentExists);

  if (commentExists.length <= 0) {
    throw new Error('Comment not found');
  }

  commentsDb.deleteQuestion(comment_id);
};

export default deleteComment;
