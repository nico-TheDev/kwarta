import React from 'react'
import { Metadata } from 'next'
import { AppData } from '@/constants/metadata'
import SavingsGoals from './SavingsGoals'

export const metadata: Metadata = {
    title: `${AppData.appName} | Savings Goals`,
}

export default function page() {
    return (
        <>
            <SavingsGoals />
        </>
    )
}
