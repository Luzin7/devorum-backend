import { Request, Response } from 'express';
import handleError from '../functions/handleError';
import * as services from '../services';

const createComment = async (req: Request, res: Response): Promise<void> => {
  try {
    await services.addNewComment(req.body);
    res.status(201).json();
  } catch (error) {
    handleError(res, error);
  }
};

const getCommentsById = async (req: Request, res: Response): Promise<void> => {
  const { question_id } = req.params;
  try {
    const comments = await services.getCommentsById(question_id);
    res.json(comments);
  } catch (error) {
    handleError(res, error);
  }
};

const deleteComment = async (req: Request, res: Response): Promise<void> => {
  const { comment_id } = req.params;
  try {
    await services.deleteComment(comment_id);
    res.status(202).json();
  } catch (error) {
    handleError(res, error);
  }
};

export { createComment, getCommentsById, deleteComment };
