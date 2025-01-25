import app from './app.js'
import dotenv from 'dotenv'
import connectDB from './db/connect.js'
import { server } from './lib/socket.js'
dotenv.config()



connectDB().then(()=>{
    server.listen(process.env.PORT, ()=>{
        console.log(`Server is running at: ${process.env.PORT}`)
    })
}).catch((error)=>{
    console.log(`Connection error: ${error}`)
})


