const express = require('express');

const app = express();

app.use(express.json());
app.use(questionRouter);
app.use(userRouter);

module.exports = app;
