import { Response } from 'express';

function handleError(res: Response, error: unknown): void {
  if (error instanceof Error) {
    res.status(500).json({ message: error.message });
  } else {
    res.status(500).json({ message: 'Internal server error' });
  }
}

export default handleError;
