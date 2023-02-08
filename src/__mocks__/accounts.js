import { v4 as uuid } from 'uuid'

export const accounts = [
    {
        id: uuid(),
        createdAt: '27/03/2019',
        description: 'For daily use and spending',
        title: 'Wallet',
        balance: 20000
    },
    {
        id: uuid(),
        createdAt: '27/03/2019',
        description: 'For online transactions',
        title: 'BPI',
        balance: 20000
    },
    {
        id: uuid(),
        createdAt: '27/03/2019',
        description: 'For Groceries',
        title: 'GCASH',
        balance: 10000
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
