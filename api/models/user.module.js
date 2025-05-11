import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        require:true,
    },
    userEmail:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    avatar:{
        type:String
    },
    mobileNo:{
        type:Number
    },
    refreshToken: {
        type: String
    }
},{ timestamps : true});

//timestamps is used to keep record of account created and account updated

const User = mongoose.model('User', userSchema);

export default User;