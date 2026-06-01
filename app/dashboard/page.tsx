import React from 'react'
import { Metadata } from 'next'
import { AppData } from '@/constants/metadata'
import Dashboard from './Dashboard'

export const metadata: Metadata = {
    title: `${AppData.appName} | Dashboard`,
}

export default function page() {
    return (
        <>
            <Dashboard />
        </>
    )
}
