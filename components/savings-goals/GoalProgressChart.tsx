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

export default function GoalProgressChart({ data }) {
    const formattedGoals = data?.map((goal) => ({
        id: goal.id,
        goalName: goal.goalName,
        savedAmount: Number(goal.goalSaved),
        remainingAmount: Number(goal.goalTarget - goal.goalSaved),
    }))

    console.log(formattedGoals)

    return (
        <div className="bg-white shadow rounded-2xl p-6 h-full">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-bold text-black">Goal Progress</h3>
            </div>
            <hr className="border-gray-200" />
            <ResponsiveContainer width="100%" height={250}>
                <ComposedChart
                    data={formattedGoals}
                    margin={{ top: 5, bottom: 5 }}
                    style={{ padding: 6 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="goalName" style={{ fontSize: 12 }} />
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

                    <Bar dataKey="savedAmount" fill="#10B981" barSize={20} />
                    <Bar
                        dataKey="remainingAmount"
                        fill="#a29999"
                        barSize={20}
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    )
}
