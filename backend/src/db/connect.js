import mongoose from 'mongoose'
import { DB_NAME } from '../constants.js'


const connectDB = async ()=>{

    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`/n mongoDB connected, DBHOST: ${connection.connection.host}`)
        
    } catch (error) {
        console.log("MONGODB ERROR", error)
        process.exit(1)
    }
}

export default connectDB