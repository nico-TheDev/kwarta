import React, { ChangeEvent, useEffect, useState } from 'react'
import { useField } from 'formik'

interface InputProps {
    labelText?: string
    placeholderText: string
    variant?: string
    id: string
    name: string
    value: string
    onChangeInput: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void // Event handler for input changes
    errorMessage?: string | undefined
    editable?: boolean
}

export default function TextInput({
    labelText,
    placeholderText,
    variant = 'default',
    id,
    name,
    value,
    onChangeInput,
    errorMessage,
    editable = true,
}: InputProps) {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="flex-col mb-[20px]">
            <label
                htmlFor={id}
                className="text-[14px] text-black font-semibold"
            >
                {labelText}
            </label>
            <div
                className={`w-full border-2 p-4 rounded-[10px] bg-white-50 flex ${
                    variant === 'footer' ? 'border-white' : 'border-black'
                } ${variant === 'contactNumber' ? 'flex-col' : 'flex-row'}`}
            >
                {variant === 'paragraph' ? (
                    <textarea
                        id={id}
                        name={name}
                        value={value}
                        placeholder={placeholderText}
                        onChange={onChangeInput}
                        className="w-full h-[150px] p-4 bg-transparent outline-none rounded-3xl text-black"
                    ></textarea>
                ) : variant === 'contactNumber' ? (
                    <>
                        <span className="flex items-center px-2 text-black border-r border-black">
                            +63
                        </span>
                        <input
                            type="text"
                            id={id}
                            name={name}
                            value={value}
                            placeholder={placeholderText}
                            maxLength={10}
                            onChange={onChangeInput}
                            className={`w-full bg-transparent outline-none text-black ${
                                variant === 'contactNumber' ? 'pl-2' : ''
                            }`}
                        />
                    </>
                ) : variant === 'password' ? (
                    <div className="relative w-full">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id={id}
                            name={name}
                            value={value}
                            placeholder={placeholderText}
                            onChange={onChangeInput}
                            className="w-full bg-transparent outline-none text-black pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-black hover:text-black"
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                ) : variant === 'number' ? (
                    <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        id={id}
                        name={name}
                        value={value}
                        placeholder={placeholderText}
                        // maxLength={4}
                        onChange={(e) => {
                            // Only allow numeric characters
                            const numericValue = e.target.value.replace(
                                /[^0-9]/g,
                                ''
                            )
                            // Create a new event with the filtered value, preserving id and name for Formik
                            const syntheticEvent = {
                                ...e,
                                target: {
                                    ...e.target,
                                    id,
                                    name,
                                    value: numericValue,
                                },
                            } as React.ChangeEvent<HTMLInputElement>
                            onChangeInput(syntheticEvent)
                        }}
                        className="w-full bg-transparent outline-none text-black"
                    />
                ) : variant === 'amount' ? (
                    <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        id={id}
                        name={name}
                        value={value}
                        placeholder={placeholderText}
                        onChange={(e) => {
                            // Only allow numeric characters
                            const numericValue = e.target.value.replace(
                                /[^0-9]/g,
                                ''
                            )
                            // Create a new event with the filtered value, preserving id and name for Formik
                            const syntheticEvent = {
                                ...e,
                                target: {
                                    ...e.target,
                                    id,
                                    name,
                                    value: numericValue,
                                },
                            } as React.ChangeEvent<HTMLInputElement>
                            onChangeInput(syntheticEvent)
                        }}
                        className="w-full bg-transparent outline-none text-black"
                    />
                ) : (
                    <input
                        type="text"
                        id={id}
                        name={name}
                        value={value}
                        placeholder={placeholderText}
                        onChange={onChangeInput}
                        className="w-full bg-transparent outline-none text-black"
                        disabled={!editable}
                    />
                )}
            </div>
            <label className="font-semibold text-[14px] text-red-500">
                {errorMessage}
            </label>
        </div>
    )
}
