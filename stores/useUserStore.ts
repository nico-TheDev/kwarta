import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserState {
    isLoggedIn: boolean
    setLoggedIn: () => void
    setLoggedOut: () => void
    userToken: string
    setUserToken: (token: string) => void
    refreshToken: string
    setRefreshToken: (token: string) => void
    clearUserToken: () => void
    isTokenExpired: boolean
    setIsTokenExpiredTrue: () => void
    user: any
    setUser: (user: any) => void
    clearUser: () => void
}

const useUserStore = create<UserState>()(
    persist(
        (set, get) => ({
            isLoggedIn: false,
            userToken: '',
            setUserToken: (token: string) => {
                set({ userToken: token })
                // if (token) {
                //     const payload = JSON.parse(atob(token.split('.')[1]))
                //     // const exp = payload.exp * 1000 // ms
                //     const exp = Date.now() + 10 * 60 * 1000 // 10 minutes in ms
                //     const timeout = exp - Date.now()

                //     if (timeout > 0) {
                //         setTimeout(() => {
                //             get().setIsTokenExpiredTrue()
                //         }, timeout)
                //     } else {
                //         get().setIsTokenExpiredTrue()
                //     }
                // }
            },
            refreshToken: '',
            setRefreshToken: (token: string) => {
                set({ refreshToken: token })
            },
            clearUserToken: () => set({ userToken: '', refreshToken: '' }),
            isTokenExpired: false,
            setIsTokenExpiredTrue: () => set({ isTokenExpired: true }),
            user: null,
            setUser: (user: any) => set({ user: user }),
            clearUser: () => set({ user: null }),
            setLoggedIn: () => set({ isLoggedIn: true }),
            setLoggedOut: () => set({ isLoggedIn: false }),
        }),
        {
            name: 'user-storage', // Key in localStorage
        }
    )
)

export default useUserStore
