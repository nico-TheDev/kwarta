import React from 'react'
import { Metadata } from 'next'
import SignUp from './SignUp'
import { AppData } from '@/constants/metadata'

export const metadata: Metadata = {
    title: `${AppData.appName} | Sign Up`,
}

export default function page() {
    return (
        <>
            <SignUp />
        </>
    )
}
