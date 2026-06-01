'use client'
import { useState } from 'react'

import BudgetAllocationChart from '@/components/budget/BudgetAllocationChart'
import BudgetSpendingChart from '@/components/budget/BudgetSpendingChart'
import BudgetTable from '@/components/budget/BudgetTable'
import Remaining from '@/components/budget/Remaining'
import TotalBudget from '@/components/budget/TotalBudget'
import TotalSpent from '@/components/budget/TotalSpent'
import DashboardSidebar from '@/components/shared/DashboardSidebar'
import Dropdown from '@/components/shared/Dropdown'
import Header from '@/components/shared/Header'

export default function Budget() {
    const budgetDate = [
        { label: 'January 2026', value: 'jan-2026' },
        { label: 'February 2026', value: 'feb-2026' },
        { label: 'March 2026', value: 'mar-2026' },
    ]
    const [selectedBudgetDate, setSelectedBudgetDate] = useState(
        budgetDate[0].value
    )

    const categories = [
        { label: 'Food', value: 'food' },
        { label: 'Shopping', value: 'shopping' },
        { label: 'Transport', value: 'transport' },
    ]
    const [selectedCategory, setSelectedCategory] = useState(
        categories[0].value
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
                            title="Budget Planner"
                            actions={[
                                {
                                    label: 'Add New Budget',
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
                                        labelText="Select Date"
                                        name="budgetDate"
                                        data={budgetDate}
                                        editable={true}
                                        variant="create"
                                        onChange={(value) =>
                                            setSelectedBudgetDate(value)
                                        }
                                    />
                                </div>
                                <div className="flex-1">
                                    <Dropdown
                                        labelText="Select Category"
                                        name="category"
                                        data={categories}
                                        editable={true}
                                        variant="create"
                                        onChange={(value) =>
                                            setSelectedCategory(value)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex flex-col">
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6">
                                <TotalBudget
                                    selectedDate={selectedBudgetDate}
                                />
                                <TotalSpent />
                                <Remaining />
                            </div>
                            <div className="w-full mb-6">
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
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
