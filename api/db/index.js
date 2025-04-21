import mongoose from "mongoose";
import { errorHandler } from "../utils/error.js";

const connectDB = async () => {
    try {
        const dbURL = 'mongodb://127.0.0.1:27017/realEState'
        const dbResponse = await mongoose.connect(dbURL)
        console.log(`DB Connected !`);
        
    } catch (error) {
        console.log(`Error Connecting with DB ${error}`);
        return (errorHandler(500, 'Internal Server Error'));

    }
}

export default connectDB