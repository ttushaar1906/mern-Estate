import { HomeTour } from "../models/homeTour.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { nameValidation } from "../utils/validationFile.js";

export const viewUpcomingTours = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const response = await HomeTour.find({ loggedInUser: userId }).sort({ createdAt: -1 }).select("-createdAt -updatedAt")

    if (!response || response.length === 0) return res.status(400).json({ statusCode: 400, message: "No home tour for current user " })
    return res.status(200).json({ statusCode: 200, message: "Home visit schedule !!", response })
})

export const scheduleHomeTour = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const { visitorName, noOfVisitingPeople, visitingTime, visitingDate, visitingPropertyName, propertyImg, propertyAddress } = req.body

    const { line1, line2, city, state, postalCode } = propertyAddress

    nameValidation(visitorName)

    const response = await HomeTour.create({
        visitorName,
        noOfVisitingPeople,
        visitingTime,
        visitingDate,
        visitingPropertyName,
        propertyImg,
        propertyAddress: {
            line1,
            line2,
            city,
            state,
            postalCode
        },
        loggedInUser: userId
    })
    return res.status(200).json({ statusCode: 200, message: "Schedule Booked for home tour", response })
})

export const cancelHomeVisit = asyncHandler(async (req, res) => {
    const { id } = req.params
    const response = await HomeTour.findByIdAndUpdate(
        id,
        { isCancelled: true },
        { new: true }
    );
    
    if (!response)  res.status(400).json({ statusCode: 400, message: "Failed to cancel Meeting" })

    return res.status(200).json({ statusCode: 200, message: "Home Visit Cancelled SuccessFully" })
})