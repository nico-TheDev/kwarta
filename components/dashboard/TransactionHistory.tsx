import formatCurrencyPHP from '@/utils/formatCurrencyToPHP'
import React from 'react'

interface Transaction {
    id: string
    transaction: string
    category: string
    date: string
    amount: number
    type: 'income' | 'expense' // new field
}

const transactions: Transaction[] = [
    {
        id: '1',
        transaction: 'Groceries',
        category: 'Food',
        date: '2026-04-01',
        amount: 1200,
        type: 'expense',
    },
    {
        id: '2',
        transaction: 'Uber Ride',
        category: 'Transport',
        date: '2026-04-02',
        amount: 350,
        type: 'expense',
    },
    {
        id: '3',
        transaction: 'Salary',
        category: 'Income',
        date: '2026-04-02',
        amount: 5000,
        type: 'income',
    },
    {
        id: '4',
        transaction: 'Electricity Bill',
        category: 'Utilities',
        date: '2026-04-03',
        amount: 1000,
        type: 'expense',
    },
]

export default function TransactionHistory() {
    return (
        <div className="bg-white shadow rounded-2xl p-6 h-full">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold text-black">
                    Recent Transactions
                </h3>
                <button className="text-xs text-blue-500 hover:underline">
                    View All
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="py-2 px-4 font-medium text-gray-600">
                                Transaction
                            </th>
                            <th className="py-2 px-4 font-medium text-gray-600">
                                Category
                            </th>
                            <th className="py-2 px-4 font-medium text-gray-600">
                                Date
                            </th>
                            <th className="py-2 px-4 font-medium text-gray-600 text-right">
                                Amount
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((t) => (
                            <tr
                                key={t.id}
                                className="border-b border-gray-100 hover:bg-gray-50"
                            >
                                <td className="py-2 px-4 text-black text-sm">
                                    {t.transaction}
                                </td>
                                <td className="py-2 px-4 text-black text-sm">
                                    {t.category}
                                </td>
                                <td className="py-2 px-4 text-black text-sm">
                                    {t.date}
                                </td>
                                <td
                                    className={`py-2 px-4 text-right text-sm font-medium ${
                                        t.type === 'income'
                                            ? 'text-green-600'
                                            : 'text-red-600'
                                    }`}
                                >
                                    {t.type === 'income' ? '+' : '-'}{' '}
                                    {formatCurrencyPHP(t.amount)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
