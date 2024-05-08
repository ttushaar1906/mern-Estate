import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/authRouter.js'; // Update the import path
import cookieParser from 'cookie-parser';

dotenv.config({ path: "./.env", });

mongoose
  .connect(
    `${process.env.mdbC}`
  )
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.log('Error while connecting', err);
  });

const app = express();
app.use(express.json());

app.use(cookieParser())

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})

export default app;
