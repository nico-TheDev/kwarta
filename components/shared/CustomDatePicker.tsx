import React from 'react'
import { FaCalendarAlt } from 'react-icons/fa'
import { DatePicker } from 'antd'

export default function CustomDatePicker({
    labelText,
    onChangeDate,
    errorMessage,
}) {
    return (
        <div className="flex flex-col mb-6 w-full">
            {labelText && (
                <label className="text-sm text-black font-semibold mb-2">
                    {labelText}
                </label>
            )}
            <div
                className={`w-full border-2 border-black bg-white-50 rounded-md flex-1 flex-row items-center justify-between`}
            >
                <div className="flex-1">
                    <DatePicker
                        onChange={onChangeDate}
                        className="w-full text-sm p-4 text-black"
                    />
                </div>
            </div>
            {/* Error */}
            {errorMessage && (
                <p className="text-xs text-red-500 mt-1">{errorMessage}</p>
            )}
        </div>
    )
}
