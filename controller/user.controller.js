import User from "../model/user.model.js";
import crypto from 'crypto';
import mailService from "../utils/mailService.js";
import hashPassword from "../utils/hashPassword.js";

const registerUser = async (req, res) => {
    try {
        // get data from req body
        const { name, email, password } = req.body;
        // validate the data
        if ( !name || !email || !password ) {
            return res.status(400).send({
                message: "All fields are required",
            })
        }
        // check if user already exists
        const exisitingUser = await User.findOne({
            email: email
        });
        if(exisitingUser) {
            return res.status(400).send({
                message: "User already exists",
            })
        }
        // hash the password
        const hashedPassword = hashPassword(password);
        // create a user in database
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });
        if(!newUser) {
            return res.status(500).send({
                message: "Unable to create user, please try again later",
            })
        }
        // create a verification token
        // bs ek random string generate krna h, or uske krne ka crypto ek tarika h
        const verificationToken = crypto.randomBytes(32).toString('hex');
        // save token in database
        newUser.verificationToken = verificationToken;
        await newUser.save();
        // send token as email to user
        const info = await mailService(email, verificationToken);
        if(!info) {
            return res.status(500).send({
                message: "Unable to send verification email, please try again later",
            })
        }
        // send success response to user
        return res.status(200).send({
            message: "User registered successfully, please check your email to verify your account",
            user: newUser,
        })
    } catch (error) {
        console.log("register user error: ", error);
        return res.status(500).send({
            message: "Internal server error",
        })
    }
}

export { registerUser };