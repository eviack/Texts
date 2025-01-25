import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

import { io } from "socket.io-client";

const BASE_URL = "http://localhost:3000"


export const useAuthStore = create((set, get) => ({
    authUser: null,
    onlineUsers: [],
    theme: "dark",
    socket:null,

    isCheckingAuth: true,
    isSignInUp: false,
    isLogging: false,
    isUpdatingProfile: false,


    checkAuth: async () =>{
        try {
            const res = await axiosInstance.get("/auth/check")
            set({authUser: res.data})
            get().connectSocket()

            

            
        } catch (error) {
            console.log("Error in checkAuth", error)
            set({authUser: null})
            
        }finally{
            set({isCheckingAuth: false})
        }

    },

    signup : async (data) =>{
        set({isSignInUp: true})
        try{
            const res = await axiosInstance.post("/auth/signup", data)
            set({authUser: res.data})

            toast.success("Account created successfully")
            get().connectSocket()
            

        }catch(error){
            console.log("Error in signup", error)
            toast.error(error.response.data.message)
        }



    },

    logout: async()=>{
        try{
            await axiosInstance.post("/auth/logout")
            set({authUser: null})
            toast.success("Logout successfully")
            get().disconnectSocket()

        }catch(error){
            console.log("Error in logout", error)
        }
    },

    login: async (data) =>{

        set({isLogging: true})

        try{
            const res = await axiosInstance.post("/auth/login", data)
            set({authUser: res.data})
            toast.success("Logged in successfully")

            get().connectSocket()
        }catch(error){
            console.log("Error in login", error)
            toast.error(error.response.data.message)
        }finally{
            set({isLogging:false})
        }
        
    },

    updateProfile: async(data)=>{
        set({isUpdatingProfile: true})
        try{
            const res = await axiosInstance.put("/auth/update-profile", data)
            set({authUser: res.data})
            toast.success("Profile updated successfully")


        }catch(error){
            
            console.log("Error in updateProfile", error)

        }finally{
            set({isUpdatingProfile:false})
        }

    },

    updateTheme: async(theme)=>{
        try{
            const res = await axiosInstance.put(`/auth/update-theme/${theme}`)
            set({theme: res.data?.theme})
            toast.success(`Theme updated successfully to ${theme}`)
        }catch(error){
            console.log("Error in updateTheme", error)
        }
    },

    getTheme: async()=>{
        try{
            const res = await axiosInstance.get("/auth/check")
            set({theme: res.data?.data?.theme})
            
            
        }catch(error){
            console.log("Error in getTheme", error)
        }
    },


    connectSocket: () =>{
        const {authUser} = get()
        if(!authUser || get().socket?.connected) return;


        const socket = io(BASE_URL, {
            query: {
                userId: authUser?.data._id
            }
        })
        socket.connect()

        set({socket: socket})

        //to get online users, we need to catch the emit from backend

        socket.on("getOnlineUsers", (userIds)=>{
            set({onlineUsers: userIds})

        })




    },
    disconnectSocket: () =>{

        if(get().socket?.connected) get().socket.disconnect()


    }




    
}))