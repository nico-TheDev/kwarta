import { useEffect, useState } from 'react'

import { colors } from '@/constants/themes'
import { Icon } from './Icons'

export default function IconOnlySelector({
    iconData,
    selectedIcon: externalSelectedIcon,
    onIconClick,
    isEditing = true,
    errorMessage,
}) {
    const [selectedIcon, setSelectedIcon] = useState(null)

    // Sync with external value (controlled support)
    useEffect(() => {
        if (externalSelectedIcon) {
            setSelectedIcon(externalSelectedIcon)
        }
    }, [externalSelectedIcon])

    const handleClick = (icon) => {
        setSelectedIcon(icon) // ✅ internal state
        onIconClick?.(icon) // ✅ notify parent
    }

    return (
        <div className="w-full mb-6">
            {/* Title */}
            <p className="text-[14px] text-black font-semibold mb-2">Icons</p>

            {/* Icon Grid */}
            <div
                className={`
          flex flex-wrap gap-2 w-full justify-between
          ${iconData.length > 8 ? 'max-h-[140px] overflow-y-auto' : ''}
        `}
            >
                {iconData.map((icon) => {
                    const isActive = selectedIcon === icon

                    return (
                        <button
                            key={icon}
                            disabled={!isEditing}
                            onClick={() => handleClick(icon)}
                            className={`
                flex items-center justify-center
                rounded-lg border-2
                w-[60px] h-[60px]
                transition-all
                ${
                    isActive
                        ? 'bg-primary text-white border-primary'
                        : 'bg-transparent text-primary border-primary'
                }
                ${
                    !isEditing
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-primary hover:text-white'
                }
              `}
                        >
                            <Icon
                                name={icon}
                                className="text-[32px]"
                                color={isActive ? colors.white : colors.primary}
                            />
                        </button>
                    )
                })}
            </div>

            {/* Error Message */}
            {errorMessage && (
                <p className="text-xs text-red-500 mt-2">{errorMessage}</p>
            )}
        </div>
    )
}
