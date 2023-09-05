import { Request, Response } from 'express';
import * as services from '../services';
import handleError from '../functions/handleError';

const registerUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    await services.registerNewUser(req.body);
    res.status(201).json();
  } catch (error) {
    handleError(res, error);
  }
};

export default registerUsers;
