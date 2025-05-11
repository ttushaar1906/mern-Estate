import mongoose from "mongoose";
import { apiErrorHandler } from "../utils/error.js";

const connectDB = async () => {
    try {
        // const dbURL = 'mongodb://127.0.0.1:27017/realEState'
        const dbURL = `${process.env.MONGODB_URL}`
        console.log(`This is db url ${dbURL}`);
        
        const dbResponse = await mongoose.connect(dbURL)
        console.log(`DB Connected !`);
        
    } catch (error) {
        console.log(`Error Connecting with DB ${error}`);
        throw new apiErrorHandler(500, 'Internal Server Error');

    }
}

export default connectDB