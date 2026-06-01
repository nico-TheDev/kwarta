export interface LoginTypes {
    email: string
    password: string
}

export interface SignUpTypes {
    name: string
    email: string
    password: string
    confirmPassword: string
}

export interface AddAccountTypes {
    accountName: string
    accountAmount: string
    accountDescription: string
}

export interface CreateTransferTypes {
    transferAmount: string
    comment: string
}

export interface AddTransactionTypes {
    transactionAmount: string
    comment: string
}

export interface AddBudgetTypes {
    budgetAmount: string
    budgetDescription: string
}

export interface AddSavingsGoalTypes {
    goalName: string
    goalAmount: string
}

export interface AddCategoryTypes {
    categoryName: string
}
