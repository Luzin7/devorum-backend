import { Request, Response, NextFunction } from 'express';

const createComment = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { comment, author_id, question_id } = req.body;

  if (!comment || !author_id || !question_id) {
    res.status(409).json({ message: 'All fields must be provided' });
  } else {
    next();
  }
};

export default createComment;
