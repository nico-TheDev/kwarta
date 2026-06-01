import { Metadata } from 'next'

import { AppData } from '@/constants/metadata'
import Categories from './Categories'

export const metadata: Metadata = {
    title: `${AppData.appName} | Categories`,
}

export default function page() {
    return (
        <>
            <Categories />
        </>
    )
}
