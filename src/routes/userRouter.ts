import registerUsers from '../controllers/UserController';
import { validateNewUserRegistration } from '../middlewares';

const { Router } = require('express');

const userRouter = Router();

userRouter.post('/register', validateNewUserRegistration, registerUsers);

export default userRouter;
