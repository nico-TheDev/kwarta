'use client'

import { useEffect, useState } from 'react'

// import { API_URL, WEBSOCKET_API_URL } from '@/constants/api'
import DashboardNavbar from '@/components/shared/DashboardNavbar'
import Loader from '@/components/shared/Loader'
import Footer from '@/components/shared/DashboardFooter'
import useUserStore from '@/stores/useUserStore'
import useLoaderStore from '@/stores/useLoaderStore'
import Link from 'next/link'
import DashboardSidebar from '@/components/shared/DashboardSidebar'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { showLoader, hideLoader } = useLoaderStore()

    return (
        <div
            className="min-h-screen bg-gray-50 transition-all duration-300"
            // style={{ paddingTop: totalOffset }}
        >
            {/* Navbar at the top */}
            <DashboardNavbar
                startLoading={() => {}}
                stopLoading={() => {}}
                isStatusBarVisible={true}
            />

            <div>{children}</div>

            <Footer />

            <Loader />
        </div>
    )
}
