import express from 'express';
import questionRouter from './routes/questionRouter';
import cors from 'cors';
import 'dotenv/config';
import userRouter from './routes/userRouter';
import commentRouter from './routes/commentRouter';

const app = express();
const corsOptions = {
  origin: process.env.DEV_URL,
};
app.use(express.json());
app.use(cors(corsOptions));
app.use(questionRouter);
app.use(userRouter);
app.use(commentRouter);

export default app;
