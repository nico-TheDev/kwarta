import React from 'react'
import {
    MdDirectionsCar,
    MdReceiptLong,
    MdRestaurant,
    MdShoppingBag,
} from 'react-icons/md'
import { RiPencilFill } from 'react-icons/ri'
import { FaTrash } from 'react-icons/fa6'

import formatCurrencyPHP from '@/utils/formatCurrencyToPHP'
import { ICON_NAMES } from '@/constants/icons'
import { Icon } from '../shared/IconLibrary/Icons'
import { colors } from '@/constants/themes'

interface BudgetItem {
    id: string
    category: string
    limit: number
    spent: number
    icon: string
}

const data: BudgetItem[] = [
    {
        id: '1',
        category: 'Food & Dining',
        limit: 10000,
        spent: 8200,
        icon: ICON_NAMES.CATEGORY_ICONS.FOOD,
    },
    {
        id: '2',
        category: 'Transport',
        limit: 5000,
        spent: 3100,
        icon: ICON_NAMES.CATEGORY_ICONS.CAR,
    },
    {
        id: '3',
        category: 'Shopping',
        limit: 8000,
        spent: 9400,
        icon: ICON_NAMES.CATEGORY_ICONS.SHOPPING_BAG,
    },
    {
        id: '4',
        category: 'Bills & Utilities',
        limit: 12000,
        spent: 11200,
        icon: ICON_NAMES.ACCOUNT_ICONS.RECEIPT,
    },
]

export default function BudgetTable() {
    return (
        <div className="bg-white shadow rounded-xl p-4">
            <table className="w-full text-sm">
                <thead>
                    <tr className="text-gray-500 border-b">
                        <th className="text-left py-2">Category</th>
                        <th className="text-left py-2">Limit</th>
                        <th className="text-left py-2">Spent</th>
                        <th className="text-left py-2">Remaining</th>
                        <th className="text-left py-2">Progress</th>
                        <th className="text-center py-2">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((item) => {
                        const remaining = item.limit - item.spent
                        const percentage = Math.round(
                            (item.spent / item.limit) * 100
                        )

                        return (
                            <tr
                                key={item.id}
                                className="border-b hover:bg-gray-50"
                            >
                                {/* Category */}
                                <td className="py-3 flex items-center gap-2">
                                    <span className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                        <Icon
                                            name={item.icon}
                                            color={colors.primary}
                                            size={16}
                                        />
                                    </span>
                                    <span className="text-black text-sm">
                                        {item.category}
                                    </span>
                                </td>

                                {/* Limit */}
                                <td className="text-black text-sm">
                                    {formatCurrencyPHP(item.limit)}
                                </td>

                                {/* Spent */}
                                <td className="text-black text-sm">
                                    {formatCurrencyPHP(item.spent)}
                                </td>

                                {/* Remaining */}
                                <td
                                    className={`text-sm ${remaining < 0 ? 'text-red-500' : 'text-black'}`}
                                >
                                    {remaining < 0 ? '-' : ''}
                                    {formatCurrencyPHP(Math.abs(remaining))}
                                </td>

                                {/* Progress */}
                                <td className="w-[200px]">
                                    <div className="relative bg-gray-200 rounded-full h-4 overflow-hidden">
                                        <div
                                            className={`h-full ${
                                                percentage > 100
                                                    ? 'bg-red-500'
                                                    : 'bg-emerald-500'
                                            }`}
                                            style={{
                                                width: `${Math.min(percentage, 100)}%`,
                                            }}
                                        />

                                        <span
                                            className={`absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-medium ${
                                                percentage >= 100
                                                    ? 'text-white'
                                                    : 'text-gray-600'
                                            }`}
                                        >
                                            {percentage}% used
                                        </span>
                                    </div>
                                </td>

                                {/* Actions */}
                                <td>
                                    <div className="flex justify-center gap-2">
                                        <button className="w-7 h-7 flex items-center justify-center rounded-full bg-yellow-400 hover:bg-yellow-500 text-white text-xs">
                                            <RiPencilFill
                                                color="white"
                                                size={18}
                                            />
                                        </button>
                                        <button className="w-7 h-7 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white text-xs">
                                            <FaTrash color="white" size={14} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-4">
                <button className="px-3 py-1 text-xs text-primary border rounded">
                    Prev
                </button>
                <button className="px-3 py-1 text-xs bg-primary text-white rounded">
                    1
                </button>
                <button className="px-3 py-1 text-xs text-primary border rounded">
                    2
                </button>
                <button className="px-3 py-1 text-xs text-primary border rounded">
                    3
                </button>
                <button className="px-3 py-1 text-xs text-primary border rounded">
                    Next
                </button>
            </div>
        </div>
    )
}
