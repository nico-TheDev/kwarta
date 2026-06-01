import { Metadata } from 'next'

import { AppData } from '@/constants/metadata'
import AddTransactions from './AddTransactions'

export const metadata: Metadata = {
    title: `${AppData.appName} | Add Transaction`,
}

export default function page() {
    return (
        <>
            <AddTransactions />
        </>
    )
}
