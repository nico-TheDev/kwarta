import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    getAdditionalUserInfo,
    updateProfile,
    updateEmail
} from 'firebase/auth';
import { setDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth } from '../../firebase.config';
import { db, storage } from '../../firebase.config';
import { deleteObject, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import toast from 'react-hot-toast';

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const tourProgress = [
    {
        page: 'dashboard',
        isDone: false
    },
    {
        page: 'accounts',
        isDone: false
    },
    {
        page: 'transactions',
        isDone: false
    },
    {
        page: 'cashflow',
        isDone: false
    },
    {
        page: 'savings',
        isDone: false
    },
    {
        page: 'bonds',
        isDone: false
    },
    {
        page: 'investment',
        isDone: false
    },
    {
        page: 'stocks',
        isDone: false
    },
    {
        page: 'categories',
        isDone: false
    },
    {
        page: 'articles',
        isDone: false
    },
    {
        page: 'profile',
        isDone: false
    },
    {
        page: 'settings',
        isDone: false
    }
];

const AuthStore = (set, get) => ({
    authState: {
        user: null,
        tourProgress,
        isAuthenticated: false,
        isLoading: false
    },
    userSurvey: [],
    setUserSurvey: (data) => set({ userSurvey: data }),
    addUser: async (newUser, currentFile) => {
        const loader = toast.loading('Registering User...');
        try {
            let fileUrl, fileRefName;
            if (currentFile) {
                fileRefName = `users/${uuidv4()}-${currentFile.name}`;
                const imageRef = ref(storage, fileRefName);

                const fileUpload = await uploadBytes(imageRef, currentFile);
                fileUrl = await getDownloadURL(fileUpload.ref);
                console.log('UPLOADED');
            }

            const createdUserResponse = await createUserWithEmailAndPassword(auth, newUser.email, newUser.password); //creates user
            // console.log(newUser);

            await updateProfile(auth.currentUser, {
                displayName: newUser.firstName + ' ' + newUser.lastName, //updates displayName
                photoURL: fileUrl //updates photoURL
            });

            await setDoc(doc(db, 'users', createdUserResponse.user.uid), {
                uid: createdUserResponse.user.uid,
                first_name: newUser.firstName,
                last_name: newUser.lastName,
                email: newUser.email,
                profile_img_ref: fileRefName || '',
                profile_img: fileUrl || '',
                hasAnswered: false,
                tourProgress
            });

            const getUser = auth.currentUser;
            const displayName = getUser.displayName;
            const email = getUser.email;
            const photoURL = getUser.photoURL;
            const uid = getUser.uid;
            const nameArray = displayName.split(' ', 2);

            set({
                authState: {
                    user: {
                        name: displayName,
                        firstName: nameArray[0],
                        lastName: nameArray[1],
                        email: email,
                        photo: photoURL,
                        uid: uid,
                        hasAnswered: false
                    },
                    isAuthenticated: true,
                    isLoading: false,
                    tourProgress
                }
            });

            toast.success('User Successfully Registered.');
            toast.dismiss(loader);
        } catch (err) {
            console.log(err);
            toast.error('Something Went Wrong', err.message);
        }
    },
    verifyUser: async (login_user) => {
        const loader = toast.loading('Logging in ...');
        try {
            const verifiedResponse = await signInWithEmailAndPassword(auth, login_user.email, login_user.password); //checks if user is registered, email and password correct
            const verifiedUser = verifiedResponse.user;
            const nameArray = verifiedUser.displayName.split(' ', 2);

            const userSnap = await getDoc(doc(db, 'users', verifiedUser.uid));
            const userData = userSnap.data();

            set({
                authState: {
                    ...get().authState,
                    user: {
                        name: verifiedUser.displayName,
                        firstName: nameArray[0],
                        lastName: nameArray[1],
                        email: verifiedUser.email,
                        photo: verifiedUser.photoURL,
                        uid: verifiedUser.uid,
                        hasAnswered: userData.hasAnswered
                    },
                    userSurvey: {
                        priorities: userData.priorities || null,
                        isBreadwinner: userData.isBreadwinner || null,
                        salary: userData.salary || null
                    },
                    isAuthenticated: true,
                    isLoading: false,
                    tourProgress: userData.tourProgress || tourProgress
                }
            });

            toast.success('Logged in successfully.');
        } catch (err) {
            if (err.code === 'auth/user-not-found') {
                toast.error('User not found.');
            } else {
                toast.error('Error:', err.code);
            }
            console.log(err.code);
        } finally {
            toast.dismiss(loader);
        }
    },
    updateUser: async (editUser) => {
        try {
            console.log(editUser);
            await updateProfile(auth.currentUser, {
                displayName: editUser.new_displayName
            });
            await updateEmail(auth.currentUser, editUser.new_email);

            const getUser = auth.currentUser;
            const displayName = getUser.displayName;
            const email = getUser.email;
            const photoURL = getUser.photoURL;
            const nameArray = displayName.split(' ', 2);

            set({
                authState: {
                    user: {
                        name: displayName,
                        firstName: nameArray[0],
                        lastName: nameArray[1],
                        email: email,
                        photo: photoURL
                    }
                }
            });
        } catch (err) {
            console.log(err.message);
        }
    },
    updateUserPhoto: async (editUserPhoto, userPhotoName) => {
        try {
            let fileUrl, fileRefName;
            if (editUserPhoto) {
                fileRefName = `users/${uuidv4()}-${userPhotoName}`;
                const imageRef = ref(storage, fileRefName);

                const fileUpload = await uploadBytes(imageRef, editUserPhoto);
                fileUrl = await getDownloadURL(fileUpload.ref);
                console.log('UPLOADED');
            }
            await updateProfile(auth.currentUser, {
                photoURL: fileUrl //updates photoURL
            });

            const getUser = auth.currentUser;
            const displayName = getUser.displayName;
            const email = getUser.email;
            const photoURL = getUser.photoURL;
            const nameArray = displayName.split(' ', 2);

            set({
                authState: {
                    user: {
                        name: displayName,
                        firstName: nameArray[0],
                        lastName: nameArray[1],
                        email: email,
                        photo: photoURL
                    }
                }
            });
        } catch (err) {
            console.log(err.message);
        }
    },
    loginWithGoogle: async () => {
        const loader = toast.loading('Logging in...');
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            // console.log(user)
            const { uid } = user;
            const { name, email, picture, family_name, given_name } = getAdditionalUserInfo(result).profile;

            const docSnap = await getDoc(doc(db, 'users', uid));

            if (!docSnap.exists()) {
                // CREATE NEW USER
                await setDoc(doc(db, 'users', uid), {
                    uid,
                    first_name: given_name,
                    last_name: family_name,
                    email,
                    profile_img_ref: '',
                    profile_img: picture,
                    hasAnswered: false,
                    tourProgress
                });
            }

            // console.log(getAdditionalUserInfo(result))
            const userSnap = await getDoc(doc(db, 'users', uid));
            const userData = userSnap.data();
            set({
                authState: {
                    ...get().authState,
                    user: {
                        name,
                        firstName: given_name,
                        lastName: family_name,
                        email,
                        photo: picture,
                        uid,
                        token,
                        hasAnswered: userData.hasAnswered
                    },
                    isAuthenticated: true,
                    isLoading: false,
                    userSurvey: {
                        priorities: userData.priorities || null,
                        isBreadwinner: userData.isBreadwinner || null,
                        salary: userData.salary || null
                    },
                    tourProgress: userData.tourProgress || tourProgress
                }
            });

            toast.success('Logged in successfully.');
        } catch (error) {
            // const errorCode = error.code;
            // const errorMessage = error.message;
            // // The email of the user's account used.
            // const email = error.customData.email;
            // // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.error(error);
            // console.error(credential);
            toast.error('Error: Something Went Wrong', error.message);
        } finally {
            toast.dismiss(loader);
        }
    },
    logout: () => {
        localStorage.clear();
        set({
            authState: {
                user: null,
                isAuthenticated: false,
                isLoading: false,
                user: null,
                tourProgress
            }
        });
    },
    manageSurvey: async (answers, uid) => {
        const userRef = doc(db, 'users', uid);
        try {
            await updateDoc(userRef, {
                hasAnswered: true,
                priorities: answers.questionTwo,
                salary: answers.questionOne,
                financeRule: answers.questionThree
            });

            set({
                authState: {
                    ...get().authState,
                    user: {
                        ...get().authState.user,
                        hasAnswered: true
                    },
                    userSurvey: {
                        priorities: answers.questionTwo,
                        salary: answers.questionOne,
                        financeRule: answers.questionThree
                    }
                }
            });

            toast.success('Survey completed!');
            // console.log(answers);
        } catch (err) {
            toast.error('Something Went Wrong', err.message);
            console.error(err);
        }
    },
    getUser: async (id) => {
        try {
            const userRef = doc(db, 'users', id);
            const userSnapshot = await getDoc(userRef);

            if (userSnapshot.exists()) {
                return userSnapshot.data();
            } else {
                throw new Error('User does not exist.');
            }
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        }
    },
    updateSurvey: async (answers) => {
        const user = get().authState.user;
        console.log(user?.uid);
        const userRef = doc(db, 'users', user?.uid);
        try {
            await updateDoc(userRef, {
                hasAnswered: true,
                priorities: answers.questionTwo,
                salary: answers.questionOne,
                isBreadwinner: answers.questionThree
            });

            toast.success('Survey answers updated!');
            // console.log(answers);
        } catch (err) {
            toast.error('Something Went Wrong', err.message);
            console.error(err);
        }
    },
    getTourProgress: (tour) => {
        const targetTour = get().authState.tourProgress.find((item) => item.page === tour);
        return targetTour;
    },
    manageTourProgress: async (tour) => {
        const user = get().authState.user;
        const userRef = doc(db, 'users', user?.uid);
        try {
            const editedTour = get().authState.tourProgress.map((item) => {
                if (item.page === tour) {
                    return { page: tour, isDone: true };
                } else {
                    return item;
                }
            });

            await updateDoc(userRef, {
                tourProgress: editedTour
            });

            toast.success(`${capitalizeFirstLetter(tour)} tutorial finished`);

            set({
                authState: {
                    ...get().authState,
                    tourProgress: editedTour
                }
            });

            console.log(editedTour);

            // console.log(answers);
        } catch (err) {
            toast.error('Something Went Wrong', err.message);
            console.error(err);
        }
    }
});

export const useAuthStore = create(
    persist(AuthStore, {
        name: 'auth'
    })
);
