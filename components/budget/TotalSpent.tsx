import React, { useEffect, useState } from 'react'

import formatCurrencyPHP from '@/utils/formatCurrencyToPHP'

export default function TotalSpent() {
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

    return (
        <div className="bg-white shadow rounded-2xl p-6">
            <div className="flex justify-between items-start">
                {/* LEFT */}
                <div>
                    <p className="text-xs text-black mb-1">
                        {/* {getLanguage(currentLanguage).expenses} */}
                        Total Spent
                    </p>
                    <h4 className="text-2xl font-bold text-primary">
                        {formatCurrencyPHP(45000)}
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
                    className={`flex items-center gap-1 text-sm ${
                        percentage?.hasIncreased
                            ? 'text-green-500'
                            : 'text-red-500'
                    }`}
                >
                    <span>{percentage?.difference}%</span>
                </div>
            </div>
        </div>
    )
}
