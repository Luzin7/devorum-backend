import { Request, Response, NextFunction } from 'express';

const validateNewUserRegistration = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { name, password, contact } = req.body;

  if (!name || !password || !contact) {
    res.status(409).json({ message: 'All fields must be provided' });
  } else {
    next();
  }
};

export default validateNewUserRegistration;
