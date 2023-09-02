import { Request, Response } from 'express';

const { Router } = require('express');

const userRouter = Router();

userRouter.get('/users', (req: Request, res: Response) => {
  res.send('All Users');
});

export default userRouter;
