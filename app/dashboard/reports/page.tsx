import React from 'react'
import { Metadata } from 'next'
import { AppData } from '@/constants/metadata'
import Reports from './Reports'

export const metadata: Metadata = {
    title: `${AppData.appName} | Reports`,
}

export default function page() {
    return (
        <>
            <Reports />
        </>
    )
}
