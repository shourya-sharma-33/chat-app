// IMPORTS
import jwt, { decode } from "jsonwebtoken";
import User from "../models/user.model";
// END - IMPORTS

// AUTHRIZATION
export const protectRoute =  async (req, res, next) => {
    try {
        // DESTRUCTURE JWT TOKEN FROM REQUEST
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({
                message : "unauthorized - no token provided"
            })
        }
        // END - DESTRUCTURE JWT TOKEN FROM REQUEST

        // VERIFY TOKEN
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(!decoded) {
            return res.status(401).json({
                message : "unauthorized - invalid token"
            })
        }
        // END - VERIFY TOKEN

        // FIND USER
        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(404).json({
                message : "user not found"
            })
        }
        // END - FIND USER

        // SEND USER IN REQUEST
        req.user = user
        next()
        // END - SEND USER IN REQUEST

    } catch (error) {
        res.status(500).json({
            message : "internal server error"
        })
    }
}
// END - AUTHRIZATION
