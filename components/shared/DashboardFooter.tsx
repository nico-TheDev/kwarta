import React from 'react'
import { useRouter } from 'nextjs-toploader/app'
import Loader from './Loader'

export default function DashboardFooter() {
    const router = useRouter()
    return (
        <div className="flex flex-col px-6 md:px-20 py-10 bg-primary">
            <div className="w-full flex flex-row items-center mb-4">
                <button
                    className="mr-[50px]"
                    onClick={() => router.push('/privacy-policy?from=footer')}
                >
                    <p className="text-white text-xs">Privacy Policy</p>
                </button>
                <button
                    onClick={() => router.push('/terms-conditions?from=footer')}
                >
                    <p className="text-white text-xs">Terms and Conditions</p>
                </button>
            </div>
            <p className="text-white text-xs">
                &copy; {new Date().getFullYear()} CASH. All Rights Reserved.
            </p>

            <Loader />
        </div>
    )
}
