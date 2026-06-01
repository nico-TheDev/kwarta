import { Metadata } from 'next'

import { AppData } from '@/constants/metadata'
import Budget from './Budget'

export const metadata: Metadata = {
    title: `${AppData.appName} | Budget`,
}

export default function page() {
    return (
        <>
            <Budget />
        </>
    )
}
