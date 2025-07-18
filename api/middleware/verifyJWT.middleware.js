import jwt from "jsonwebtoken"
import User from "../models/user.module.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiErrorHandler } from "../utils/error.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
        const token =
            req.cookies?.accessToken ||
            req.headers["authorization"]?.replace("Bearer ", "").trim();

        if (!token) throw new apiErrorHandler(401, "Unauthorizated ! Please Login First")

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_KEY)

        const user = await User.findById(decodedToken?.id)

        if (!user) throw new apiErrorHandler(401, "Invalid Access Token")

        req.user = user;
    next()
})