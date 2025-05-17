import mongoose from "mongoose"
const contactUsSchema = new mongoose.Schema({
    fullName: {
        type: String
    },
    email: {
        type: String
    },
    mobileNo: {
        type: Number
    },
    propertyType: {
        type: String,
        enum: ["Residential", "Commerical", "Industrial", "Land", "Villa"]
    },
    inquiresType: {
        type: String,
        enum: ["Buying", "Selling", "Renting", "Other"]
    },
    message: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
}, {
    timestamps: true
})

export const ContactUs = mongoose.model("Contactus", contactUsSchema)