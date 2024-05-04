import mongoose from "mongoose";

// we are creating schemas i.e rules for user modules

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        require:true,
    },
    email:{
        type:String,
        unique:true,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    avatar:{
        type:String
    },
},{ timestamps : true});

//timestamps is used to keep record of account created and account updated

const User = mongoose.model('User', userSchema);

export default User;