'use client'

import React, { useEffect, useState } from 'react'
import {
    Portal,
    Select,
    SelectValueChangeDetails,
    createListCollection,
} from '@chakra-ui/react'

type Option = {
    label: string
    value: string
}

interface DropdownProps {
    labelText?: string
    name: string
    data: Option[]
    errorMessage?: string
    editable?: boolean
    variant?: 'create' | 'update'
    previousSelected?: string
    onChange?: (value: string) => void
    hasPreSelected?: boolean

    // Optional controlled mode
    value?: string
}

export default function Dropdown({
    labelText,
    name,
    data,
    errorMessage,
    editable = true,
    variant = 'create',
    previousSelected,
    onChange,
    value,
    hasPreSelected,
}: DropdownProps) {
    const listOptions = createListCollection({
        items: data,
    })

    const [selectedValue, setSelectedValue] = useState<string>(
        hasPreSelected ? listOptions.items[0].value : ''
    )

    // ✅ Preselect logic (update mode)
    useEffect(() => {
        if (variant === 'update' && previousSelected) {
            const match = data.find(
                (d) =>
                    d.value === previousSelected || d.label === previousSelected
            )
            if (match) {
                setSelectedValue(match.value)
                onChange?.(match.value)
            }
        }
    }, [variant, previousSelected, data])

    // ✅ Controlled support (Formik / external)
    useEffect(() => {
        if (value !== undefined) {
            setSelectedValue(value)
        }
    }, [value])

    const handleChange = (details: SelectValueChangeDetails) => {
        const val = Array.isArray(details.value)
            ? details.value[0]
            : details.value

        setSelectedValue(val)
        onChange?.(val)
    }

    return (
        <div className="flex flex-col mb-6 w-full">
            {/* Label */}
            {labelText && (
                <label className="text-sm text-black font-semibold mb-2">
                    {labelText}
                </label>
            )}

            {/* Chakra Select */}
            <Select.Root
                collection={listOptions}
                size="sm"
                value={[selectedValue]}
                onValueChange={handleChange}
                disabled={!editable}
            >
                <Select.HiddenSelect name={name} />

                <Select.Control
                    className={`bg-white text-black border rounded-lg px-4 py-2 border-2 ${
                        errorMessage ? 'border-red-500' : 'border-black'
                    }`}
                >
                    <Select.Trigger>
                        <Select.ValueText placeholder="Select an option" />
                    </Select.Trigger>

                    <Select.IndicatorGroup>
                        <Select.Indicator />
                    </Select.IndicatorGroup>
                </Select.Control>

                <Portal>
                    <Select.Positioner>
                        <Select.Content className="bg-white text-black border rounded-md shadow-md">
                            {listOptions.items.map((item) => (
                                <Select.Item
                                    item={item}
                                    key={item.value}
                                    className="cursor-pointer px-4 py-2 hover:bg-primary hover:text-white"
                                >
                                    {item.label}
                                    <Select.ItemIndicator className="bg-primary text-white ml-2" />
                                </Select.Item>
                            ))}
                        </Select.Content>
                    </Select.Positioner>
                </Portal>
            </Select.Root>

            {/* Error */}
            {errorMessage && (
                <p className="text-xs text-red-500 mt-1">{errorMessage}</p>
            )}
        </div>
    )
}
