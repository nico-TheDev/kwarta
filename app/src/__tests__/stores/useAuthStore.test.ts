import { useAuthStore } from 'stores/useAuthStore';

jest.mock('../../../firebase.config', () => ({
    db: {},
    storage: {},
    auth: {},
}));

jest.mock('firebase/auth', () => ({
    createUserWithEmailAndPassword: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    signInWithPopup: jest.fn(),
    GoogleAuthProvider: class { static credentialFromResult() {} static credentialFromError() {} },
    getAdditionalUserInfo: jest.fn(),
    updateProfile: jest.fn(),
    updateEmail: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
    setDoc: jest.fn(),
    doc: jest.fn(),
    getDoc: jest.fn(),
    updateDoc: jest.fn(),
}));

jest.mock('firebase/storage', () => ({
    deleteObject: jest.fn(),
    ref: jest.fn(),
    uploadBytes: jest.fn(),
    getDownloadURL: jest.fn(),
}));

jest.mock('react-hot-toast', () => ({
    loading: jest.fn(() => 'loader-id'),
    success: jest.fn(),
    error: jest.fn(),
    dismiss: jest.fn(),
}));

const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
        getItem: (key: string) => store[key] ?? null,
        setItem: (key: string, value: string) => { store[key] = value; },
        removeItem: (key: string) => { delete store[key]; },
        clear: () => { store = {}; },
    };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('useAuthStore', () => {
    beforeEach(() => {
        useAuthStore.setState({
            authState: { user: null, isAuthenticated: false, isLoading: false, tourProgress: [] },
            userSurvey: [],
        });
    });

    it('initializes as unauthenticated', () => {
        const { authState } = useAuthStore.getState();
        expect(authState.isAuthenticated).toBe(false);
        expect(authState.user).toBeNull();
    });

    it('logout clears auth state', () => {
        useAuthStore.setState({
            authState: {
                user: { name: 'John', firstName: 'John', lastName: 'Doe', email: 'john@example.com', photo: null, uid: '123', hasAnswered: true },
                isAuthenticated: true,
                isLoading: false,
                tourProgress: [],
            },
        });

        useAuthStore.getState().logout();

        const { authState } = useAuthStore.getState();
        expect(authState.isAuthenticated).toBe(false);
        expect(authState.user).toBeNull();
    });

    it('getTourProgress returns matching tour entry', () => {
        useAuthStore.setState({
            authState: {
                user: null,
                isAuthenticated: false,
                isLoading: false,
                tourProgress: [
                    { page: 'dashboard', isDone: true },
                    { page: 'accounts', isDone: false },
                ],
            },
        });

        const result = useAuthStore.getState().getTourProgress('dashboard');
        expect(result).toEqual({ page: 'dashboard', isDone: true });
    });

    it('getTourProgress returns undefined for unknown page', () => {
        useAuthStore.setState({
            authState: {
                user: null,
                isAuthenticated: false,
                isLoading: false,
                tourProgress: [{ page: 'dashboard', isDone: false }],
            },
        });

        const result = useAuthStore.getState().getTourProgress('unknown-page');
        expect(result).toBeUndefined();
    });

    it('setUserSurvey stores survey data', () => {
        const survey = { priorities: 'savings', financeRule: '50/30/20', salary: '50000' };
        useAuthStore.getState().setUserSurvey(survey);
        expect(useAuthStore.getState().userSurvey).toEqual(survey);
    });
});
