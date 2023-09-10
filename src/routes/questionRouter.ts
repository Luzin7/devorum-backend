import { Router } from 'express';
import {
  getQuestions,
  createQuestion,
  createComment,
  deleteComment,
  deleteQuestion,
} from '../controllers/QuestionController';
import * as middlewares from '../middlewares';

const questionRouter = Router();

questionRouter.get('/questions', getQuestions);

questionRouter.post('/questions', middlewares.createQuestion, createQuestion);
questionRouter.delete(
  '/questions/:questionId',
  middlewares.deleteQuestion,
  deleteQuestion,
);

questionRouter.post(
  '/questions/comments',
  middlewares.createComment,
  createComment,
);
questionRouter.delete(
  '/questions/:questionId/comments/:commentId',
  middlewares.deleteComment,
  deleteComment,
);

export default questionRouter;
