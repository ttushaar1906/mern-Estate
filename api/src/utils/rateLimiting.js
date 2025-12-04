import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5,                  // max 5 requests per IP per window
  message: "Too many requests, try again later."
});
