import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider, getAdditionalUserInfo } from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore';
import { auth } from '../../firebase.config'
import { db, storage } from '../../firebase.config';
import { deleteObject, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import toast from 'react-hot-toast';

const AuthStore = (set, get) => ({
    authState: {
        user: null,
        isAuthenticated: false,
        isLoading: false
    },
    addUser: async (newUser, currentFile) => {
        try {
            let fileUrl, fileRefName;
            if (currentFile) {
                fileRefName = `users/${uuidv4()}-${currentFile.name}`;
                const imageRef = ref(storage, fileRefName);

                const fileUpload = await uploadBytes(imageRef, currentFile);
                fileUrl = await getDownloadURL(fileUpload.ref);
                console.log('UPLOADED');
            }

            const createdUserResponse = await createUserWithEmailAndPassword(auth, newUser.email, newUser.password);   //creates user
            console.log(newUser);
            set({
                authState: {
                    user: {
                        name: newUser.displayName,
                        firstName: newUser.firstName,
                        lastName: newUser.lastName,
                        email: newUser.email,
                        photo: newUser.photoURL,
                        uid: newUser.uid,
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
            set({
                authState: {
                    user: {
                        name: verifiedUser.displayName,
                        firstName: verifiedUser.displayName.split("", 0),
                        lastName: verifiedUser.displayName.split("", 1),
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
