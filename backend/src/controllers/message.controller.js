import asyncHandler from "../utils/asyncHandler.js"
import ApiResponse from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js";
import { Message } from "../models/message.model.js";
import uploadOnCloud from "../utils/Cloudinary.js";
import ApiError from "../utils/ApiError.js";
import cloudinary from "../utils/Cloudinary.js";
import { getRecieverSocketId, io } from "../lib/socket.js";


export const getUsers = asyncHandler(async (req, res)=>{
    const loggedInUser = req.user._id
    const filtered = await User.find({
        _id: {$ne:loggedInUser}
    }).select("-password")

    res.status(200).json(new ApiResponse(200, filtered, "Users fetched sucessfully!"))

})

export const getMessages = asyncHandler(async (req, res)=>{
    const {id:userToChatId} = req.params

    const myId = req.user._id

    const messages  = await Message.find({
        $or: [
            {senderId:myId, recieverId:userToChatId},
            {senderId:userToChatId, recieverId: myId}
        ]
    })

    res.status(200).json(messages);

})

export const sendMessage = asyncHandler(async (req, res) =>{
    const {text, image} = req.body
    const {id: recieverId} = req.params
    const senderId = req.user._id

    let imageUrl;

    if(image){
        const uploadResp = await cloudinary.uploader.upload(image)
        imageUrl = uploadResp.secure_url
    }

    const newmsg = await Message.create({
        senderId, 
        recieverId,
        text,
        image: imageUrl
    })

    if(!newmsg){
        throw new ApiError(400, "Error sending message")
    }

    await newmsg.save()

    //realtime functionality with socket
    const recieverSocketId = getRecieverSocketId(recieverId)
    if(recieverSocketId){
        io.to(recieverSocketId).emit("newMessage", newmsg)
    }


    res.status(201).json(newmsg);

    


})


