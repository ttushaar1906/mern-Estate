import { v2 as cloudinary } from "cloudinary"
import fs from "fs"
import dotenv from 'dotenv';
dotenv.config();

// cloudinary.config({
    cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SERCET_KEY
});

const cloudinaryUpload = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })

        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        console.log(`Failed to upload !! ${error}`);
        fs.unlinkSync(localFilePath);
        return null
    }
}

export { cloudinaryUpload }