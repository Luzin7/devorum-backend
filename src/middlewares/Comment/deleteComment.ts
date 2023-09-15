import { Request, Response, NextFunction } from 'express';

const deleteComment = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { comment_id } = req.params;

  if (!comment_id) {
    res.status(409).json({ message: 'Comment ID must be provided' });
  } else {
    next();
  }
};

export default deleteComment;
