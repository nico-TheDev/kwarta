'use client'

import { useState } from 'react'

import GoalItem from '@/components/savings-goals/GoalItem'
import GoalProgressChart from '@/components/savings-goals/GoalProgressChart'
import GoalsChart from '@/components/savings-goals/GoalsChart'
import DashboardSidebar from '@/components/shared/DashboardSidebar'
import Dropdown from '@/components/shared/Dropdown'
import Header from '@/components/shared/Header'

export default function SavingsGoals() {
    // sample data
    const goals = [
        {
            id: '1',
            goalName: 'Emergency Fund',
            goalTarget: 50000,
            goalSaved: 32000,
        },
        {
            id: '2',
            goalName: 'Travel Fund (Japan)',
            goalTarget: 80000,
            goalSaved: 45000,
        },
        {
            id: '3',
            goalName: 'New Laptop',
            goalTarget: 70000,
            goalSaved: 70000,
        },
        {
            id: '4',
            goalName: 'Wedding Fund',
            goalTarget: 150000,
            goalSaved: 90000,
        },
        {
            id: '5',
            goalName: 'Car Downpayment',
            goalTarget: 200000,
            goalSaved: 120000,
        },
    ]

    const status = [
        { label: 'Completed', value: 'completed' },
        { label: 'Ongoing', value: 'ongoing' },
    ]
    const [selectedStatus, setSelectedStatus] = useState(status[0].value)

    const generateMonthOptions = (count = 5) => {
        const today = new Date()

        return Array.from({ length: count }, (_, i) => {
            const date = new Date(today.getFullYear(), today.getMonth() + i, 1)

            const label = date.toLocaleString('en-US', {
                month: 'long',
                year: 'numeric',
            })

            const value = date.toISOString().slice(0, 7) // YYYY-MM

            return { label, value }
        })
    }

    const timePeriod = generateMonthOptions(5)
    const [selectedTimePeriod, setSelectedTimePeriod] = useState(
        timePeriod[0].value
    )

    return (
        <div className="w-full flex flex-row">
            <DashboardSidebar />
            <div className="relative w-full h-full bg-white">
                <section
                    id="hero"
                    className="w-full bg-white flex flex-col items-center justify-center px-10 mt-[60px]"
                >
                    <div className="relative flex-1 w-full p-8">
                        <Header
                            title="Savings Goals"
                            actions={[
                                {
                                    label: 'Add Goal',
                                    onPress: () => {},
                                    isBold: true,
                                    variant: 'default',
                                },
                            ]}
                        />
                        <div className="w-full flex items-start justify-start">
                            <div className="flex flex-row gap-2 w-full max-w-2xl">
                                <div className="flex-1">
                                    <Dropdown
                                        labelText="Select Status"
                                        name="status"
                                        data={status}
                                        editable={true}
                                        variant="create"
                                        onChange={(value) =>
                                            setSelectedStatus(value)
                                        }
                                    />
                                </div>
                                <div className="flex-1">
                                    <Dropdown
                                        labelText="Select Time Period"
                                        name="timePeriod"
                                        data={timePeriod}
                                        editable={true}
                                        variant="create"
                                        onChange={(value) =>
                                            setSelectedTimePeriod(value)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex flex-col">
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-6">
                                {goals?.map((item) => (
                                    <GoalItem
                                        key={item.id}
                                        goalName={item.goalName}
                                        goalTarget={item.goalTarget}
                                        goalSaved={item.goalSaved}
                                    />
                                ))}
                            </div>
                            <h2 className="text-2xl font-bold text-primary mb-6">
                                Goal Progress Overview
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-6 gap-6 mb-6">
                                <div className="col-span-2 sm:col-span-3 flex flex-col gap-4">
                                    <GoalProgressChart data={goals} />
                                </div>
                                <div className="col-span-2 sm:col-span-3 flex flex-col gap-4">
                                    <GoalsChart data={goals} />
                                </div>
                            </div>
                            {/* <div className="w-full mb-6">
                                <BudgetTable />
                            </div>
                            <h2 className="text-2xl font-bold text-primary mb-6">
                                Budget Insights
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-6 gap-6 mb-6">
                                <div className="col-span-2 sm:col-span-3 flex flex-col gap-4">
                                    <BudgetSpendingChart />
                                </div>
                                <div className="col-span-2 sm:col-span-3 flex flex-col gap-4">
                                    <BudgetAllocationChart />
                                </div>
                            </div> */}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
