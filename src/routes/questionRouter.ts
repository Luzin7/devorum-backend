import { Router } from 'express';
import { askQuestion, addComment } from '../controllers/QuestionController';
import {
  validateNewQuestionRegistration,
  validateNewComment,
} from '../middlewares';

const questionRouter = Router();

questionRouter.post('/questions', validateNewQuestionRegistration, askQuestion);
questionRouter.post('/questions/comments', validateNewComment, addComment);

export default questionRouter;
