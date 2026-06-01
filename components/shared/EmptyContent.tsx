import React from 'react'

type EmptyContentProps = {
    icon?: React.ReactNode
    header?: string
    subheader?: string
}

export default function EmptyContent({
    icon,
    header = 'No Data Found',
    subheader = 'There is nothing to display at the moment.',
}: EmptyContentProps) {
    return (
        <div className="w-full flex flex-col items-center justify-center text-center py-16">
            {/* Icon */}
            {icon && <div className="mb-4 text-primary text-5xl">{icon}</div>}

            {/* Header */}
            <h3 className="text-2xl font-bold text-gray-900">{header}</h3>

            {/* Subheader */}
            <p className="text-md mt-2 text-gray-500 max-w-lg">{subheader}</p>
        </div>
    )
}
