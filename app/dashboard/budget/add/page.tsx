import { Metadata } from 'next'

import { AppData } from '@/constants/metadata'
import AddBudget from './AddBudget'

export const metadata: Metadata = {
    title: `${AppData.appName} | Add New Budget`,
}

export default function page() {
    return (
        <>
            <AddBudget />
        </>
    )
}
