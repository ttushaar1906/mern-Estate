import { ContactUs } from "../models/contactUs.model.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { mobileNoValidation, nameValidtion } from "../utils/validationFile.js";

export const contactUs = asyncHandler(async(req,res)=>{
  const {fullName, email, mobileNo,propertyType,inquiresType, message} = req.body

  nameValidtion(fullName)
  mobileNoValidation(mobileNo)

  const data = await ContactUs.create({
    fullName,
    email,
    mobileNo,
    propertyType,
    inquiresType,
    message
  })

  return res.status(200).json(new apiResponse(200,data, "Inequiry send successfully !!"))
})