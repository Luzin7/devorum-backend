import express from 'express';
import questionRouter from './routes/questionRouter';
import userRouter from './routes/userRouter';

const app = express();

app.use(express.json());
app.use(questionRouter);
app.use(userRouter);

export default app;
