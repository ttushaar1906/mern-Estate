import { asyncHandler } from "./asyncHandler.js";
import jwt from "jsonwebtoken"

export const generateAccessToken = async (payload, duration) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, { expiresIn: duration })
}

export const generateRefreshToken = async (payload, duration) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, { expiresIn: duration })
}