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
