import {
  changeUserPassword,
  createUser,
  getUser,
} from '../controllers/UserController';
import { validateNewUserRegistration } from '../middlewares';

const { Router } = require('express');

const userRouter = Router();

userRouter.post('/register', validateNewUserRegistration, createUser);
userRouter.get('/login', getUser);

userRouter.put('/change-password/:userId', changeUserPassword);

export default userRouter;
