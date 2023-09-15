import { Request, Response, NextFunction } from 'express';

const createQuestion = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { question, author_id, title } = req.body;

  if (!question || !author_id || !title) {
    res.status(409).json({ message: 'All fields must be provided' });
  } else {
    next();
  }
};

export default createQuestion;
