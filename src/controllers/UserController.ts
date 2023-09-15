import { Request, Response } from 'express';
import handleError from '../functions/handleError';
import * as services from '../services';

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    await services.registerNewUser(req.body);
    res.status(201).json();
  } catch (error) {
    handleError(res, error);
  }
};

const userAuth = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await services.login(req.body);
    res.json(user);
  } catch (error) {
    handleError(res, error);
  }
};

// const changeUserPassword = async (
//   req: Request,
//   res: Response,
// ): Promise<void> => {
//   try {
//     const { userId } = req.params;

//     await services.changeUserPassword({
//       userId,
//       ...req.body,
//     });
//     res.status(201).json();
//   } catch (error) {
//     handleError(res, error);
//   }
// };

const deleteAccount = async (req: Request, res: Response): Promise<void> => {
  const { user_id } = req.params;
  try {
    await services.deleteUser(user_id);
    res.status(204).json();
  } catch (error) {
    handleError(res, error);
  }
};

export { createUser, userAuth, deleteAccount };
