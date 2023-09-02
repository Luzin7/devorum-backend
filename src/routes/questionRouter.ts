import { Request, Response } from 'express';

import { Router } from 'express';

import askQuestion from '../controllers/QuestionController';

const questionRouter = Router();

questionRouter.get('/questions', (req: Request, res: Response) => {
  res.send('All Questions');
});

questionRouter.post('/questions', askQuestion);

export default questionRouter;
