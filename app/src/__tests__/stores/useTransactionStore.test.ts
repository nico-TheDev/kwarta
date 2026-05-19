import { useTransactionStore } from 'stores/useTransactionStore';

jest.mock('../../../firebase.config', () => ({
    db: {},
    storage: {},
}));

jest.mock('firebase/firestore', () => ({
    addDoc: jest.fn(),
    collection: jest.fn(),
    serverTimestamp: jest.fn(),
    deleteDoc: jest.fn(),
    doc: jest.fn(),
    updateDoc: jest.fn(),
    getDoc: jest.fn(),
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

const mockTransactions = [
    {
        id: '1', amount: 100, type: 'expense' as const,
        category: { id: 'c1', category_name: 'Food', category_type: 'expense', category_icon: 'FOOD', category_color: '#ff0000', expense_type: 'needs' },
        targetAccount: { id: 'a1', account_name: 'Wallet' },
        description: '', photoRef: '', photoUrl: '', timestamp: new Date(), user_id: 'u1',
    },
    {
        id: '2', amount: 50, type: 'expense' as const,
        category: { id: 'c1', category_name: 'Food', category_type: 'expense', category_icon: 'FOOD', category_color: '#ff0000', expense_type: 'needs' },
        targetAccount: { id: 'a1', account_name: 'Wallet' },
        description: '', photoRef: '', photoUrl: '', timestamp: new Date(), user_id: 'u1',
    },
    {
        id: '3', amount: 200, type: 'income' as const,
        category: { id: 'c2', category_name: 'Salary', category_type: 'income', category_icon: 'FULLTIME_JOB', category_color: '#00ff00' },
        targetAccount: { id: 'a1', account_name: 'Wallet' },
        description: '', photoRef: '', photoUrl: '', timestamp: new Date(), user_id: 'u1',
    },
    {
        id: '4', amount: 80, type: 'savings' as const,
        category: { id: 'c3', category_name: 'Emergency Fund', category_type: 'savings', category_icon: 'SAVINGS', category_color: '#0000ff' },
        targetAccount: { id: 'a1', account_name: 'Wallet' },
        description: '', photoRef: '', photoUrl: '', timestamp: new Date(), user_id: 'u1',
    },
];

describe('useTransactionStore', () => {
    beforeEach(() => {
        useTransactionStore.setState({ transactions: [], isEmpty: false });
    });

    it('initializes with empty transactions', () => {
        const { transactions, isEmpty } = useTransactionStore.getState();
        expect(transactions).toEqual([]);
        expect(isEmpty).toBe(false);
    });

    it('setTransactions populates the store', () => {
        useTransactionStore.getState().setTransactions(mockTransactions);
        expect(useTransactionStore.getState().transactions).toHaveLength(4);
        expect(useTransactionStore.getState().isEmpty).toBe(false);
    });

    it('setTransactions with isEmpty=true sets isEmpty flag', () => {
        useTransactionStore.getState().setTransactions([], true);
        expect(useTransactionStore.getState().isEmpty).toBe(true);
    });

    it('resetTransactions clears the list', () => {
        useTransactionStore.getState().setTransactions(mockTransactions);
        useTransactionStore.getState().resetTransactions();
        expect(useTransactionStore.getState().transactions).toEqual([]);
    });

    it('getExpenseList aggregates expenses by category', () => {
        useTransactionStore.getState().setTransactions(mockTransactions);
        const expenseList = useTransactionStore.getState().getExpenseList('u1');
        expect(expenseList).toHaveLength(1);
        expect(expenseList[0].category_name).toBe('Food');
        expect(expenseList[0].amount).toBe(150);
    });

    it('getIncomeList aggregates incomes by category', () => {
        useTransactionStore.getState().setTransactions(mockTransactions);
        const incomeList = useTransactionStore.getState().getIncomeList('u1');
        expect(incomeList).toHaveLength(1);
        expect(incomeList[0].category_name).toBe('Salary');
        expect(incomeList[0].amount).toBe(200);
    });

    it('getExpenseTypeList includes savings total', () => {
        useTransactionStore.getState().setTransactions(mockTransactions);
        const expenseTypeList = useTransactionStore.getState().getExpenseTypeList('u1');
        const savings = expenseTypeList.find((e) => e.type === 'savings');
        expect(savings?.amount).toBe(80);
    });

    it('getExpenseTypeList sums needs expenses', () => {
        useTransactionStore.getState().setTransactions(mockTransactions);
        const expenseTypeList = useTransactionStore.getState().getExpenseTypeList('u1');
        const needs = expenseTypeList.find((e) => e.type === 'needs');
        expect(needs?.amount).toBe(150);
    });
});
