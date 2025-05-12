import User from "../models/user.module.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { emailValidation, mobileNoValidation, nameValidtion } from "../utils/validationFile.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiErrorHandler } from "../utils/error.js";
import { apiResponse } from "../utils/apiResponse.js";
import dotenv from 'dotenv';
dotenv.config({ path: "../.env", });
import {generateAccessToken, generateRefreshToken} from "../utils/token.js"

const generateAccessTokenRefreshToken = async (id) => {
    try {
        const user = await User.findById(id)
        console.log(user.id);
        
        const payload = {
            id: user._id,
            userEmail: user.userEmail
        }
        const accessToken =await generateAccessToken(payload, process.env.ACCESS_TOKEN_EXPIRY)
        const refreshToken =await generateRefreshToken(payload,process.env.REFRESH_TOKEN_EXPIRY)
        
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
    nameValidtion(userName)
    emailValidation(userEmail)
    mobileNoValidation(mobileNo)

    const existingUser = await User.findOne({
        $or: [
          { userName },
          { userEmail },
          { mobileNo }
        ]
      });

    if(existingUser){
        throw new apiErrorHandler(409,"User Already registered with some credentials")
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


export const signIn = asyncHandler(async(req,res)=>{
    const {userEmail, password} = req.body
    const user = await User.findOne({userEmail})
    if(!user) throw new apiErrorHandler(404,'User not found !!')

    const validPassword = bcryptjs.compareSync(password, user.password);
    if(!validPassword) throw new apiErrorHandler(400,'Password does not match')
    
    const loggedInUser = await User.findById(user._id).select("-password -refreshToekn")

    const { accessToken, refreshToken } = await generateAccessTokenRefreshToken(user._id)
    
    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new apiResponse(200,loggedInUser,'Logged In Successfully'))
})

// export const loggout = asyncHandler(async(req,res)=>{
    

//     res.clearCookie("accesstoken", options);
//     res.clearCookie("refreshtoken", options);
// })

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





    // const existingUser = await User.find({
    //     $or: [{ username }, { userEmail }, { mobileNo }]
    // });

    // if (existingUser.length > 0) {
    //     throw new apiErrorHandler(409, "User email, username or mobile number already exists!");
    // }