import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function GoalsChart({ data }) {
    // Compute progress totals
    const progressData = [
        {
            name: 'Ongoing',
            value: data
                ?.filter((goal) => goal.goalSaved < goal.goalTarget)
                ?.reduce((sum, goal) => sum + goal.goalSaved, 0),
        },
        {
            name: 'Completed',
            value: data
                ?.filter((goal) => goal.goalSaved >= goal.goalTarget)
                ?.reduce((sum, goal) => sum + goal.goalSaved, 0),
        },
    ]

    // Prepare Chart.js data
    const chartData = {
        labels: progressData.map((d) => d.name),
        datasets: [
            {
                data: progressData.map((d) => d.value),
                backgroundColor: ['#6EE7B7', '#059669'],
                borderWidth: 1,
            },
        ],
    }

    const options = {
        animation: false,
        cutout: '80%',
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
                backgroundColor: '#f9fafb',
                titleColor: '#111827',
                bodyColor: '#6b7280',
                borderColor: '#d1d5db',
                borderWidth: 1,
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
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-bold text-black">
                    Completed vs Ongoing Goals
                </h3>
            </div>
            <hr className="border-gray-200" />
            <div className="flex flex-row gap-4 p-4">
                {/* Doughnut chart */}
                <div className="flex-none w-48 h-48 relative">
                    <Doughnut data={chartData} options={options} />
                </div>

                {/* Category list */}
                <div className="flex flex-col flex-1 gap-2 items-start">
                    {progressData.map((d, index) => (
                        <span
                            key={d.name}
                            className="flex items-center gap-1 text-[10px] text-black mt-1"
                        >
                            {/* Colored bullet */}
                            <span
                                className="w-2 h-2 rounded-full"
                                style={{
                                    backgroundColor:
                                        index === 0 ? '#6EE7B7' : '#059669', // match chart colors
                                }}
                            ></span>
                            {d.name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}
