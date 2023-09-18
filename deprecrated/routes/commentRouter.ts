import { Router } from 'express';
import {
  getCommentsById,
  createComment,
  deleteComment,
} from '../controllers/CommentController';
import * as middlewares from '../middlewares';

const commentRouter = Router();

commentRouter.get('/comments/:question_id', getCommentsById);
commentRouter.post(
  '/questions/comments',
  middlewares.createComment,
  createComment,
);
commentRouter.delete(
  '/comments/:comment_id',
  middlewares.deleteComment,
  deleteComment,
);
export default commentRouter;
