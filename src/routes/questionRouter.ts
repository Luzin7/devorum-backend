import { Router } from 'express';
import askQuestion from '../controllers/QuestionController';
import { validateNewQuestionRegistration } from '../middlewares';

const questionRouter = Router();

questionRouter.post('/questions', validateNewQuestionRegistration, askQuestion);

export default questionRouter;
