import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'

import { User } from "../models/user.model.js";


export const verifyJWT = asyncHandler(async(req, res, next)=>{
    try {
        const token = req.cookies?.jwt
    
        if(!token){
            throw new ApiError(401, "Unauthorized request")
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decoded.userId).select("-password")
    
    
        if(!user){
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user = user
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }


})

export default verifyJWT