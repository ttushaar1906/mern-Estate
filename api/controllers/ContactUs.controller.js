import ContactUs from "../models/contactUs.model.js";

export const contactUs = async (req,res,next) =>{
    try {
        const contactUs = await ContactUs.create(req.body);
        return res.status(200).json(contactUs);
    } catch (error) {
        next(error)
    }
}