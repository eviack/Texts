import {v2 as cloudinary} from 'cloudinary'
import fs, { unlink } from 'fs'

import { config } from 'dotenv'

config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloud = async (localPath)=>{
    try {
        if(!localPath) return null

        const response = await cloudinary.uploader.upload(localPath, {
            resource_type: 'auto'
        })

        fs.unlinkSync(localPath)
        return response
        
    } catch (error) {
        fs.unlinkSync(localPath) //remove locally saved temp file on upload failed
    } 
}

export default cloudinary;