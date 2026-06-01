import React, { useEffect, useState } from 'react'
import { MdBarChart, MdTrendingDown, MdTrendingUp } from 'react-icons/md'

const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
]

export default function Inflation(props) {
    const [inflationData, setInflationData] = useState('')
    const [percentage, setPercentage] = useState('')

    useEffect(() => {
        function getMockInflationData() {
            const monthNames = [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
            ]

            const date = new Date()

            // handle edge case for January / February
            const currentMonthIndex = date.getMonth()
            const prevMonthIndex = (currentMonthIndex - 1 + 12) % 12
            const prevPrevMonthIndex = (currentMonthIndex - 2 + 12) % 12

            const currentMonth = monthNames[prevMonthIndex]
            const prevMonth = monthNames[prevPrevMonthIndex]

            // ✅ MOCK DATA
            const mockRates = [
                { month: currentMonth, rate: '3.5%' },
                { month: prevMonth, rate: '2.8%' },
            ]

            const prevRate = mockRates?.find((item) => item.month === prevMonth)
            const currentRate = mockRates?.find(
                (item) => item.month === currentMonth
            )

            const diff =
                parseFloat(currentRate?.rate || '0') -
                parseFloat(prevRate?.rate || '0')

            const roundedDiff = Math.round((diff + Number.EPSILON) * 100) / 100

            const hasIncreased = diff > 0

            const currentPercentage = {
                difference: Math.abs(roundedDiff),
                hasIncreased,
            }

            setInflationData(currentRate)
            setPercentage(currentPercentage)
        }

        getMockInflationData()
    }, [])

    return (
        <div className="bg-white rounded-2xl shadow p-6 h-full">
            {/* TOP SECTION */}
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-xs text-black mb-1">Inflation Rate</p>

                    <h2 className="text-3xl font-bold whitespace-nowrap text-primary">
                        {inflationData ? (
                            inflationData?.rate || inflationData?.prevRate
                        ) : (
                            <span className="text-sm text-gray-400">
                                Loading...
                            </span>
                        )}
                    </h2>
                </div>

                {/* Avatar */}
                {/* <div
                    // title={getLanguage(currentLanguage).tooltipInflationRate}
                    title="Inflation Rate"
                    className="w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center text-white"
                >
                    <MdBarChart size={20} />
                </div> */}
            </div>

            {/* BOTTOM SECTION */}
            <div className="flex items-center pt-4">
                {percentage?.hasIncreased ? (
                    <span
                        // title={
                        //     getLanguage(currentLanguage).tooltipInflationLower
                        // }
                        title="Inflation Lower"
                        className="text-green-500"
                    >
                        <MdTrendingDown />
                    </span>
                ) : (
                    <span
                        // title={
                        //     getLanguage(currentLanguage).tooltipInflationHigher
                        // }
                        title="Inflation Higher"
                        className="text-red-500"
                    >
                        <MdTrendingUp />
                    </span>
                )}

                <span className="ml-2 text-sm text-black mr-2">
                    {percentage?.difference}%
                </span>

                {/* <span className="text-xs text-gray-500">
                    {getLanguage(currentLanguage).sinceLastMonth}
                </span> */}
            </div>

            {/* SOURCE */}
            <a
                href="https://tradingeconomics.com/philippines/inflation-cpi"
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-2"
            >
                <span className="text-xs text-black">
                    Source: Trading Economics
                </span>
            </a>
        </div>
    )
}
