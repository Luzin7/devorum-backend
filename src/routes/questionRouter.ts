import { Request, Response } from 'express';

import { Router } from 'express';

const questionRouter = Router();

questionRouter.get('/questions', (req: Request, res: Response) => {
  res.send('All Questions');
});

export default questionRouter;
