import React from 'react'
import { Icon } from './Icons'

export default function IconSelector({ iconList }) {
    return iconList.map((tag) => {
        return (
            <div
                key={tag.name}
                onClick={() => onSelect?.(tag)} // optional handler
                className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors"
            >
                {/* Icon */}
                <div className="flex items-center justify-center text-lg">
                    <Icon name={tag.icon} />
                </div>

                {/* Text */}
                <span className="text-sm text-black">{tag.name}</span>
            </div>
        )
    })
}
