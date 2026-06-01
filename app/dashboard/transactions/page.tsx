import { Metadata } from 'next'

import { AppData } from '@/constants/metadata'
import Transactions from './Transactions'

export const metadata: Metadata = {
    title: `${AppData.appName} | Transactions`,
}

export default function page() {
    return (
        <>
            <Transactions />
        </>
    )
}
