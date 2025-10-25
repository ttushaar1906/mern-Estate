import bcryptjs from "bcryptjs";
import User from "../models/user.module.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { cloudinaryUpload } from "../utils/cloudinary.js";
import { apiErrorHandler } from "../utils/error.js";
import { sendMailFn } from "../utils/mailSender.js";

export const getUser = asyncHandler(async(req,res)=>{
    const userId = req.user.id
    const user = await User.find({_id:userId}).select("-password -refreshToken")
    
    if(!user) throw new apiErrorHandler(400,"User Not Found")
    
    return res.status(200).json(new apiResponse(200,user,"Users Details"))
})

// Update user 
export const updateUser = asyncHandler(async(req,res)=>{
    const userId = req.user.id

    if(!userId) return res.status(400).json({statusCode:400, message:"User not found"})
    
    const user = await User.findOne({_id:userId}).select("-password -refreshToken")
    
    if(!user) throw new apiErrorHandler(400,"User Not Found")
  
    const allowedFields = ["userName", "userEmail", "mobileNo"];
    allowedFields.forEach((field) => {
    if (req.body[field]) {
      user[field] = req.body[field];
    }
  });
  
  if (req.file) {
    const result = await cloudinaryUpload(req.file.path);
    if (result?.secure_url) {
      user.avatar = result.secure_url;
    }
  }

  // Save the updated user
  const updatedUser = await user.save();
  return res.status(200).json({statusCode:200, message:"User Found and Updated !!", user:updatedUser})
})

export const forgotPassword = asyncHandler(async(req,res)=>{
  const userEmail = req.body

  const user = await User.findOne(userEmail)  
   if(!user) throw new apiErrorHandler(404,"User Not Found with provide email address")
  
  const OTP = Math.floor(100000 + Math.random() * 900000); 
  user.otp = OTP

  await user.save()

  sendMailFn({
    to:user.userEmail,
      reason: "otpSend",
      otp:user.otp
  })
  return res.status(200).json(new apiResponse(200,user,"OTP send"))
})

export const verifyOTP = asyncHandler(async(req,res)=>{
  const {userEmail, otp} = req.body

  const user = await User.findOne({userEmail})

  if(!user) throw new apiErrorHandler(404, "User Not Found this Email address")

   if(!otp) throw new apiErrorHandler(400, "Please enter a valid OTP") 

  if(user.otp === otp) {
    user.otp = ""
    await user.save()
    return res.status(200).json(new apiResponse(200, user, "OTP verified successfully"))
  } 
    throw new apiErrorHandler(400, "OTP doesn't match")
})

export const newPassword = asyncHandler(async(req,res)=>{
  const {userEmail,password} = req.body
  const user = await User.findOne({userEmail})
  
  if(!user) throw new apiErrorHandler(400,"User not found with provided email")

  const hashedPassword = await bcryptjs.hash(password, 10);
  user.password = hashedPassword 
  await user.save()
  
  return res.status(200).json(new apiResponse(200,user, "Password Reset successfully !"))
})
