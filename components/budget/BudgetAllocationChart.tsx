import React, { useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    ChartOptions,
    ChartData,
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

import { Icon } from '../shared/IconLibrary/Icons'
import { ICON_NAMES } from '@/constants/icons'

ChartJS.register(ArcElement, Tooltip, Legend)

interface BudgetCategoryItem {
    category_name: string
    amount: number
    color: string
    transaction_icon: string
}

interface CategoryListItem {
    title: string
    value: string
    icon: string
    color: string
}

export default function BudgetAllocationChart() {
    const [expenseList, setExpenseList] = useState<ExpenseItem[]>([])
    const [graphData, setGraphData] = useState<any>({})
    const [categoryList, setCategoryList] = useState<CategoryListItem[]>([])

    const options = {
        animation: false,
        cutout: '80%',
        layout: { padding: 0 },
        plugins: {
            legend: {
                display: false, // <-- ensures no legend shows
                position: 'top', // optional, ignored if display=false
            },
            tooltip: {
                enabled: true,
                backgroundColor: '#f9fafb',
                titleColor: '#111827',
                bodyColor: '#6b7280',
                borderColor: '#d1d5db',
                borderWidth: 1,
            },
        },
        maintainAspectRatio: false,
        responsive: true,
    }

    useEffect(() => {
        // if (!user) return;

        // Mock / placeholder data for development
        const mockData: BudgetCategoryItem[] = [
            {
                category_name: 'Food',
                amount: 10000,
                color: '#F87171',
                transaction_icon: ICON_NAMES.CATEGORY_ICONS.FOOD,
            },
            {
                category_name: 'Transport',
                amount: 2000,
                color: '#60A5FA',
                transaction_icon: ICON_NAMES.CATEGORY_ICONS.CAR,
            },
            {
                category_name: 'Shopping',
                amount: 5000,
                color: '#FBBF24',
                transaction_icon: ICON_NAMES.CATEGORY_ICONS.SHOPPING_BAG,
            },
            {
                category_name: 'Bills',
                amount: 4000,
                color: '#34D399',
                transaction_icon: ICON_NAMES.ACCOUNT_ICONS.RECEIPT,
            },
        ]

        // const expenseData: ExpenseItem[] = getExpenseList(user?.uid) || mockData
        const expenseData: BudgetCategoryItem[] = mockData

        setExpenseList(expenseData)

        const data = {
            datasets: [
                {
                    data: expenseData.map((item) => item.amount),
                    backgroundColor: expenseData.map((item) => item.color),
                    borderWidth: 8,
                    borderColor: '#ffffff',
                    hoverBorderColor: '#ffffff',
                },
            ],
            labels: expenseData.map((item) => item.category_name),
        }

        const total = expenseData.reduce((acc, cur) => acc + cur.amount, 0)

        const list = expenseData.map((item) => ({
            title: item.category_name,
            value: (item.amount / total).toLocaleString(undefined, {
                style: 'percent',
                minimumFractionDigits: 2,
            }),
            icon: item.transaction_icon,
            color: item.color,
        }))

        setGraphData(data)
        setCategoryList(list)
    }, [])

    return (
        <div className="bg-white shadow rounded-2xl p-6">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-bold text-black">
                    Category-wise Budget Allocation
                </h3>
                {/* <span className="text-xs text-gray-400">Monthly trend</span> */}
            </div>
            <hr className="border-gray-200" />
            <div className="flex flex-row gap-4 p-4">
                {/* Doughnut chart */}
                <div className="flex-none w-48 h-48 relative">
                    {expenseList.length > 0 ? (
                        <Doughnut data={graphData} options={options} />
                    ) : null}
                </div>

                {/* Category list */}
                <div className="flex flex-wrap flex-1 gap-2 items-start">
                    {categoryList.length > 0 ? (
                        categoryList.map(({ color, title, value, icon }) => (
                            <div
                                key={title}
                                className="flex flex-col items-center text-center w-1/3 p-2"
                                style={{ color }}
                            >
                                <Icon name={icon} color="inherit" size={16} />
                                <span className="text-gray-900 text-[10px] mt-1">
                                    {title}
                                </span>
                                <span className="text-xs mt-1">{value}</span>
                            </div>
                        ))
                    ) : (
                        <div className="w-full text-center mt-4 text-gray-400">
                            No categories to display
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
