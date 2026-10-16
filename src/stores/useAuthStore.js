import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';

import localDb from 'lib/localDb';
import { DEMO_USER } from 'constants/constant';

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

// BUILD THE SESSION USER FROM THE USERS DOC (REPLACES auth.currentUser)
const buildAuthUser = (userData) => ({
    name: userData.first_name + ' ' + userData.last_name,
    firstName: userData.first_name,
    lastName: userData.last_name,
    email: userData.email,
    photo: userData.profile_img,
    uid: userData.uid,
    hasAnswered: userData.hasAnswered,
    sampleDataPrompted: userData.sample_data_prompted || false
});

// EVERY SIGN IN METHOD LOGS IN THE DEMO USER, CREATING ITS USERS DOC ON THE FIRST VISIT
const signInDemoUser = async (set, get) => {
    const userData = await localDb.batch((tx) => {
        const existingUser = tx.get('users', DEMO_USER.uid);
        if (existingUser) return existingUser;

        return tx.set('users', DEMO_USER.uid, {
            ...DEMO_USER,
            profile_img_ref: '',
            profile_img: '',
            hasAnswered: false,
            tourProgress
        });
    });

    set({
        authState: {
            ...get().authState,
            user: buildAuthUser(userData),
            userSurvey: {
                priorities: userData.priorities || null,
                financeRule: userData.financeRule || null,
                salary: userData.salary || null
            },
            isAuthenticated: true,
            isLoading: false,
            tourProgress: userData.tourProgress || tourProgress
        }
    });
};

const AuthStore = (set, get) => ({
    authState: {
        user: null,
        tourProgress,
        isAuthenticated: false,
        isLoading: false
    },
    userSurvey: [],
    setUserSurvey: (data) => set({ userSurvey: data }),
    // THE USERS DOC WRITE HAPPENS IN useSampleDataStore; THIS KEEPS THE SESSION USER IN STEP
    setSampleDataPrompted: () =>
        set({
            authState: {
                ...get().authState,
                user: get().authState.user && { ...get().authState.user, sampleDataPrompted: true }
            }
        }),
    // THE PASSWORD AND PHOTO ARE IGNORED: NO CREDENTIALS ARE STORED AND PHOTOS WAIT FOR FEATURE 31
    addUser: async (newUser, currentFile) => {
        const loader = toast.loading('Registering User...');
        try {
            await signInDemoUser(set, get);

            toast.success('User Successfully Registered.');
        } catch (err) {
            console.log(err);
            toast.error('Something Went Wrong', err.message);
        } finally {
            toast.dismiss(loader);
        }
    },
    verifyUser: async (login_user) => {
        const loader = toast.loading('Logging in ...');
        try {
            await signInDemoUser(set, get);

            toast.success('Logged in successfully.');
        } catch (err) {
            toast.error(err.message);
            console.log(err);
        } finally {
            toast.dismiss(loader);
        }
    },
    updateUser: async function (editUser) {
        try {
            console.log(editUser);
            const user = get().authState.user;
            const displayName = editUser.new_displayName;
            const nameArray = displayName.split(' ', 2);

            await localDb.update('users', user?.uid, {
                first_name: nameArray[0],
                last_name: nameArray[1],
                email: editUser.new_email
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
                        photo: get().authState.user.photo
                    }
                }
            });

            toast.success('Profile Updated.');
        } catch (err) {
            console.log(err.message);
        }
    },
    // PHOTO FILES ARE SKIPPED UNTIL FEATURE 31, SO THE PROFILE KEEPS ITS CURRENT profile_img
    updateUserPhoto: async (editUserPhoto, userPhotoName) => {},
    loginWithGoogle: async () => {
        const loader = toast.loading('Logging in...');
        try {
            await signInDemoUser(set, get);

            toast.success('Logged in successfully.');
        } catch (error) {
            console.error(error);
            toast.error('Error: Something Went Wrong', error.message);
        } finally {
            toast.dismiss(loader);
        }
    },
    // ONLY THE SESSION KEY GOES, SO EVERY RECORD IS STILL THERE ON THE NEXT SIGN IN
    logout: () => {
        try {
            localStorage.removeItem('auth');
        } catch (err) {
            console.warn(err);
        }
        set({
            authState: {
                user: null,
                isAuthenticated: false,
                isLoading: false,
                tourProgress
            }
        });
    },
    manageSurvey: async (answers, uid, successMessage = 'Survey completed!') => {
        try {
            await localDb.update('users', uid, {
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

            toast.success(successMessage);
            // console.log(answers);
        } catch (err) {
            toast.error('Something Went Wrong', err.message);
            console.error(err);
        }
    },
    getUser: async (id) => {
        try {
            const userData = await localDb.get('users', id);

            if (userData) {
                return userData;
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
        try {
            await localDb.update('users', user?.uid, {
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
        try {
            const editedTour = get().authState.tourProgress.map((item) => {
                if (item.page === tour) {
                    return { page: tour, isDone: true };
                } else {
                    return item;
                }
            });

            await localDb.update('users', user?.uid, {
                tourProgress: editedTour
            });

            toast.success(`${capitalizeFirstLetter(tour)} tutorial finished`, { id: 'tour' });

            set({
                authState: {
                    ...get().authState,
                    tourProgress: editedTour
                }
            });

            console.log(editedTour);

            // console.log(answers);
        } catch (err) {
            toast.error('Something Went Wrong', err.message, { id: 'tour' });
            console.error(err);
        }
    }
});

export const useAuthStore = create(
    persist(AuthStore, {
        name: 'auth',
        // A SESSION LEFT OVER FROM THE FIREBASE APP BELONGS TO ANOTHER USER, SO TREAT IT AS LOGGED OUT
        onRehydrateStorage: () => (state) => {
            const uid = state?.authState?.user?.uid;
            if (uid && uid !== DEMO_USER.uid) {
                state.logout();
            }
        }
    })
);
