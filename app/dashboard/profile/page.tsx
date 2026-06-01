import React from 'react'
import { Metadata } from 'next'
import { AppData } from '@/constants/metadata'
import Profile from './Profile'

export const metadata: Metadata = {
    title: `${AppData.appName} | Profile`,
}

export default function page() {
    return (
        <>
            <Profile />
        </>
    )
}
