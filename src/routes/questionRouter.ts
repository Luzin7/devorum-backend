import { Request, Response } from 'express';

const { Router } = require('express');

const questionRouter = Router();

questionRouter.get('/questions', (req: Request, res: Response) => {
  res.send('All Questions');
});

module.exports = questionRouter;
