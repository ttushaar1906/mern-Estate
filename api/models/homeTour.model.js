import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    line1: String,
    line2: String,
    city: String,
    state: String,
    postalCode: String,
})


const homeTourSchema = new mongoose.Schema({
    visitorName: {
        type: String
    },
    noOfVisitingPeople: {
        type: Number
    },
    visitingTime: {
        type: String
    },
    visitingDate: {
        type: String
    },
    visitingPropertyName:{
        type:String
    },
    propertyAddress:addressSchema,
    loggedInUser: {
        type: String
    }
},
    { timestamps: true }
)

export const HomeTour = mongoose.model("HomeTour",homeTourSchema)