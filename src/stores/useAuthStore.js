import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, getAdditionalUserInfo, 
    updateProfile, updateEmail, } from 'firebase/auth'
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

            await updateProfile(auth.currentUser, {
                displayName: newUser.firstName + " " + newUser.lastName,    //updates displayName
                photoURL: fileUrl,                             //updates photoURL
            });

            await setDoc(doc(db, "users", createdUserResponse.user.uid), {      //sets document of user
                uid: createdUserResponse.user.uid,                              //generated uid
                first_name: newUser.firstName,                  //fetched data from firstName (RegisterScreen) will be stored here
                last_name: newUser.lastName,                    //fetched data from lastName (RegisterScreen) will be stored here
                email: newUser.email,                           //fetched data from email (RegisterScreen) will be stored here
                profile_img_ref: fileRefName || '',       //fetched data from profile_img (RegisterScreen) will be stored here
                profile_img: fileUrl || ''            //fetched data from profile_img (RegisterScreen) will be stored here
            });

            set({
                authState: {
                    user: {
                        name: newUser.displayName,
                        firstName: newUser.firstName,
                        lastName: newUser.lastName,
                        email: newUser.email,
                        photo: fileUrl,
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
                        firstName: verifiedUser.displayName.split(" ", 0),
                        lastName: verifiedUser.displayName.split(" ", 1),
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
    updateUser: async(editUser) => {
        try{
            console.log(editUser)
            await updateProfile(auth.currentUser, {
                displayName: editUser.new_displayName,    //updates displayName
            });
            await updateEmail(auth.currentUser, editUser.new_email);     //updates email
            set({
                authState: {
                    user: {
                        name: editUser.displayName,
                        firstName: editUser.firstName,
                        lastName: editUser.lastName,
                        email: editUser.email,
                    },
                }
            })
        }
        catch (err) {
            console.log(err.message);
        }
    },
    updateUserPhoto: async(editUserPhoto, userPhotoName) => {
        try{
            let fileUrl, fileRefName;
            if (editUserPhoto) {
                fileRefName = `users/${uuidv4()}-${userPhotoName}`;
                const imageRef = ref(storage, fileRefName);

                const fileUpload = await uploadBytes(imageRef, editUserPhoto);
                fileUrl = await getDownloadURL(fileUpload.ref);
                console.log('UPLOADED');
            }
            await updateProfile(auth.currentUser, {
                photoURL: fileUrl,                             //updates photoURL
            });
            set({
                authState: {
                    user: {
                        photo: fileUrl,
                    },
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
