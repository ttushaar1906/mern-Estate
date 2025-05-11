import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
// dotenv.config({ path: "./.env", });
// import userRouter from './routes/user.route.js';
import authRouter from './routes/authRouter.js'; // Update the import path
import listingRouter from './routes/listing.route.js'
import contactUsRouter from './routes/contactUs.route.js'
import cookieParser from 'cookie-parser';
import path from 'path';
import connectDB from './db/index.js';
import cors from "cors";

console.log("Current Working Directory:", process.cwd());
import fs from 'fs';

console.log("🧪 .env exists:", fs.existsSync('.env'));
console.log("🧪 JWT_SECRET:", process.env.JWT_SECRET);
console.log("🧪 MONGODB_URL:", process.env.MONGODB_URL);

let data = connectDB()

const __dirname = path.resolve()

const app = express();

app.use(express.json());

app.use(cors());

app.use(cookieParser())

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);
app.use('/api/contactUs', contactUsRouter)

app.use(express.static(path.join(__dirname,'/client/dist')));
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'client','dist','index.html'))
})

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
