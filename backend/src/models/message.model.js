import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    recieverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    text:{
        type:String
    },
    image:{
        type: String
    }

}, {timestamps:true})

export const Message = mongoose.model("Message", messageSchema)

