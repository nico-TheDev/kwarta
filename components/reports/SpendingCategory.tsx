import React from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    ComposedChart,
    Bar,
    Cell,
} from 'recharts'

export default function SpendingCategory() {
    const mockData = [
        {
            categoryName: 'Food',
            amount: 10000,
            color: '#F87171',
        },
        {
            categoryName: 'Transport',
            amount: 2000,
            color: '#60A5FA',
        },
        {
            categoryName: 'Shopping',
            amount: 5000,
            color: '#FBBF24',
        },
        {
            categoryName: 'Bills',
            amount: 4000,
            color: '#34D399',
        },
    ]

    return (
        <div className="bg-white shadow rounded-2xl p-6 h-full">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-bold text-black">
                    Spending by Category
                </h3>
            </div>
            <hr className="border-gray-200" />
            <ResponsiveContainer width="100%" height={250}>
                <ComposedChart
                    data={mockData}
                    margin={{ top: 5, bottom: 5 }}
                    style={{ padding: 6 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="categoryName" style={{ fontSize: 12 }} />
                    <YAxis style={{ fontSize: 12 }} />
                    <Tooltip
                        formatter={(value: number, name: string) => {
                            // Convert camelCase / PascalCase to human-readable text
                            const formattedName = name
                                .replace(/([A-Z])/g, ' $1')
                                .trim()
                            const capitalizedName =
                                formattedName.charAt(0).toUpperCase() +
                                formattedName.slice(1)
                            const formattedValue = `₱${value.toLocaleString('en-PH')}`
                            return [formattedValue, capitalizedName]
                        }}
                    />

                    <Legend
                        formatter={(value: string) => {
                            const formattedName = value
                                .replace(/([A-Z])/g, ' $1')
                                .trim()
                            return (
                                formattedName.charAt(0).toUpperCase() +
                                formattedName.slice(1)
                            )
                        }}
                    />
                    {/* Expense as Bar */}

                    <Bar dataKey="amount" barSize={20}>
                        {mockData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Bar>
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    )
}
