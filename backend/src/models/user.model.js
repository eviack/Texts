import mongoose, {Schema} from "mongoose";


const userSchema = new Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,  
        lowercase: true,
        trim: true,
        index: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },
      avatar: {
        type: String, //cloudinary
      },
      
      password: {
        type: String,
        required: [true, "Password is required!"],
      },
      theme:{
        type: String,
        default: "dark"
      }
    },
    { timestamps: true },
  );

  
  
export const User = mongoose.model("User", userSchema);