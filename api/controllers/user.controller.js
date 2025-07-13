import User from "../models/user.module.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { cloudinaryUpload } from "../utils/cloudinary.js";
import { apiErrorHandler } from "../utils/error.js";

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

// export const test = (req, res) => {
//   res.send("Hello World!")
// }

// export const updateUser = async (req, res, next) => {
//   if (req.user.id !== req.params.id)
//     return next(errorHandler(401, 'You can only update your own account!'));

//   try {
//     if (req.body.password) {
//       req.body.password = bcryptjs.hashSync(req.body.password, 10)
//     }
//     const updatedUser = await User.findByIdAndUpdate(req.params.id, {
//       $set: {
//         username: req.body.username,
//         email: req.body.email,
//         password: req.body.password,
//         avatar: req.body.avatar,
//       }
//     }, { new: true });
//     const { password, ...rest } = updatedUser._doc
//     res.status(200).json(rest)
//   } catch (error) {
//     console.log(error);

//     next(error)
//   }
// }

// export const deleteUser = async (req, res, next) => {
//   if (req.user.id !== req.params.id) return next(errorHandler('You can only delete account', 401));
  
//   try {
//     await User.findOneAndDelete({ _id: req.params.id });
//     res.clearCookie('access_token');
//     res.status(200).json('User has been deleted!');
//   } catch (error) {
//     next(error);
//   }
// }

// export const getUserListing = async (req, res, next) => {
//   if (req.user.id === req.params.id) {
//     try {
//       const listings = await Listing.find({ userRef: req.params.id })
//       res.status(200).json(listings);
//     } catch (error) {
//       next(error)
//     }
//   }
//   else {
//     return next(errorHandler(401, 'You can only view our own Listing'))
//   }
// }

// export const getUser = async (req, res, next) => {
//   try {

//     const user = await User.findById(req.params.id);

//     if (!user) return next(errorHandler(404, 'User not found!'));

//     const { password: pass, ...rest } = user._doc;

//     res.status(200).json(rest);
//   } catch (error) {
//     next(error);
//   }
// };