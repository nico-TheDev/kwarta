import React from 'react'
import { ChromePicker } from 'react-color'

const ColorPicker = ({
    setShowColorWheel,
    selectedColor,
    handleColorSelect,
}) => {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/30"
                onClick={() => setShowColorWheel(false)}
            />

            {/* Picker Container */}
            <div className="relative z-10 shadow-lg rounded-lg">
                <ChromePicker
                    color={selectedColor}
                    onChangeComplete={handleColorSelect}
                />
            </div>
        </div>
    )
}

export default ColorPicker
