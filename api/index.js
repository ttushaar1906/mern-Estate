import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import contactUsRouter from './routes/contactUs.route.js';
import homeVisitRouter from './routes/homeTour.route.js';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './db/index.js';

// Connect DB
connectDB();

// Resolve __dirname in ESModule
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json({ limit: '5kb' }));
app.use(express.urlencoded({ extended: true, limit: '5kb' }));
app.use(cookieParser());

// CORS config — allow frontend on Vercel (and localhost in dev)
app.use(cors({
  origin: [process.env.CLIENT_URL || 'http://localhost:5173' ||'http://localhost:3000' ],
  credentials: true
}));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// API routes
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);
app.use('/api/contactUs', contactUsRouter);
app.use('/api/user', userRouter);
app.use('/api/homeVisit', homeVisitRouter);

// Serve frontend static files (React build from /frontend/build)
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  console.log(message);
  
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;
