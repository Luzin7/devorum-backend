import { Request, Response } from 'express';
import * as services from '../services';
import handleError from '../functions/handleError';

const changeUserPassword = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { userId } = req.params;
    console.log('userId:', userId);

    await services.changeUserPassword({
      userId,
      ...req.body,
    });
    res.status(201).json();
  } catch (error) {
    handleError(res, error);
  }
};

export default changeUserPassword;
