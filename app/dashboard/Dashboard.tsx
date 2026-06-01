'use client'

import React from 'react'

import ButtonText from '@/components/shared/ButtonText'
import DashboardSidebar from '@/components/shared/DashboardSidebar'
import Balance from '@/components/dashboard/Balance'
import Inflation from '@/components/dashboard/Inflation'
import Expenses from '@/components/dashboard/Expenses'
import Income from '@/components/dashboard/Income'
import SavingsPanel from '@/components/dashboard/SavingsPanel'
import InvestmentsPanel from '@/components/dashboard/InvestmentsPanel'
import Cashflow from '@/components/dashboard/Cashflow'
import ExpensesChart from '@/components/dashboard/ExpensesChart'
import TransactionHistory from '@/components/dashboard/TransactionHistory'
import NewsPanel from '@/components/dashboard/NewsPanel'

export default function Dashboard() {
    return (
        <div className="w-full flex flex-row">
            <DashboardSidebar />
            <div className="relative w-full h-full bg-white">
                <section
                    id="hero"
                    className="w-full bg-white flex flex-col items-center justify-center px-10 mt-[60px]"
                >
                    <div className="relative flex-1 w-full p-8">
                        {/* <div className="w-full flex justify-end items-end">
                            <ButtonText
                                label="Add Transaction"
                                onPress={() => {}}
                                isBold={true}
                            />
                        </div> */}

                        <div className="flex-1 py-8">
                            <div className="w-full">
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6">
                                    <Income />
                                    <Expenses />
                                    <SavingsPanel />
                                    <InvestmentsPanel />
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-6 gap-6 mb-6">
                                    {/* Balance: larger width */}
                                    <div className="col-span-2 sm:col-span-4 flex flex-col gap-4">
                                        <Balance className="dashboard_step_one" />
                                    </div>

                                    {/* Inflation: smaller width */}
                                    <div className="col-span-2 sm:col-span-2 flex flex-col gap-4">
                                        <Inflation className="dashboard_step_four" />
                                    </div>
                                </div>
                                <h2 className="text-2xl font-bold text-primary mb-6">
                                    Spending Overview
                                </h2>
                                <div className="grid grid-cols-2 sm:grid-cols-6 gap-6 mb-6">
                                    {/* Balance chart */}
                                    <div className="col-span-2 sm:col-span-3 flex flex-col gap-4">
                                        <Cashflow className="dashboard_step_five" />
                                    </div>

                                    {/* Inflation chart */}
                                    <div className="col-span-2 sm:col-span-3 flex flex-col gap-4">
                                        <ExpensesChart className="h-full dashboard_step_six" />
                                    </div>
                                </div>
                                <div className="w-full mb-6">
                                    <TransactionHistory className="h-full dashboard_step_seven" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
