import { Request, Response } from 'express';
import handleError from '../functions/handleError';
import * as services from '../services';

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

const deleteQuestion = async (req: Request, res: Response): Promise<void> => {
  const { question_id } = req.params;

  try {
    await services.deleteQuestion(question_id);
    res.status(202).json();
  } catch (error) {
    handleError(res, error);
  }
};

export { getQuestions, createQuestion, deleteQuestion };
