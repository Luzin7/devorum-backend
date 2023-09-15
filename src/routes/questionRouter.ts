import { Router } from 'express';
import {
  getQuestions,
  createQuestion,
  // createComment,
  // deleteComment,
  deleteQuestion,
} from '../controllers/QuestionController';
import * as middlewares from '../middlewares';

const questionRouter = Router();

questionRouter.get('/questions', getQuestions);

questionRouter.post('/questions', middlewares.createQuestion, createQuestion);
questionRouter.delete(
  '/questions/:question_id',
  middlewares.deleteQuestion,
  deleteQuestion,
);

export default questionRouter;
