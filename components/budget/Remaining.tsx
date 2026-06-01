import React from 'react'

import formatCurrencyPHP from '@/utils/formatCurrencyToPHP'

export default function Remaining() {
    const percentage = 70
    return (
        <div className="bg-white shadow rounded-2xl p-6">
            <div className="flex justify-between items-start">
                {/* LEFT */}
                <div>
                    <p className="text-xs text-black mb-1">
                        {/* {getLanguage(currentLanguage).expenses} */}
                        Total Remaining
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
            <div className="w-full pt-4">
                <div className="flex items-center gap-3">
                    {/* Progress Bar */}
                    <div className="relative flex-1 bg-gray-200 rounded-full h-5 overflow-hidden">
                        {/* Progress fill */}
                        <div
                            className="h-full bg-[#10B981] transition-all duration-300"
                            style={{ width: `${percentage || 0}%` }}
                        />

                        {/* Percentage text inside */}
                        <span
                            className={`absolute right-2 top-1/2 -translate-y-1/2 text-xs font-medium ${
                                percentage === 100
                                    ? 'text-white'
                                    : 'text-gray-500'
                            }`}
                        >
                            {percentage || 0}% used
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
