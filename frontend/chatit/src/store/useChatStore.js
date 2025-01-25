import { create } from "zustand";

import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";


export const useChatStore = create((set, get) => ({
    messages: [],

    users: [],

    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async ()=>{
        set({isUsersLoading: true});

        try{
            const res = await axiosInstance.get("/message/users");
            set({users: res.data});
        }catch(err){
            toast.error("Failed to fetch users");
        }finally{
            set({isUsersLoading: false});
        }
    },

    getMessages: async (userId)=>{

        set({isMessagesLoading: true});

        try{
            const res = await axiosInstance.get(`/message/${userId}`);
            set({messages: res.data});
        }catch(err){
            toast.error("Failed to fetch messages");
        }finally{
            set({isMessagesLoading: false}); 
        }

    },

    setSelectedUser: (selectedUser)=>{
        set({selectedUser: selectedUser})

    },

    sendMessage: async (msg) => {
        const { selectedUser, messages } = get();
    
        if (!selectedUser) {
            toast.error("No user selected");
            return;
        }
    
        try {
            const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, msg);
    
            // Append the new message to the state
            set({ messages: [...messages, res.data] });
        } catch (error) {
            console.error("Failed to send message:", error);
            
        }
    },

    subscribeMsg: () =>{
        const {selectedUser} = get()
        if(!selectedUser){
           return;
        }

        const socket = useAuthStore.getState().socket;

        socket.on("newMessage", (msg) => {
            if(msg.senderId !== selectedUser._id) return;
            set({
                messages: [...get().messages, msg],
            })
           
          });
    },

    unsubscribeMsg: () =>{
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    }
    

}))