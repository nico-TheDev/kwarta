import React from 'react'
import { LoaderCircle } from 'lucide-react'

import useLoaderStore from '@/stores/useLoaderStore'

const Loader = () => {
    const { isLoading } = useLoaderStore()

    if (!isLoading) return null // Don't render if not loading

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[#1a1717]/70 z-[9999]">
            <div className="flex items-center justify-center w-12 h-12 animate-spin text-[100px]">
                <LoaderCircle className="text-tertiary" size={500} />
            </div>
        </div>
    )
}

export default Loader
