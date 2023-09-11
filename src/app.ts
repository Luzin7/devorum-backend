import express from 'express';
import questionRouter from './routes/questionRouter';
import userRouter from './routes/userRouter';
import changePass from './routes/changePasswordRouter';

const app = express();

app.use(express.json());
app.use(questionRouter);
app.use(userRouter);
app.use(changePass);

export default app;
