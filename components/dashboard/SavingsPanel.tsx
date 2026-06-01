import formatCurrencyPHP from '@/utils/formatCurrencyToPHP'
import React, { useEffect, useState } from 'react'
import { MdSavings, MdTrendingDown, MdTrendingUp } from 'react-icons/md'

export default function SavingsPanel() {
    const [percentage, setPercentage] = useState<{
        hasIncreased: boolean
        difference: number
    } | null>(null)

    // Mock data generation
    useEffect(() => {
        // simulate fetching data
        const mockData = (() => {
            const hasIncreased = Math.random() > 0.5 // true = increase, false = decrease
            const difference = Math.floor(Math.random() * 20) + 1 // 1 - 20%
            return {
                hasIncreased,
                difference: hasIncreased ? difference : -difference,
            }
        })()
        setPercentage(mockData)
    }, [])

    const transactions = [
        { id: 1, type: 'expense', amount: 1200 },
        { id: 2, type: 'income', amount: 5000 },
        { id: 3, type: 'savings', amount: 800 },
        { id: 4, type: 'savings', amount: 1200 },
        { id: 5, type: 'expense', amount: 300 },
    ]

    const accounts = [
        { id: 1, account_type: 'savings', account_amount: 10000 },
        { id: 2, account_type: 'Savings Account', account_amount: 5000 },
        { id: 3, account_type: 'checking', account_amount: 3000 },
        { id: 4, account_type: 'emergency savings', account_amount: 2000 },
        { id: 5, account_type: 'wallet', account_amount: 1500 },
    ]

    const [total, setTotal] = useState(0)

    useEffect(() => {
        const totalSavings = transactions.reduce((acc, current) => {
            if (current.type === 'savings') {
                acc += current.amount
            }
            return acc
        }, 0)
        const totalAccountSavings = accounts.reduce((acc, current) => {
            if (
                current.account_type === 'savings' ||
                current.account_type.toLowerCase().includes('savings')
            ) {
                acc += current.account_amount
            }
            return acc
        }, 0)

        setTotal(totalSavings + totalAccountSavings)
    }, [transactions])

    return (
        <div className="bg-white shadow rounded-2xl p-6">
            <div className="flex justify-between items-start">
                {/* LEFT */}
                <div>
                    <p className="text-xs text-black mb-1">Savings</p>
                    <h4 className="text-2xl font-bold text-primary">
                        {formatCurrencyPHP(total)}
                    </h4>
                </div>

                {/* <div className="relative group">
                    <div
                        className="absolute bottom-full mb-2 hidden group-hover:block 
                        whitespace-nowrap rounded bg-gray-800 text-white text-xs px-2 py-1"
                    >
                        Total Savings
                    </div>

                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-purple-500">
                        <MdSavings className="text-white text-xl" />
                    </div>
                </div> */}
            </div>
            <div className="flex items-center pt-4">
                {percentage?.hasIncreased ? (
                    <span
                        // title={
                        //     getLanguage(currentLanguage).tooltipInflationLower
                        // }
                        title="Income Higher"
                        className="text-green-500"
                    >
                        <MdTrendingUp />
                    </span>
                ) : (
                    <span
                        // title={
                        //     getLanguage(currentLanguage).tooltipInflationHigher
                        // }
                        title="Income Lower"
                        className="text-red-500"
                    >
                        <MdTrendingDown />
                    </span>
                )}

                <div
                    className={`flex items-center gap-1 text-sm ${
                        percentage?.hasIncreased
                            ? 'text-green-500'
                            : 'text-red-500'
                    }`}
                >
                    <span>{percentage?.difference}%</span>
                    <span className="text-xs whitespace-nowrap">
                        Since last month
                    </span>
                </div>
            </div>
        </div>
    )
}
