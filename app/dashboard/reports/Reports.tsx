'use client'

import IncomeExpense from '@/components/reports/IncomeExpense'
import SpendingCategory from '@/components/reports/SpendingCategory'
import TopExpenses from '@/components/reports/TopExpenses'
import DashboardSidebar from '@/components/shared/DashboardSidebar'
import Header from '@/components/shared/Header'

export default function Reports() {
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
                            title="Reports"
                            actions={[
                                {
                                    label: 'Export',
                                    onPress: () => {},
                                    isBold: true,
                                    variant: 'default',
                                },
                            ]}
                        />
                        <div className="grid grid-cols-2 sm:grid-cols-6 gap-6 mb-6">
                            <div className="col-span-2 sm:col-span-3 flex flex-col gap-4">
                                <IncomeExpense />
                            </div>
                            <div className="col-span-2 sm:col-span-3 flex flex-col gap-4">
                                <SpendingCategory />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-6 gap-6 mb-6">
                            <div className="col-span-2 sm:col-span-3 flex flex-col gap-4">
                                <TopExpenses />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
