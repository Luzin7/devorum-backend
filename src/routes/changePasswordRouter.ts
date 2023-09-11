import { Router } from 'express';
import changeUserPassword from '../controllers/ChangeController';

const changePass = Router();

changePass.put('/change-password/:userId', changeUserPassword);

export default changePass;
