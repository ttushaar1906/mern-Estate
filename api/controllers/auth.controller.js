import User from "../models/user.module.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { nameValidtion } from "../utils/validationFile.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiErrorHandler } from "../utils/error.js";
import { apiResponse } from "../utils/apiResponse.js";

const generateAccessTokenRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        
        user.refreshToken = refreshToken        
        await user.save({ ValidateBeforeSave: false })
        return { accessToken, refreshToken }

    } catch (error) {
        console.log(error);
        throw new apiErrorHandler(500, "Something went wrong !!")
    }
}

export const signUp = asyncHandler(async(req,res)=>{
    const {username,userEmail,mobileNo,password} = req.body

    const existingUser = await User.find({
        $or: [{ username },{ userEmail } , {mobileNo}]
    })

    if (existingUser.length > 0) {
        throw new apiErrorHandler(409, "User email or user name already exists !!")
    }
    
    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await User.create({
        username,
        userEmail,
        mobileNo,
        password:hashedPassword,
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    return res.status(200).json( new apiResponse(200, createdUser, "User created"))
})

// export const signIn = async (req, res, next) => {
//     const { email, password } = req.body;
//     try {
//         const userValid = await User.findOne({ email });
        
//         if (!userValid) return next(apiErrorHandler(404, 'User not found!'))

//         const validPassword = bcryptjs.compareSync(password, userValid.password);

//         if (!validPassword) return next(apiErrorHandler(404, "Incorrect Credentials"))
//         const secretKey = `${process.env.JWT_SECRET}`

//         const token = jwt.sign({ id: userValid._id }, secretKey)
//         const { password: pass, ...rest } = userValid._doc;        
//         res.cookie('access_token', token, { http: true }).status(200).json(rest)
//     }
//     catch (error) {
//         next(error);
//     }
// }

// export const google = async (req, res, next) => {
//     try {
//         const user = await User.findOne({ email: req.body.email });
//         if (user) {
//             const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//             const { password: pass, ...rest } = user._doc;
//             res
//                 .cookie('access_token', token, { httpOnly: true })
//                 .status(200)
//                 .json(rest);
//         } else {
//             const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
//             const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
//             const newUser = new User({ username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4), email: req.body.email, password: hashedPassword, avatar: req.body.photo });
//             await newUser.save();
//             const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
//             const { password: pass, ...rest } = newUser._doc;
//             res
//                 .cookie('access_token', token, { httpOnly: true })
//                 .status(200)
//                 .json(rest);
//         }
//     } catch (error) {
//         next(error);
//     }
// };

// export const signOut = async (req, res, next) => {
//     try {
//         res.clearCookie('access-token');
//         res.status(200).json("Sign out Successfully!")
//     } catch (error) {
//         next(error)
//     }
// }