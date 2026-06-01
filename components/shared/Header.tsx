import React from 'react'

import ButtonText from './ButtonText'

export default function Header({ title, actions = [] }) {
    return (
        <div className="w-full flex items-center justify-between mb-6">
            {/* Title */}
            <h2 className="text-3xl font-bold text-primary">{title}</h2>

            {/* Buttons */}
            {actions.length > 0 && (
                <div className="flex items-center gap-4">
                    {actions.map((action, index) => (
                        <ButtonText
                            key={index}
                            label={action.label}
                            onPress={action.onPress}
                            isBold={action.isBold}
                            variant={action.variant}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
