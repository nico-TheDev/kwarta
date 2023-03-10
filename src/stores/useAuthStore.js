import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider, getAdditionalUserInfo } from 'firebase/auth'
import { auth } from '../../firebase.config'

const AuthStore = (set, get) => ({
    authState: {
        user: null,
        isAuthenticated: false,
        isLoading: false
    },
    addUser: async (newUser) => {
        try {
            const createdUserResponse = await createUserWithEmailAndPassword(auth, newUser.email, newUser.password);   //creates user
            await updateProfile(auth.currentUser, {
                displayName: newUser.firstName + " " + newUser.lastName,    //updates displayName
                photoURL: newUser.profile_img,                             //updates photoURL
            });
            await setDoc(doc(db, "users", createdUserResponse.user.uid), {      //sets document of user
                uid: createdUserResponse.user.uid,                              //generated uid
                first_name: newUser.firstName,                  //fetched data from firstName (RegisterScreen) will be stored here
                last_name: newUser.lastName,                    //fetched data from lastName (RegisterScreen) will be stored here
                email: newUser.email,                           //fetched data from email (RegisterScreen) will be stored here
                profile_img: newUser.profile_img                //fetched data from profile_img (RegisterScreen) will be stored here
            });
            set({
                authState: {
                    user: {
                        name: createdUserResponse.user.displayName,
                        firstName: newUser.firstName,
                        lastName: newUser.lastName,
                        email: createdUserResponse.user.email,
                        photo: createdUserResponse.user.photoURL,
                        uid: createdUserResponse.user.uid,
                    },
                    isAuthenticated: true,
                    isLoading: false
                }
            })
        }
        catch (err) {
            console.log(err);
        }
    },
    verifyUser: async (login_user) => {
        try {
            const verifiedResponse = await signInWithEmailAndPassword(auth, login_user.email, login_user.password);     //checks if user is registered, email and password correct
            const verifiedUser = verifiedResponse.user;
            // console.log(verifiedResponse);
            set({
                authState: {
                    user: {
                        name: verifiedUser.displayName,
                        email: verifiedUser.email,
                        photo: verifiedUser.photoURL,
                        uid: verifiedUser.uid,
                    },
                    isAuthenticated: true,
                    isLoading: false
                }
            })
        }
        catch (err) {
            console.log(err.message);
        }
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
