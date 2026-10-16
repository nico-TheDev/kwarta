import { create } from 'zustand';

import toast from 'react-hot-toast';

import localDb from 'lib/localDb';
import { blue, deepPurple, green, red, yellow } from '@mui/material/colors';
import { ICON_NAMES } from 'constants/constant';

const transactionStore = (set, get) => ({
    transactions: [],
    isEmpty: false,
    getTransaction: () => {},
    resetTransactions: () => {
        set({ transactions: [] });
    },
    // PHOTO FILES ARE SKIPPED UNTIL FEATURE 31, SO currentFile AND newFile ARE IGNORED
    createTransaction: async (newTransaction, currentFile) => {
        const loader = toast.loading('Creating Transaction');
        try {
            if (newTransaction.amount === '' || newTransaction.targetAccount === '' || newTransaction.category === '') {
                throw new Error('Check the input fields');
            }

            if (newTransaction.amount === 0 || newTransaction.amount === '') {
                throw new Error('Please enter a valid amount');
            }

            // THE BALANCE UPDATE AND THE RECORD COMMIT TOGETHER OR NOT AT ALL
            await localDb.batch((tx) => {
                const accountId = newTransaction.targetAccount.id;
                const currentAccount = tx.get('accounts', accountId);

                // SUBTRACT
                if (
                    newTransaction.type === 'expense' ||
                    newTransaction.type === 'savings' ||
                    newTransaction.type === 'investments'
                ) {
                    if (currentAccount.account_amount > newTransaction.amount) {
                        tx.update('accounts', accountId, {
                            account_amount: currentAccount.account_amount - newTransaction.amount
                        });
                    } else {
                        throw new Error("You don't have enough money!");
                    }
                } else {
                    // INCOME
                    tx.update('accounts', accountId, {
                        account_amount: currentAccount.account_amount + newTransaction.amount
                    });
                }

                tx.add('transactions', {
                    ...newTransaction,
                    photoRef: '',
                    photoUrl: ''
                });
            });
            console.log('NEW DOCUMENT CREATED');
            // HANDLE TOAST
            toast.dismiss(loader);
            toast.success('Transaction successfully created!');
        } catch (err) {
            console.log('addTransactionError:', err);
            toast.error(err.message);
            toast.dismiss(loader);
        }
    },
    updateTransaction: async (documentId, updatedTransaction, newFile) => {
        const editLoader = toast.loading('Updating Transaction');
        try {
            await localDb.batch((tx) => {
                const currentTransaction = tx.get('transactions', documentId);
                let originalAmount, updatedAmount, currentAccount;
                // SAME ACCOUNTS
                console.log(currentTransaction);
                if (currentTransaction.targetAccount.id === updatedTransaction.targetAccount.id) {
                    currentAccount = tx.get('accounts', updatedTransaction.targetAccount.id);
                    // RETURN THE ORIGINAL AMOUNT
                    if (
                        currentTransaction.type === 'expense' ||
                        currentTransaction.type === 'savings' ||
                        currentTransaction.type === 'investments'
                    ) {
                        originalAmount = currentAccount.account_amount + currentTransaction.amount;
                    } else {
                        originalAmount = currentAccount.account_amount - currentTransaction.amount;
                    }
                    // UPDATE THE ACCOUNT AMOUNT
                    if (
                        updatedTransaction.type === 'expense' ||
                        updatedTransaction.type === 'savings' ||
                        updatedTransaction.type === 'investments'
                    ) {
                        updatedAmount = originalAmount - updatedTransaction.amount;
                    } else {
                        updatedAmount = originalAmount + updatedTransaction.amount;
                    }

                    // UPDATE THE ACCOUNT DOCUMENT
                    tx.update('accounts', updatedTransaction.targetAccount.id, {
                        account_amount: updatedAmount
                    });
                } else {
                    // KNOWN QUIRK, KEPT ON PURPOSE UNTIL FEATURE 29: ONLY expense SUBTRACTS AND THE
                    // NEW ACCOUNT IS READ FROM updatedTransaction.target_account
                    const oldAccount = tx.get('accounts', currentTransaction.targetAccount.id);
                    // RESTORE MONEY TO THE OLD ACCOUNT
                    if (currentTransaction.type === 'expense') {
                        originalAmount = oldAccount.account_amount + currentTransaction.amount;
                    } else {
                        originalAmount = oldAccount.account_amount - currentTransaction.amount;
                    }
                    const newAccount = tx.get('accounts', updatedTransaction.target_account);
                    // SUBTRACT MONEY TO THE NEW ACCOUNT
                    if (updatedTransaction.type === 'expense') {
                        updatedAmount = newAccount.account_amount - updatedTransaction.amount;
                    } else {
                        updatedAmount = newAccount.account_amount + updatedTransaction.amount;
                    }
                    // UPDATE THE ACCOUNT DOCUMENTS
                    tx.update('accounts', currentTransaction.targetAccount.id, {
                        account_amount: originalAmount
                    });
                    tx.update('accounts', updatedTransaction.target_account, {
                        account_amount: updatedAmount
                    });
                }

                tx.update('transactions', documentId, {
                    ...updatedTransaction,
                    photoRef: '',
                    photoUrl: ''
                });
            });

            toast.success('Updated Successfully.');

            return true;
        } catch (err) {
            console.log('updateTransactionError:', err);
            toast.error(err.message);

            return false;
        } finally {
            toast.dismiss(editLoader);
        }
    },
    deleteTransaction: async (documentId, fileReference) => {
        console.log('Delete', documentId);
        const deleteLoader = toast.loading('Deleting Transaction');
        try {
            await localDb.batch((tx) => {
                const currentTransaction = tx.get('transactions', documentId);
                const accountId = currentTransaction.targetAccount.id;
                const currentAccount = tx.get('accounts', accountId);
                if (currentAccount) {
                    // RETURN THE SUBTRACTED AMOUNT
                    if (
                        currentTransaction.type === 'expense' ||
                        currentTransaction.type === 'savings' ||
                        currentTransaction.type === 'investments'
                    ) {
                        tx.update('accounts', accountId, {
                            account_amount: currentAccount.account_amount + currentTransaction.amount
                        });
                    } else {
                        // INCOME
                        tx.update('accounts', accountId, {
                            account_amount: currentAccount.account_amount - currentTransaction.amount
                        });
                    }
                }

                // DELETE THE DOCUMENT
                tx.remove('transactions', documentId);
            });
            // ALERT A MESSAGE

            toast.success('Deleted Successfully!');

            return true;
        } catch (err) {
            console.log('deleteTransactionError:', err);
            toast.error(err.message);
        } finally {
            toast.dismiss(deleteLoader);
        }
    },
    setTransactions: (transactionList, isEmpty = false) => {
        set({
            transactions: transactionList,
            isEmpty
        });
    },
    getExpenseList: (user_id) => {
        const expenseList = get().transactions.filter((transaction) => transaction.type === 'expense');

        const expenseCategoryList = expenseList.reduce((acc, currentExpense) => {
            if (!acc.includes(currentExpense.category.category_name)) {
                acc.push(currentExpense.category.category_name);
            }
            return acc;
        }, []);

        // create an initial data holder
        const expenseDataList = expenseCategoryList.map((category) => {
            const targetCategory = expenseList.find((item) => item.category.category_name === category);
            return {
                user_id,
                amount: 0,
                type: 'expense',
                category_name: category,
                transaction_icon: targetCategory.category.category_icon,
                color: targetCategory?.category?.category_color,
                transaction_color: targetCategory.category.category_color
            };
        });

        // add the amount to the initial data
        expenseList.forEach((item) => {
            // find the data
            const targetCategory = expenseDataList.find(
                (currentData) => item.category.category_name === currentData.category_name
            );

            if (item.category.category_name === targetCategory.category_name) {
                targetCategory.amount += item.amount;
            }
        });

        return expenseDataList;
    },
    getIncomeList: (user_id) => {
        const incomeList = get().transactions.filter((transaction) => transaction.type === 'income');

        const incomeCategoryList = incomeList.reduce((acc, currentIncome) => {
            if (!acc.includes(currentIncome.category.category_name)) {
                acc.push(currentIncome.category.category_name);
            }
            return acc;
        }, []);

        // create an initial data holder
        const incomeDataList = incomeCategoryList.map((category) => {
            const targetCategory = incomeList.find((item) => item.category.category_name === category);
            return {
                user_id,
                amount: 0,
                type: 'income',
                category_name: category,
                transaction_icon: targetCategory.category.category_icon,
                color: targetCategory.category.category_color,
                transaction_color: targetCategory.category.category_color
            };
        });

        // add the amount to the initial data
        incomeList.forEach((item) => {
            // find the data
            const targetCategory = incomeDataList.find(
                (currentData) => item.category.category_name === currentData.category_name
            );

            if (item.category.category_name === targetCategory.category_name) {
                targetCategory.amount += item.amount;
            }
        });

        return incomeDataList;
    },
    getSavingsList: (user_id) => {
        const savingsList = get().transactions.filter((transaction) => transaction.type === 'savings');

        const savingsCategoryList = savingsList.reduce((acc, currentIncome) => {
            if (!acc.includes(currentIncome.category.category_name)) {
                acc.push(currentIncome.category.category_name);
            }
            return acc;
        }, []);

        // create an initial data holder
        const savingsDataList = savingsCategoryList.map((category) => {
            const targetCategory = savingsList.find((item) => item.category.category_name === category);
            return {
                user_id,
                amount: 0,
                type: 'savings',
                category_name: category,
                transaction_icon: targetCategory.category.category_icon,
                color: targetCategory.category.category_color,
                transaction_color: targetCategory.category.category_color
            };
        });

        // add the amount to the initial data
        savingsList.forEach((item) => {
            // find the data
            const targetCategory = savingsDataList.find(
                (currentData) => item.category.category_name === currentData.category_name
            );

            if (item.category.category_name === targetCategory.category_name) {
                targetCategory.amount += item.amount;
            }
        });

        return savingsDataList;
    },
    getInvestmentsList: (user_id) => {
        const investmentsList = get().transactions.filter((transaction) => transaction.type === 'investments');

        const investmentsCategoryList = investmentsList.reduce((acc, currentIncome) => {
            if (!acc.includes(currentIncome.category.category_name)) {
                acc.push(currentIncome.category.category_name);
            }
            return acc;
        }, []);

        // create an initial data holder
        const investmentsDataList = investmentsCategoryList.map((category) => {
            const targetCategory = investmentsList.find((item) => item.category.category_name === category);
            return {
                user_id,
                amount: 0,
                type: 'investments',
                category_name: category,
                transaction_icon: targetCategory.category.category_icon,
                color: targetCategory.category.category_color,
                transaction_color: targetCategory.category.category_color
            };
        });

        // add the amount to the initial data
        investmentsList.forEach((item) => {
            // find the data
            const targetCategory = investmentsDataList.find(
                (currentData) => item.category.category_name === currentData.category_name
            );

            if (item.category.category_name === targetCategory.category_name) {
                targetCategory.amount += item.amount;
            }
        });

        return investmentsDataList;
    },
    getExpenseTypeList: (user_id) => {
        const expenseList = get().transactions.filter((transaction) => transaction.type === 'expense');
        console.log(expenseList);

        const totalSavings = get()
            .transactions.filter((item) => item.type === 'savings')
            .reduce((acc, cur) => {
                acc += cur.amount;
                return acc;
            }, 0);

        // create an initial data holder

        const expenseTypeDataList = [
            {
                name: 'Needs',
                amount: 0,
                type: 'needs',
                color: green[500],
                icon: ICON_NAMES.SYSTEM_ICONS.WANTS
            },
            {
                name: 'Wants',
                amount: 0,
                type: 'wants',
                color: red[500],
                icon: ICON_NAMES.SYSTEM_ICONS.NEEDS
            },
            {
                name: 'Savings',
                amount: totalSavings,
                type: 'savings',
                color: deepPurple[500],
                icon: ICON_NAMES.CATEGORY_ICONS.SAVINGS
            }
        ];

        // add the amount to the initial data
        expenseList.forEach((item) => {
            // find the data
            console.log({ item });
            const targetCategory = expenseTypeDataList.find((currentData) => {
                console.log({ currentData });
                if (item.category.expense_type === currentData.type) return currentData;
            });

            console.log({ targetCategory });

            if (targetCategory) {
                if (item.category.expense_type === targetCategory.type) {
                    targetCategory.amount += item.amount;
                }
            }
        });

        return expenseTypeDataList;
    }
});

export const useTransactionStore = create(transactionStore);
