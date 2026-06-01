import React from 'react'

export default function LandingPageFooter() {
    return (
        <div className="flex flex-col px-6 md:px-20 py-10 bg-primary">
            <p className="text-md text-white font-bold mb-4">
                CASH: Financial Monitoring Application
            </p>
            <p className="text-white text-xs">
                &copy; {new Date().getFullYear()} CASH. All Rights Reserved.
            </p>
        </div>
    )
}
