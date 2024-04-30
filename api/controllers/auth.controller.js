import User from "../models/user.module.js";
import bcryptjs from 'bcryptjs'

export const signUp = async (req, res ,next) => {
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
