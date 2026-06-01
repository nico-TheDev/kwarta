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
    { month: 'Jan', income: 12000, expense: 9000 },
    { month: 'Feb', income: 15000, expense: 10000 },
    { month: 'Mar', income: 14000, expense: 10500 },
    { month: 'Apr', income: 16000, expense: 11000 },
    { month: 'May', income: 17000, expense: 11500 },
    { month: 'Jun', income: 19000, expense: 12000 },
    { month: 'Jul', income: 19000, expense: 12000 },
    { month: 'Aug', income: 0, expense: 0 },
    { month: 'Sep', income: 0, expense: 0 },
    { month: 'Oct', income: 0, expense: 0 },
    { month: 'Nov', income: 0, expense: 0 },
    { month: 'Dec', income: 0, expense: 0 },
]

export default function Cashflow() {
    return (
        <div className="bg-white shadow rounded-2xl p-6 h-full">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-bold text-black">Cashflow</h3>
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
                    <Bar dataKey="expense" fill="#EF4444" barSize={10} />
                    <Bar dataKey="income" fill="#10B981" barSize={10} />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    )
}
