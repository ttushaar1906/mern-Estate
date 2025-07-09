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
    propertyImg:{
        type:String
    },
    propertyAddress:addressSchema,
    isCancelled:{
        type:Boolean,
        default: false   
    },
    loggedInUser: {
        type: String
    }
},
    { timestamps: true }
)

export const HomeTour = mongoose.model("HomeTour",homeTourSchema)