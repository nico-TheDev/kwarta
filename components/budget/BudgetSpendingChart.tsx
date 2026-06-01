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
} from 'recharts'

const data = [
    { month: 'Jan', budget: 12000, spent: 9000 },
    { month: 'Feb', budget: 15000, spent: 6000 },
    { month: 'Mar', budget: 14000, spent: 10500 },
    { month: 'Apr', budget: 16000, spent: 13000 },
    { month: 'May', budget: 17000, spent: 11500 },
    { month: 'Jun', budget: 19000, spent: 12000 },
    { month: 'Jul', budget: 19000, spent: 20000 },
    { month: 'Aug', income: 0, expense: 0 },
    { month: 'Sep', income: 0, expense: 0 },
    { month: 'Oct', income: 0, expense: 0 },
    { month: 'Nov', income: 0, expense: 0 },
    { month: 'Dec', income: 0, expense: 0 },
]

export default function BudgetSpendingChart() {
    return (
        <div className="bg-white shadow rounded-2xl p-6 h-full">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-bold text-black">
                    Budget vs Spending Over Time
                </h3>
                <span className="text-xs text-gray-400">Monthly trend</span>
            </div>
            <hr className="border-gray-200" />
            <ResponsiveContainer width="100%" height={250}>
                <ComposedChart
                    data={data}
                    margin={{ top: 5, bottom: 5 }}
                    style={{ padding: 6 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" style={{ fontSize: 12 }} />
                    <YAxis style={{ fontSize: 12 }} />
                    <Tooltip
                        formatter={(value: number, name: string) => {
                            // Capitalize name and format value to PHP
                            const capitalizedName =
                                name.charAt(0).toUpperCase() + name.slice(1)
                            const formattedValue = `₱${value.toLocaleString('en-PH')}`
                            return [formattedValue, capitalizedName]
                        }}
                    />

                    {/* Legend with capitalized labels */}
                    <Legend
                        formatter={(value: string) =>
                            value.charAt(0).toUpperCase() + value.slice(1)
                        }
                    />
                    {/* Expense as Bar */}
                    <Line
                        type="monotone"
                        dataKey="spent"
                        stroke="#EF4444"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 6 }}
                    />

                    <Line
                        type="monotone"
                        dataKey="budget"
                        stroke="#10B981"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 6 }}
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    )
}
