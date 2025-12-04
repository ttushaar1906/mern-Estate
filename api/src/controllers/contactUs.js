import { ContactUs } from "../models/contactUs.model.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiErrorHandler } from "../utils/error.js";
import { mobileNoValidation, nameValidation } from "../utils/validationFile.js";

export const contactUs = asyncHandler(async (req, res) => {
  const { fullName, email, mobileNo, propertyType, inquiresType, message } = req.body
  const userId = req.user.id;

  nameValidation(fullName)
  mobileNoValidation(mobileNo)

  const data = await ContactUs.create({
    fullName,
    email,
    mobileNo,
    propertyType,
    inquiresType,
    message,
    user: userId
  })

  return res.status(200).json(new apiResponse(200, data, "Inequiry send successfully !!"))
})

export const viewInequiry = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const queries = await ContactUs.find({ user: userId }, { propertyType: 1, inquiresType: 1, message: 1 }).sort({ createdAt: -1 });
  if (queries.length === 0) throw new apiErrorHandler(400, "No Inequiry Raised")

  return res.status(200).json(new apiResponse(200, queries, "Query Found with current user",))
})