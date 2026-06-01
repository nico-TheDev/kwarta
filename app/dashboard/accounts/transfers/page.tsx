import { Metadata } from 'next'

import { AppData } from '@/constants/metadata'
import Transfers from './Transfers'

export const metadata: Metadata = {
    title: `${AppData.appName} | Transfers`,
}

export default function page() {
    return (
        <>
            <Transfers />
        </>
    )
}
