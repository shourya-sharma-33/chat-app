// IMPORT
import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";
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
    // DESTRUCTURE REQUEST
    const {email, password} = req.body;
    // END - DESTRUCTURE REQUEST

    try {
        // FIND USER
        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({
                message : "invalid credential"
            });
        }
        // END - FIND USER

        // VALIDATE PASSWORD
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                message : "invalid credentials"
            })
        }
        // END - VALIDATE PASSWORD

        // GENERATE TOKEN AND RESPONCE
        generateToken(user._id, res);
        res.status(200).json({
            _id : user._id,
            fullName : user.fullName,
            email : user.email,
            profilePic : user.profilePic
        })
        // END - GENERATE TOKEN AND RESPONCE

    } catch (error) {
        console.log("error in login", error.message);
        res.status(500).json({
            message : "internal server error"
        })
    }
};
// END - LOGIN CONTROLLER

// LOGOUT CONTROLLER
export const logout = (req, res) => {
    try {
        // CLEAR COOKIE
        res.cookie("jwt", "", {
            maxAge : 0
        });
        res.status(200).json({message : "logged out successfully"})
        // END - CLEAR COOKIE

    } catch (error) {
        console.log("error in logout controller", error.message);
        res.status(500).json({
            message : "internal server error"
        })
    }
}
// END - LOGOUT CONTROLLER

// UPDATE CONTROLLER
export const updateProfile = async (req, res) => {
    try {
        // DESTRUCIRE PIC URL AND USERID FROM REQ
        const {profilePic} = req.body;
        const userId = req.user._id;

        if (!profilePic) {
            return res.status(400).json({
                message: "profile pic require"
            })
        }

        // END -DESTRUCIRE PIC URL AND USERID FROM REQ

        // UPLOAD PFP AND UPDATE USER
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {profilePic : uploadResponse.secure_url},
            {new : true}
        )
        // END - UPLOAD PFP AND UPDATE USER

        res.status(200).json(updatedUser);
    } catch (error){
        res.status(500).json({message : "internal server error"})
    }
}
// END - UPDATE CONTROLLER

// CHECK AUTH CONTROLLER
export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        res.status(500).json({
            message: "internal server errro"
        })
    }
}
// END - CHECK AUTH CONTROLLER
