import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

// AUTH STATE
export const useAuthStore = create((set)=> ({

    // AUTH STATE VARIABLES
    authUser : null,
    isSigningUp : false,
    isLoggingIng : false,
    isUpdatingProfile : false,
    isCheckingAuth : true,
    // END - AUTH STATE VARIABLES

    // AUTH FUNCTIONS
    checkAuth : async () => {
        try {
            const res = await axiosInstance.get("http://localhost:5001/app/auth/check");
            set(
                {
                    authUser : res.data
                }
            );
        } catch (error) {
            set({
                authUser : null
            })
        } finally ({
            isCheckingAuth : false
        })
    }
    // END - AUTH FUNCTIONS

}));
// END - AUTH STATE
