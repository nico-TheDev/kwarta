import { Metadata } from 'next'

import { AppData } from '@/constants/metadata'
import AddAccount from './AddAccount'

export const metadata: Metadata = {
    title: `${AppData.appName} | Add Account`,
}

export default function page() {
    return (
        <>
            <AddAccount />
        </>
    )
}
