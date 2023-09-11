import { Request, Response } from 'express';
import * as services from '../services';
import handleError from '../functions/handleError';

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    await services.registerNewUser(req.body);
    res.status(201).json();
  } catch (error) {
    handleError(res, error);
  }
};

const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await services.login(req.body);
    res.json(user);
  } catch (error) {
    handleError(res, error);
  }
};

const changeUserPassword = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { userId } = req.params;

    await services.changeUserPassword({
      userId,
      ...req.body,
    });
    res.status(201).json();
  } catch (error) {
    handleError(res, error);
  }
};

export { createUser, getUser, changeUserPassword };
