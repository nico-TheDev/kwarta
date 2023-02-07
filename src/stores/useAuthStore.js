import { create } from 'zustand';


const AuthStore = (get, set) => ({
    authState: {
        user: null,
        isAuthenticated: true,
        isLoading: false,
    },
    login: () => {
        console.log("LOGIN");
        set({
            authState: {
                user: null,
                isAuthenticated: true,
                isLoading: true,
            }
        });
    },
    logout: () => {
        set({
            authState: {
                user: null,
                isAuthenticated: false,
                isLoading: false,
            }
        });
    },
});

export const useAuthStore = create(AuthStore);