'use client'

import React, { useRef } from 'react'
import { FaImage } from 'react-icons/fa'

export default function CommentInput({
    labelText = 'Comment',
    placeholder = 'Enter comment',
    values,
    handleChange,
    selectedFile,
    setSelectedFile,
    isEditing = true,
    comments,
    variant = 'default',
}: any) {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const hasSelectedFile = useRef(false)

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (file) {
            hasSelectedFile.current = true
            const fileSrc = URL.createObjectURL(file)
            setSelectedFile({ source: fileSrc, file })
        }

        focusBack()
    }

    const handleFileClick = () => {
        hasSelectedFile.current = false
        window.addEventListener('focus', focusBack)
    }

    const focusBack = () => {
        if (!hasSelectedFile.current) {
            setSelectedFile(null)
            if (inputRef.current) {
                inputRef.current.value = ''
            }
        }

        window.removeEventListener('focus', focusBack)
    }

    return (
        <div className="w-full">
            {/* Title */}
            <p className="text-sm text-black font-semibold mb-2">{labelText}</p>

            <div className="flex flex-row items-stretch w-full gap-2">
                {/* Textarea (bigger space) */}
                <textarea
                    id="comments"
                    name="comments"
                    rows={6}
                    placeholder={placeholder}
                    className="flex-[2] border-2 border-black rounded-lg p-3 outline-none bg-transparent text-black resize-none"
                    value={values?.comments}
                    onChange={handleChange}
                    disabled={!isEditing}
                    defaultValue={comments}
                />

                {/* Upload Button (smaller) */}
                {variant === 'default' ? (
                    <>
                        <label
                            className={`
        flex-[1]
        relative flex items-center justify-center
        bg-primary text-white rounded-lg cursor-pointer overflow-hidden
        h-auto min-h-[150px]
        ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}
      `}
                        >
                            {/* Preview Image */}
                            {selectedFile?.source ? (
                                <img
                                    src={selectedFile.source}
                                    alt="preview"
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            ) : (
                                <FaImage size={60} />
                            )}

                            {/* Hidden Input */}
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                ref={inputRef}
                                onChange={handleFileSelect}
                                onClick={handleFileClick}
                                disabled={!isEditing}
                            />
                        </label>
                    </>
                ) : null}
            </div>
        </div>
    )
}
