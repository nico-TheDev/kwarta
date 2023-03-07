import { v4 as uuid } from 'uuid'
import { ICON_NAMES } from 'constants/constant';

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

export const categories = [
    {
        id: uuid(),
        createdAt: '27/03/2019',
        title: 'Health',
        icon: ICON_NAMES.CATEGORY_ICONS.HEALTH,
    },
    {
        id: uuid(),
        createdAt: '27/03/2019',
        title: 'Education',
        icon: ICON_NAMES.CATEGORY_ICONS.EDUCATION,
    },
    {
        id: uuid(),
        createdAt: '27/03/2019',
        title: 'Hobbies',
        icon: ICON_NAMES.CATEGORY_ICONS.TOYS,
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

export const colorCollection = [
    {
        colorID: "1",
        color: "#1A1747",
    },
    {
        colorID: "2",
        color: "#069420",
    },
    {
        colorID: "3",
        color: "#1602FF",
    },
    {
        colorID: "4",
        color: "#FF00D6",
    },
    {
        colorID: "5",
        color: "#8BCA97",
    },
    {
        colorID: "6",
        color: "#76B65F",
    },
    {
        colorID: "7",
        color: "#5FB572",
    },
];
