import { Metadata } from 'next'

import { AppData } from '@/constants/metadata'
import AddSavingsGoals from './AddSavingsGoals'

export const metadata: Metadata = {
    title: `${AppData.appName} | Add Savings Goal`,
}

export default function page() {
    return (
        <>
            <AddSavingsGoals />
        </>
    )
}
