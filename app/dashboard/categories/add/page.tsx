import { Metadata } from 'next'

import { AppData } from '@/constants/metadata'
import AddCategory from './AddCategory'

export const metadata: Metadata = {
    title: `${AppData.appName} | Add Category`,
}

export default function page() {
    return (
        <>
            <AddCategory />
        </>
    )
}
