import jwt from "jsonwebtoken"

export const generateAccessToken = async (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY })
}

export const generateRefreshToken = async (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY })
}