import { HomeTour } from "../models/homeTour.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { nameValidation } from "../utils/validationFile.js";

export const viewUpcomingTours = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    
    const response = await HomeTour.find({loggedInUser:userId}).sort({ createdAt: -1 })

    if (!response || response.length === 0) return res.status(400).json({ statusCode: 400, message: "No home tour for current user " })
    return res.status(200).json({ statusCode: 200, message: "Home visit schedule !!", response })
})

export const scheduleHomeTour = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    
    const { visitorName, noOfVisitingPeople, visitingTime, visitingDate, visitingPropertyName, propertyAddress } = req.body

    const { line1, line2, city, state, postalCode } = propertyAddress

    nameValidation(visitorName)

    const response = await HomeTour.create({
        visitorName, 
        noOfVisitingPeople,
        visitingTime,
        visitingDate,
        visitingPropertyName,
        propertyAddress:{
            line1,
            line2,
            city,
            state, 
            postalCode
        },
        loggedInUser:userId
    })
    return res.status(200).json({ statusCode: 200, message: "Schedule Booked for home tour", response})
})