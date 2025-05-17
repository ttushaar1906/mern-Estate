import jwt from 'jsonwebtoken';
import { apiErrorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies?.access_token;
  console.log(token);
  

  if (!token) {
    return next(new apiErrorHandler(401, 'Unauthorized'));
  }

  const secretKey = process.env.ACCESS_TOKEN_SECRET;

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return next(new apiErrorHandler(403, 'Forbidden'));
    }

    req.user = decoded;
    next();
  });
};
