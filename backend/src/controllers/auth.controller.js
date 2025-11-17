// IMPORT
import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import { generateToken } from "../lib/utils.js";
// END - IMPORT

// SIGNUP CONTROLLER
export const signup = async (req, res) => {
    // DESTRUCTRING REQUEST
    const { fullName, email, password } = req.body;
    // END - DESTRUCTRING REQUEST

    
    try {

        // DETAIL VERIFICATION
        if(!fullName || !email || !password){
            return res.status(400).json({
                message : "add everything"
            })
        }
        if (!password || password.length < 6) {
            return res.status(400).json({
                message: "password must be at least 6 characters"
            });
        }
        // END - DETAIL VERIFICATION

        // DETAIL IF ALREADY IS IN DATABASE 
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        // END - DETAIL IF ALREADY IS IN DATABASE 

        // HASHING PASSWORD
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        // END - HASHING PASSWORD

        // SAVE USER IN DATABASE
        const newUser = await User.create({ fullName : fullName, email : email, password : hashPassword });
        if (newUser) {
            generateToken(newUser._id, res)
            await newUser.save();
        }    
        // END - SAVE USER IN DATABASE

        // HAPPY RESPONSE
        return res.status(200).json(
            {
                _id : newUser._id,
                fullName : newUser.fullName,
                email : newUser.email,
                profilePic : newUser.profilePic
            }
        );
        // HAPPY RESPONSE

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};
// END - SIGNUP CONTROLLER

// LOGIN CONTROLLER
export const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({
                message : "invalid credential"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                message : "invalid credentials"
            })
        }

        generateToken(user._id, res);
        res.status(200).json({
            _id : user._id,
            fullName : user.fullName,
            email : user.email,
            profilePic : user.profilePic
        })
    } catch (error) {
        console.log("error in login", error.message);
        res.status(500).json({
            message : "internal server error"
        })
    }
};
// END - LOGIN CONTROLLER

export const logout = (req, res) => {
    res.send("logout route")
}