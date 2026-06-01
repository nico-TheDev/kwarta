import React from 'react'
import { Metadata } from 'next'
import { AppData } from '@/constants/metadata'
import Accounts from './Accounts'

export const metadata: Metadata = {
    title: `${AppData.appName} | Accounts`,
}

export default function page() {
    return (
        <>
            <Accounts />
        </>
    )
}
