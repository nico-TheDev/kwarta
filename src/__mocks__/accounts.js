import { v4 as uuid } from 'uuid'
import { ICON_NAMES } from 'constants/constant'

export const accounts = [
    {
        id: uuid(),
        createdAt: '27/03/2019',
        description: 'For daily use and spending',
        title: 'Wallet',
        balance: 20000,
        icon: ICON_NAMES.ACCOUNT_ICONS.WALLET
    },
    {
        id: uuid(),
        createdAt: '27/03/2019',
        description: 'For online transactions',
        title: 'BPI',
        balance: 20000,
        icon: ICON_NAMES.ACCOUNT_ICONS.BANK
    },
    {
        id: uuid(),
        createdAt: '27/03/2019',
        description: 'For Groceries',
        title: 'GCASH',
        balance: 10000,
        icon: ICON_NAMES.ACCOUNT_ICONS.CREDIT_CARD
    }
]

export const savings = [
    {
        id: uuid(),
        createdAt: '27/03/2019',
        description: 'For emergency',
        title: 'Emergency Fund',
        balance: 10000
    },
    {
        id: uuid(),
        createdAt: '27/03/2019',
        description: 'For Vacation',
        title: 'Vacation',
        balance: 10000
    }
]

export const achievements = [
    {
        id: uuid(),
        description: 'Have 100 expenses which do not exceed budget',
        title: 'Wise Spender',
        percentage: 50,
    },
    {
        id: uuid(),
        description: 'Have added 10 times in the savings',
        title: 'Save for the Future',
        percentage: 25,
    },
    {
        id: uuid(),
        description: 'Have implemented 50-30-20 rule for 5 times.',
        title: 'Smart Planner',
        percentage: 75,
    },
]
