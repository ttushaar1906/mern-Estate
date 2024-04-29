// index.js (or main server file)
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/authRouter.js'; // Update the import path

dotenv.config();

mongoose
  .connect(
    "mongodb+srv://ttushaar45:tushar1906@cluster0.dtjlqer.mongodb.net/estate_mern?retryWrites=true&w=majority&appName=Cluster0",
  )
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.log('Error while connecting', err);
  });

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

export default app;
