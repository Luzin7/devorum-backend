import { Request, Response } from 'express';
import registerUsers from '../controllers/UserController';

const { Router } = require('express');

const userRouter = Router();

userRouter.get('/users', (req: Request, res: Response) => {
  res.send('All Users');
});

userRouter.post('/register', registerUsers);

export default userRouter;
