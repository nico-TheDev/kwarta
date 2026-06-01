import React, { useEffect, useState } from 'react'

import formatCurrencyPHP from '@/utils/formatCurrencyToPHP'

export default function TotalBudget({ selectedDate }) {
    // const transactions = [
    //     { id: 1, type: 'expense', amount: 1200 },
    //     { id: 2, type: 'income', amount: 5000 },
    //     { id: 3, type: 'expense', amount: 300 },
    //     { id: 4, type: 'expense', amount: 750 },
    //     { id: 5, type: 'income', amount: 2000 },
    //     { id: 6, type: 'expense', amount: 150 },
    // ]

    // const [total, setTotal] = useState(0)

    // useEffect(() => {
    //     const totalExpenses = transactions.reduce((acc, current) => {
    //         if (current.type === 'expense') {
    //             acc += current.amount
    //         }
    //         return acc
    //     }, 0)

    //     setTotal(totalExpenses)
    // }, [transactions])

    return (
        <div className="bg-white shadow rounded-2xl p-6">
            <div className="flex justify-between items-start">
                {/* LEFT */}
                <div>
                    <p className="text-xs text-black mb-1">
                        {/* {getLanguage(currentLanguage).expenses} */}
                        Total Budget
                    </p>
                    <h4 className="text-2xl font-bold text-primary">
                        {formatCurrencyPHP(60000)}
                    </h4>
                </div>

                {/* <div className="relative group">
                    <div
                        className="absolute bottom-full mb-2 hidden group-hover:block 
                        whitespace-nowrap rounded bg-gray-800 text-white text-xs px-2 py-1"
                    >
                        Total Expenses
                    </div>

                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-400">
                        <MdUpload className="text-white" size={20} />
                    </div>
                </div> */}
            </div>
            <div className="flex items-center pt-4">
                <div
                    className={`flex items-center gap-1 text-sm text-green-500`}
                >
                    <span className="text-xs whitespace-nowrap">
                        for January 2026
                    </span>
                </div>
            </div>
        </div>
    )
}
