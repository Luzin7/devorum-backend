import { Request, Response, NextFunction } from 'express';

const deleteQuestion = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { question_id } = req.params;

  if (!question_id) {
    res.status(409).json({ message: 'The question ID must be provided' });
  } else {
    next();
  }
};

export default deleteQuestion;
