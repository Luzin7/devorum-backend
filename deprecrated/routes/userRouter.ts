import { Router } from 'express';
import {
  // changeUserPassword,
  createUser,
  userAuth,
  deleteAccount,
} from '../controllers/UserController';
import { validateNewUserRegistration } from '../middlewares';

const userRouter = Router();

userRouter.post('/register', validateNewUserRegistration, createUser);
userRouter.get('/login', userAuth);
userRouter.delete('/users/:user_id', deleteAccount);

// userRouter.put('/change-password/:userId', changeUserPassword);

export default userRouter;
