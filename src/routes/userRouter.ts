import { createUser, getUser } from '../controllers/UserController';
import { validateNewUserRegistration } from '../middlewares';

const { Router } = require('express');

const userRouter = Router();

userRouter.post('/register', validateNewUserRegistration, createUser);
userRouter.get('/login', getUser);

export default userRouter;
