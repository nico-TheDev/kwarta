import { Metadata } from 'next'

import { AppData } from '@/constants/metadata'
import CreateTransfer from './CreateTransfer'

export const metadata: Metadata = {
    title: `${AppData.appName} | Create Transfer`,
}

export default function page() {
    return (
        <>
            <CreateTransfer />
        </>
    )
}
