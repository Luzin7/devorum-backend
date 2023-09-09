import { Request, Response, NextFunction } from 'express';

const createComment = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { comment, authorId, questionId } = req.body;

  if (!comment || !authorId || !questionId) {
    res.status(409).json({ message: 'All fields must be provided' });
  } else {
    next();
  }
};

export default createComment;
