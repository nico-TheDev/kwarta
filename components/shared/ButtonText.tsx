import React from 'react'

type ButtonVariant = 'default' | 'outline'
type ContentVariant = 'text' | 'text-with-icon'

type ButtonTextProps = {
    label: string
    onPress: () => void
    width?: string
    isBold?: boolean
    variant?: ButtonVariant
    contentVariant?: ContentVariant
    icon?: React.ReactNode // required only if text-with-icon (we’ll enforce manually)
}

export default function ButtonText({
    label,
    onPress,
    width = '100%',
    isBold = false,
    variant = 'default',
    contentVariant = 'text',
    icon,
}: ButtonTextProps) {
    const baseStyles =
        'flex items-center justify-center gap-2 p-4 rounded-lg text-lg cursor-pointer transition-all whitespace-nowrap'

    const variantStyles = {
        default: 'bg-primary text-white hover:bg-primary/90',
        outline: 'border-2 border-primary text-primary bg-transparent',
    }

    return (
        <div className="my-4 w-full" style={{ width: width ?? '100%' }}>
            <button
                onClick={onPress}
                className={`w-full ${baseStyles} ${variantStyles[variant]} ${
                    isBold ? 'font-bold' : ''
                }`}
            >
                {contentVariant === 'text-with-icon' && icon && (
                    <span className="flex items-center">{icon}</span>
                )}

                <span>{label}</span>
            </button>
        </div>
    )
}
