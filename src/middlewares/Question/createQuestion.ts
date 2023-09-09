import { Request, Response, NextFunction } from 'express';

const createQuestion = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { question, authorId } = req.body;

  if (!question || !authorId) {
    res.status(409).json({ message: 'All fields must be provided' });
  } else {
    next();
  }
};

export default createQuestion;
