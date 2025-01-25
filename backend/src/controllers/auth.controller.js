import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/genToken.js";
import cloudinary from "../utils/Cloudinary.js";


export const signUp = asyncHandler( async (req, res)=>{
    const {username, email, password} = req.body;

    if([email, username, password].some((feild)=> feild?.trim()==="")){
        throw new ApiError(400, "All fields are empty!")
    }


    if(password.length< 8){
        throw new ApiError(400, "Password must be greater than 8 characters.")
    }

    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or username already exists")
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await  User.create({
      username,
      email,
      password: hashedPassword,
    });

    const createdUser = await User.findById(newUser._id).select(
        "-password"
    )

    if(createdUser){
        generateToken(newUser._id, res);
        await newUser.save()
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully!")
    ) 



})


export const login = asyncHandler(async (req, res)=>{
    const {email, password} = req.body

    if((!password && !email)){
        throw new ApiError(400, "Username or email is required")

    }

    const user = await User.findOne({email})

    if(!user){
        throw new ApiError(400, "Invalid email, user not found!")

    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if(!isPasswordCorrect){
        throw new ApiError(400, "Invalid password")

    }
    generateToken(user._id, res);

    const loggedInUser = await User.findById(user._id).select("-password")

    return res.status(201).json(
        new ApiResponse(200, loggedInUser, "User loggedin Successfully!")
    )




})


export const logout = (req, res) => {
    try {
      res.cookie("jwt", "", { maxAge: 0 });
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      console.log("Error in logout controller", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

export const updateProfile = asyncHandler(async (req, res)=>{

    const {avatar} = req.body
    const userId = req.user._id

    if(!avatar){
        throw new ApiError(400, "Avatar not found!")
    }

    const uploadResp = await cloudinary.uploader.upload(avatar)
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        {avatar: uploadResp.secure_url},
        {new: true}
    )

    if(!updatedUser){
        throw new ApiError(500, "Failed to updated the profile photo")
    }

    res.status(200).json(new ApiResponse(200, updatedUser, "User profile updated successfully!"))




})

export const checkAuth = (req, res) => {
    try {
      res.status(200).json(new ApiResponse(200, req.user, "User fetched successfully!"));
    } catch (error) {
      console.log("Error in checkAuth controller", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };



export const updateTheme = asyncHandler(async (req, res)=>{
    const {theme} = req.params;

    if(!theme){
        theme = "dark";
    }

    const userId = req.user._id

    if(!userId){
        throw new ApiError(500, "You need to be logged in to change theme")
    }

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        {theme: theme}
    )

    if(!updatedUser){
        throw new ApiError(500, "Failed to update theme")
    }

    res.status(200).json(new ApiResponse(200, updatedUser, "Theme Updated successfully!"))







})