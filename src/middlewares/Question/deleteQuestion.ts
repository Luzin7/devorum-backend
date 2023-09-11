import { Request, Response, NextFunction } from 'express';

const deleteQuestion = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { questionId } = req.params;

  if (!questionId) {
    res.status(409).json({ message: 'The question ID must be provided' });
  } else {
    next();
  }
};

export default deleteQuestion;
