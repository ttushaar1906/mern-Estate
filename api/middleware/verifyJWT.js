import jwt from "jsonwebtoken"
import User from "../models/user.module.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiErrorHandler } from "../utils/error.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token =
            req.cookies?.accessToken ||
            req.headers["authorization"]?.replace("Bearer ", "").trim();

            // console.log(token);
            

        if (!token) throw new apiErrorHandler(401, "Unauthorization")

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_KEY)

        const user = await User.findById(decodedToken?.id)

        if (!user) throw new apiErrorHandler(401, "Invalid Access Token")

        req.user = user;
        next()
    } catch (error) {
        throw new apiErrorHandler(500, error?.message || "Something went wrong !!")
    }
})