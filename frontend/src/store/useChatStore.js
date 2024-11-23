import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,

  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    try {
      set({ isUsersLoading: true });
      const res = await axiosInstance.get("/message/users");
      const data = res.data;
      set({ users: data });
    } catch (error) {
      console.log("error in getUsers : ", error);
      toast.error("Failed to Get Users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    try {
      set({ isMessagesLoading: true });
      const res = await axiosInstance.get(`/message/${userId}`);
      const data = res.data;
      set({ messages: data });
    } catch (error) {
      console.log("error in getMessages : ", error);
      toast.error("Failed to Load Messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (message) => {
    try {
      const { selectedUser, messages } = get();
      const res = await axiosInstance.post(
        `/message/send/${selectedUser._id}`,
        message
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      console.error("error in sendMessage : ", error);
      toast.error("Failed to Send Message");
    }
  },

  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },

  
}));
