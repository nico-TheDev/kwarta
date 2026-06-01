import React from 'react'
import { Metadata } from 'next'
import Login from './Login'
import { AppData } from '@/constants/metadata'

export const metadata: Metadata = {
    title: `${AppData.appName} | Login`,
}

export default function page() {
    return (
        <>
            <Login />
        </>
    )
}
