import { Request, Response, NextFunction } from 'express';

const deleteComment = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { questionId, commentId } = req.params;

  if (!questionId || !commentId) {
    res.status(409).json({ message: 'All fields must be provided' });
  } else {
    next();
  }
};

export default deleteComment;
