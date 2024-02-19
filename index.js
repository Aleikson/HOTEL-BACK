import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to Mongo');
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();

app.use(express.json());

app.use(cookieParser());

app.listen(5555, () => {
  console.log('Running');
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.use((error, request, response, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  return response.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
