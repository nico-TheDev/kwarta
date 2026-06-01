import React from 'react'

import formatCurrencyPHP from '@/utils/formatCurrencyToPHP'

export default function GoalItem({ goalName, goalTarget, goalSaved }) {
    return (
        <div className="bg-white shadow rounded-2xl p-6">
            <div className="flex justify-between items-start">
                {/* LEFT */}
                <div>
                    <p className="text-md font-bold text-primary mb-1">
                        {/* {getLanguage(currentLanguage).expenses} */}
                        {goalName}
                    </p>
                    <h4 className="text-[10px] text-gray-400 whitespace-nowrap">
                        {`${formatCurrencyPHP(goalTarget)} Target | ${formatCurrencyPHP(goalSaved)} Saved`}
                    </h4>
                </div>
            </div>
            <div className="w-full pt-4">
                <div className="flex items-center gap-3">
                    {/* Progress Bar */}
                    <div className="relative flex-1 bg-gray-200 rounded-full h-5 overflow-hidden">
                        {/* Progress fill */}
                        <div
                            className="h-full bg-[#10B981] transition-all duration-300"
                            style={{
                                width: `${(goalSaved / goalTarget) * 100 || 0}%`,
                            }}
                        />

                        {/* Percentage text inside */}
                        <span
                            className={`absolute right-2 top-1/2 -translate-y-1/2 text-xs font-medium ${
                                (goalSaved / goalTarget) * 100 === 100
                                    ? 'text-white'
                                    : 'text-gray-500'
                            }`}
                        >
                            {`${(goalSaved / goalTarget) * 100 || 0}%`}
                        </span>
                    </div>
                </div>
            </div>
            <div className="w-full pt-4">
                <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                        (goalSaved / goalTarget) * 100 === 100
                            ? 'bg-green-600 text-white'
                            : 'bg-green-100 text-green-700'
                    }`}
                >
                    {(goalSaved / goalTarget) * 100 === 100
                        ? 'Completed'
                        : 'Ongoing'}
                </span>
            </div>
        </div>
    )
}
