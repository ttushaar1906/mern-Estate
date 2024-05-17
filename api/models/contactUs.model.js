import mongoose from "mongoose";

const contactUsSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
    },
    mobileNo :{
        type:String,
        required: true,
    },
    query:{
        type:String,
        required: true,
    }
},{ timestamps : true});

const ContactUs = mongoose.model('ContactUs',contactUsSchema);

export default ContactUs;