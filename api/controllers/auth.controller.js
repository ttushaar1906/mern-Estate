import User from "../models/user.module.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'

export const signUp = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10)  //10 is a salt number used for hashing password
    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save()
        res.status(201).json('User Created successfully')
        console.log(req.body); // Log the request body to check if data is being received
    }
    catch (error) {
        // res.status(500).json(error.message)
        next(error);
    }
};

export const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const userValid = await User.findOne({ email });
        if (!userValid) return next(errorHandler(404, 'User not found!'))
        const validPassword = bcryptjs.compareSync(password, userValid.password);
        if (!validPassword) return next(errorHandler(404, "Incorrect Credentials"))
        const token = jwt.sign({ id: userValid._id }, process.env.JWT_SECRET)
        const {password:pass, ...rest} = userValid._doc;
        res.cookie('access_token', token, { http: true }).status(200).json(rest)
    }
    catch (error) {
        next(error);
    }
}