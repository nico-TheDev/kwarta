import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { signInWithPopup, GoogleAuthProvider, getAdditionalUserInfo } from 'firebase/auth'
import { auth } from '../../firebase.config'

const AuthStore = (set, get) => ({
    authState: {
        user: null,
        isAuthenticated: false,
        isLoading: false
    },
    loginWithGoogle: async () => {
        try {
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)
            const credential = GoogleAuthProvider.credentialFromResult(result)
            const token = credential.accessToken
            const user = result.user
            // console.log(user)
            const { uid } = user
            const { name, email, picture, family_name, given_name } = getAdditionalUserInfo(result).profile
            // console.log(getAdditionalUserInfo(result))
            set({
                authState: {
                    user: {
                        name,
                        firstName: given_name,
                        lastName: family_name,
                        email,
                        photo: picture,
                        uid,
                        token
                    },
                    isAuthenticated: true,
                    isLoading: false
                }
            })
        } catch (error) {
            const errorCode = error.code
            const errorMessage = error.message
            // The email of the user's account used.
            const email = error.customData.email
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error)
            console.log(error.message)
        }
    },
    logout: () => {
        set({
            authState: {
                user: null,
                isAuthenticated: false,
                isLoading: false
            }
        })
    }
})

export const useAuthStore = create(
    persist(AuthStore, {
        name: 'auth'
    })
)
