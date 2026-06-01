import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function TopExpenses() {
    const mockData = [
        { category_name: 'Food', amount: 12000, color: '#F87171' },
        { category_name: 'Rent', amount: 25000, color: '#60A5FA' },
        { category_name: 'Transport', amount: 5000, color: '#FBBF24' },
        { category_name: 'Shopping', amount: 8000, color: '#A78BFA' },
        { category_name: 'Bills', amount: 6000, color: '#34D399' },
        { category_name: 'Entertainment', amount: 3000, color: '#F97316' },
    ]

    // Top 5 expenses
    const topExpenses = mockData
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 5)
        .map((item) => ({
            name: item.category_name,
            value: item.amount,
            color: item.color,
        }))

    // Chart data
    const chartData = {
        labels: topExpenses.map((d) => d.name),
        datasets: [
            {
                data: topExpenses.map((d) => d.value),
                backgroundColor: topExpenses.map((d) => d.color),
                borderWidth: 1,
            },
        ],
    }

    const options = {
        animation: false,
        cutout: '70%',
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        const value = tooltipItem.raw
                        return `₱${value.toLocaleString('en-PH')}`
                    },
                },
            },
        },
        maintainAspectRatio: false,
        responsive: true,
    }

    return (
        <div className="bg-white shadow rounded-2xl p-6">
            <div className="mb-2">
                <h3 className="text-sm font-bold text-black">Top 5 Expenses</h3>
            </div>

            <hr className="border-gray-200" />

            <div className="flex flex-row gap-4 p-4">
                {/* Chart */}
                <div className="w-48 h-48 flex-none">
                    <Doughnut data={chartData} options={options} />
                </div>

                {/* Legend */}
                <div className="flex flex-col flex-1 gap-2">
                    {topExpenses.map((d) => (
                        <span
                            key={d.name}
                            className="flex items-center gap-2 text-[10px] text-black"
                        >
                            <span
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: d.color }}
                            />
                            {d.name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}
