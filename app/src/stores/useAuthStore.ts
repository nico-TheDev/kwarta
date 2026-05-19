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
    updateEmail,
} from 'firebase/auth';
import { setDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db, storage } from '../../firebase.config';
import { deleteObject, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import toast from 'react-hot-toast';

function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export interface TourProgress {
    page: string;
    isDone: boolean;
}

export interface User {
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    photo: string | null;
    uid: string;
    token?: string;
    hasAnswered: boolean;
}

export interface UserSurvey {
    priorities: string | null;
    financeRule: string | null;
    salary: string | null;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    tourProgress: TourProgress[];
}

interface NewUser {
    firstName: string;
    lastName: string;
    displayName: string;
    email: string;
    password: string;
}

interface SurveyAnswers {
    questionOne: string;
    questionTwo: string;
    questionThree: string;
}

interface AuthStore {
    authState: AuthState;
    userSurvey: UserSurvey | [];
    setUserSurvey: (data: UserSurvey) => void;
    addUser: (newUser: NewUser, currentFile?: File) => Promise<void>;
    verifyUser: (login_user: { email: string; password: string }) => Promise<void>;
    updateUser: (editUser: { new_displayName: string; new_email: string }) => Promise<void>;
    updateUserPhoto: (editUserPhoto: File, userPhotoName: string) => Promise<void>;
    loginWithGoogle: () => Promise<void>;
    logout: () => void;
    manageSurvey: (answers: SurveyAnswers, uid: string) => Promise<void>;
    getUser: (id: string) => Promise<Record<string, unknown> | undefined>;
    updateSurvey: (answers: SurveyAnswers) => Promise<void>;
    getTourProgress: (tour: string) => TourProgress | undefined;
    manageTourProgress: (tour: string) => Promise<void>;
}

const defaultTourProgress: TourProgress[] = [
    { page: 'dashboard', isDone: false },
    { page: 'accounts', isDone: false },
    { page: 'transactions', isDone: false },
    { page: 'cashflow', isDone: false },
    { page: 'savings', isDone: false },
    { page: 'bonds', isDone: false },
    { page: 'investment', isDone: false },
    { page: 'stocks', isDone: false },
    { page: 'categories', isDone: false },
    { page: 'articles', isDone: false },
    { page: 'profile', isDone: false },
    { page: 'settings', isDone: false },
];

const AuthStore = (set: any, get: any): AuthStore => ({
    authState: {
        user: null,
        tourProgress: defaultTourProgress,
        isAuthenticated: false,
        isLoading: false,
    },
    userSurvey: [],
    setUserSurvey: (data) => set({ userSurvey: data }),
    addUser: async (newUser, currentFile) => {
        const loader = toast.loading('Registering User...');
        try {
            let fileUrl: string | undefined, fileRefName: string | undefined;
            if (currentFile) {
                fileRefName = `users/${uuidv4()}-${currentFile.name}`;
                const imageRef = ref(storage, fileRefName);
                const fileUpload = await uploadBytes(imageRef, currentFile);
                fileUrl = await getDownloadURL(fileUpload.ref);
            }

            const createdUserResponse = await createUserWithEmailAndPassword(auth, newUser.email, newUser.password);
            await updateProfile(auth.currentUser!, {
                displayName: `${newUser.firstName} ${newUser.lastName}`,
                photoURL: fileUrl,
            });

            await setDoc(doc(db, 'users', createdUserResponse.user.uid), {
                uid: createdUserResponse.user.uid,
                first_name: newUser.firstName,
                last_name: newUser.lastName,
                email: newUser.email,
                profile_img_ref: fileRefName || '',
                profile_img: fileUrl || '',
                hasAnswered: false,
                tourProgress: defaultTourProgress,
            });

            const getUser = auth.currentUser!;
            const displayName = getUser.displayName!;
            const nameArray = displayName.split(' ', 2);

            set({
                authState: {
                    user: {
                        name: displayName,
                        firstName: nameArray[0],
                        lastName: nameArray[1],
                        email: getUser.email,
                        photo: getUser.photoURL,
                        uid: getUser.uid,
                        hasAnswered: false,
                    },
                    isAuthenticated: true,
                    isLoading: false,
                    tourProgress: defaultTourProgress,
                },
            });

            toast.success('User Successfully Registered.');
            toast.dismiss(loader);
        } catch (err: any) {
            toast.error('Something Went Wrong', err.message);
        }
    },
    verifyUser: async (login_user) => {
        const loader = toast.loading('Logging in ...');
        try {
            const verifiedResponse = await signInWithEmailAndPassword(auth, login_user.email, login_user.password);
            const verifiedUser = verifiedResponse.user;
            const nameArray = verifiedUser.displayName!.split(' ', 2);
            const userSnap = await getDoc(doc(db, 'users', verifiedUser.uid));
            const userData = userSnap.data()!;

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
                        hasAnswered: userData.hasAnswered,
                    },
                    userSurvey: {
                        priorities: userData.priorities || null,
                        financeRule: userData.financeRule || null,
                        salary: userData.salary || null,
                    },
                    isAuthenticated: true,
                    isLoading: false,
                    tourProgress: userData.tourProgress || defaultTourProgress,
                },
            });

            toast.success('Logged in successfully.');
        } catch (err: any) {
            if (err.code === 'auth/user-not-found') {
                toast.error('User not found.');
            } else {
                toast.error('Error:', err.code);
            }
        } finally {
            toast.dismiss(loader);
        }
    },
    updateUser: async (editUser) => {
        try {
            await updateProfile(auth.currentUser!, { displayName: editUser.new_displayName });
            await updateEmail(auth.currentUser!, editUser.new_email);

            const nameArray = editUser.new_displayName.split(' ', 2);
            const userRef = doc(db, 'users', auth.currentUser!.uid);
            await updateDoc(userRef, {
                first_name: nameArray[0],
                last_name: nameArray[1],
                email: editUser.new_email,
            });

            set({
                authState: {
                    ...get().authState,
                    user: {
                        ...get().authState.user,
                        name: editUser.new_displayName,
                        firstName: nameArray[0],
                        lastName: nameArray[1],
                        email: editUser.new_email,
                    },
                },
            });

            toast.success('Profile Updated.');
        } catch (err: any) {
            console.log(err.message);
        }
    },
    updateUserPhoto: async (editUserPhoto, userPhotoName) => {
        try {
            const fileRefName = `users/${uuidv4()}-${userPhotoName}`;
            const imageRef = ref(storage, fileRefName);
            const fileUpload = await uploadBytes(imageRef, editUserPhoto);
            const fileUrl = await getDownloadURL(fileUpload.ref);

            await updateProfile(auth.currentUser!, { photoURL: fileUrl });

            const getUser = auth.currentUser!;
            const displayName = getUser.displayName!;
            const nameArray = displayName.split(' ', 2);

            set({
                authState: {
                    ...get().authState,
                    user: {
                        name: displayName,
                        firstName: nameArray[0],
                        lastName: nameArray[1],
                        email: getUser.email,
                        photo: fileUrl,
                    },
                },
            });
        } catch (err: any) {
            console.log(err.message);
        }
    },
    loginWithGoogle: async () => {
        const loader = toast.loading('Logging in...');
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            const user = result.user;
            const { uid } = user;
            const profile = getAdditionalUserInfo(result)?.profile as any;
            const { name, email, picture, family_name, given_name } = profile;

            const docSnap = await getDoc(doc(db, 'users', uid));
            if (!docSnap.exists()) {
                await setDoc(doc(db, 'users', uid), {
                    uid,
                    first_name: given_name,
                    last_name: family_name,
                    email,
                    profile_img_ref: '',
                    profile_img: picture,
                    hasAnswered: false,
                    tourProgress: defaultTourProgress,
                });
            }

            const userSnap = await getDoc(doc(db, 'users', uid));
            const userData = userSnap.data()!;

            set({
                authState: {
                    ...get().authState,
                    user: { name, firstName: given_name, lastName: family_name, email, photo: picture, uid, token, hasAnswered: userData.hasAnswered },
                    isAuthenticated: true,
                    isLoading: false,
                    userSurvey: {
                        priorities: userData.priorities || null,
                        financeRule: userData.financeRule || null,
                        salary: userData.salary || null,
                    },
                    tourProgress: userData.tourProgress || defaultTourProgress,
                },
            });

            toast.success('Logged in successfully.');
        } catch (error: any) {
            GoogleAuthProvider.credentialFromError(error);
            toast.error('Error: Something Went Wrong');
        } finally {
            toast.dismiss(loader);
        }
    },
    logout: () => {
        localStorage.clear();
        set({ authState: { user: null, isAuthenticated: false, isLoading: false, tourProgress: defaultTourProgress } });
    },
    manageSurvey: async (answers, uid) => {
        const userRef = doc(db, 'users', uid);
        try {
            await updateDoc(userRef, {
                hasAnswered: true,
                priorities: answers.questionTwo,
                salary: answers.questionOne,
                financeRule: answers.questionThree,
            });
            set({
                authState: {
                    ...get().authState,
                    user: { ...get().authState.user, hasAnswered: true },
                    userSurvey: { priorities: answers.questionTwo, salary: answers.questionOne, financeRule: answers.questionThree },
                },
            });
            toast.success('Survey completed!');
        } catch (err: any) {
            toast.error('Something Went Wrong');
        }
    },
    getUser: async (id) => {
        try {
            const userRef = doc(db, 'users', id);
            const userSnapshot = await getDoc(userRef);
            if (userSnapshot.exists()) return userSnapshot.data();
            throw new Error('User does not exist.');
        } catch (err: any) {
            toast.error(err.message);
        }
    },
    updateSurvey: async (answers) => {
        const user = get().authState.user as User;
        const userRef = doc(db, 'users', user?.uid);
        try {
            await updateDoc(userRef, {
                hasAnswered: true,
                priorities: answers.questionTwo,
                salary: answers.questionOne,
                financeRule: answers.questionThree,
            });
            set({
                authState: {
                    ...get().authState,
                    user: { ...get().authState.user, hasAnswered: true },
                    userSurvey: { priorities: answers.questionTwo, salary: answers.questionOne, financeRule: answers.questionThree },
                },
            });
            toast.success('Survey answers updated!');
        } catch (err: any) {
            toast.error('Something Went Wrong');
        }
    },
    getTourProgress: (tour) => {
        return get().authState.tourProgress.find((item: TourProgress) => item.page === tour);
    },
    manageTourProgress: async (tour) => {
        const user = get().authState.user as User;
        const userRef = doc(db, 'users', user?.uid);
        try {
            const editedTour = get().authState.tourProgress.map((item: TourProgress) =>
                item.page === tour ? { page: tour, isDone: true } : item
            );
            await updateDoc(userRef, { tourProgress: editedTour });
            toast.success(`${capitalizeFirstLetter(tour)} tutorial finished`, { id: 'tour' });
            set({ authState: { ...get().authState, tourProgress: editedTour } });
        } catch (err: any) {
            toast.error('Something Went Wrong', { id: 'tour' });
        }
    },
});

export const useAuthStore = create(persist(AuthStore, { name: 'auth' }));
