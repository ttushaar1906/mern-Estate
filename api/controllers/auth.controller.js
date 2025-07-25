import User from "../models/user.module.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { emailValidation, mobileNoValidation, nameValidation } from "../utils/validationFile.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiErrorHandler } from "../utils/error.js";
import { apiResponse } from "../utils/apiResponse.js";
import dotenv from 'dotenv';
dotenv.config({ path: "../.env", });
import { generateAccessToken, generateRefreshToken } from "../utils/token.js"

const generateAccessTokenRefreshToken = async (id) => {
    try {
        const user = await User.findById(id)
        const payload = {
            id: user._id,
            userEmail: user.userEmail,
            name: user.userName
        }
        const accessToken = await generateAccessToken(payload)

        const refreshToken = await generateRefreshToken(payload)

        user.refreshToken = refreshToken
        await user.save({ ValidateBeforeSave: false })
        return { accessToken, refreshToken }

    } catch (error) {
        console.log(error);
        throw new apiErrorHandler(500, `Something went wrong !! ${error}`)
    }
}

export const signUp = asyncHandler(async (req, res) => {
    const { userName, userEmail, mobileNo, password } = req.body;
    nameValidation(userName)
    emailValidation(userEmail)
    mobileNoValidation(mobileNo)

    const existingUser = await User.findOne({
        $or: [
            { userName },
            { userEmail },
            { mobileNo }
        ]
    });

    if (existingUser) {
        throw new apiErrorHandler(409, "User Already registered with some credentials")
    }
    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await User.create({
        userName,
        userEmail,
        mobileNo,
        password: hashedPassword,
    });

    return res.status(200).json(new apiResponse(200, user, "User created"));
});

export const signIn = asyncHandler(async (req, res) => {
    const { userEmail, password } = req.body
    if (userEmail === "") throw new apiErrorHandler(400, "User email field is required")
    if (password === "") throw new apiErrorHandler(400, "Password is required")

    const user = await User.findOne({ userEmail })
    if (!user) throw new apiErrorHandler(404, 'User not found !!')

    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) throw new apiErrorHandler(400, 'Password does not match')

    const { accessToken, refreshToken } = await generateAccessTokenRefreshToken(user._id)

    user.refreshToken = refreshToken;
    await user.save();

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        path: '/'
    }

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new apiResponse(200, user, 'Logged In Successfully'))
})

export const googleLogIn = asyncHandler(async (req, res) => {
    const { email, name, photo } = req.body;

    // Check if user already exists
    const user = await User.findOne({ userEmail: email });

    if (user) {
        const { accessToken, refreshToken } = await generateAccessTokenRefreshToken(user._id);

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            path: '/'
        };

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(new apiResponse(200, user, "Logged In Successfully"));
    }

    // New user case
    const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
    const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

    const newUser = new User({
        userName: name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
        userEmail: email,
        password: hashedPassword,
        avatar: photo,
    });

    await newUser.save();

    const { accessToken, refreshToken } = await generateAccessTokenRefreshToken(newUser._id);

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        path: '/'
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new apiResponse(200, newUser, "Account Created and Logged In"));
});


export const logout = asyncHandler(async (req, res) => {

    const userId = req.user.id

    if (!userId) return res.status(401).json({ statusCode: 401, message: "Unauthorised" })

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        path: '/'
    }
    await User.findByIdAndUpdate(userId, { refreshToken: "", isLoggedIn: false })

    res.clearCookie("accessToken", options);
    res.clearCookie("refreshToken", options);

    return res.status(200).json({ statusCode: 200, message: "User Logged out successfully !!" })
})
