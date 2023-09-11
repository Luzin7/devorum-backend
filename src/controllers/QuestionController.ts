import { Request, Response } from 'express';
import * as services from '../services';
import handleError from '../functions/handleError';

const getQuestions = async (req: Request, res: Response): Promise<void> => {
  try {
    const questions = await services.getQuestions();
    res.json(questions);
  } catch (error) {
    handleError(res, error);
  }
};

const createQuestion = async (req: Request, res: Response): Promise<void> => {
  try {
    await services.createQuestion(req.body);
    res.status(201).json();
  } catch (error) {
    handleError(res, error);
  }
};

const createComment = async (req: Request, res: Response): Promise<void> => {
  try {
    await services.addNewComment(req.body);
    res.status(201).json();
  } catch (error) {
    handleError(res, error);
  }
};

const deleteQuestion = async (req: Request, res: Response): Promise<void> => {
  const { questionId } = req.params;

  try {
    await services.deleteQuestion(questionId);
    res.status(202).json();
  } catch (error) {
    handleError(res, error);
  }
};

const deleteComment = async (req: Request, res: Response): Promise<void> => {
  const { questionId, commentId } = req.params;
  try {
    await services.deleteComment(commentId, questionId);
    res.status(202).json();
  } catch (error) {
    handleError(res, error);
  }
};

export {
  getQuestions,
  createQuestion,
  createComment,
  deleteQuestion,
  deleteComment,
};
