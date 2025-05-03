import jwt from 'jsonwebtoken';
import { apiErrorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(apiErrorHandler(401, 'Unauthorized'));
  const secretKey = `${process.env.JWT_SECRET}`
  
  jwt.verify(token, secretKey, (err, user) => {
    if (err) return next(apiErrorHandler(403, 'Forbidden'));

    req.user = user;
    next();
  });
};