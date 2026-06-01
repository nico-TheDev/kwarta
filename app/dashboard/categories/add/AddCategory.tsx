'use client'

import { Form, Formik } from 'formik'
import { useRouter } from 'nextjs-toploader/app'
import { useState } from 'react'
import * as Yup from 'yup'

import ButtonText from '@/components/shared/ButtonText'
import ColorPicker from '@/components/shared/ColorLibrary/ColorPicker'
import ColorPickerPanel from '@/components/shared/ColorLibrary/ColorPickerPanel'
import Dropdown from '@/components/shared/Dropdown'
import FormHeader from '@/components/shared/FormHeader'
import IconOnlySelector from '@/components/shared/IconLibrary/IconOnlySelector'
import Loader from '@/components/shared/Loader'
import TextInput from '@/components/shared/TextInput'
import { ICON_NAMES } from '@/constants/icons'
import { colorCollection } from '@/constants/mockData'
import useLoaderStore from '@/stores/useLoaderStore'
import { AddCategoryTypes } from '@/types/types'

export default function AddCategory() {
    const router = useRouter()

    const { showLoader, hideLoader } = useLoaderStore()

    // sample data
    const categoryTypes = [
        { label: 'Expense', value: 'expense' },
        { label: 'Income', value: 'income' },
        { label: 'Savings', value: 'savings' },
        { label: 'Investments', value: 'investments' },
    ]
    const expenseTypes = [
        { label: 'Needs', value: 'needs' },
        { label: 'Wants', value: 'wants' },
    ]

    // form states
    const [selectedCategoryType, setSelectedCategoryType] = useState<string>(
        categoryTypes[0].value
    )
    const [selectedExpenseType, setSelectedExpenseType] = useState<string>(
        expenseTypes[0].value
    )
    const [selectedIcon, setSelectedIcon] = useState(null)
    const [showColorWheel, setShowColorWheel] = useState(false)
    const [selectedColor, setSelectedColor] = useState('')

    const handleColorClick = (color) => {
        setSelectedColor(color)
        setShowColorWheel(false)
    }

    const handleColorSelect = (color) => {
        setSelectedColor(color.hex)
    }

    const handleIconClick = (icon) => {
        setSelectedIcon(icon)
    }

    const [errorMessages, setErrorMessages] = useState<{
        categoryType: string | undefined
        expenseType: string | undefined
        color: string | undefined
        icon: string | undefined
    }>({
        categoryType: undefined,
        expenseType: undefined,
        color: undefined,
        icon: undefined,
    })

    const initialValues: AddCategoryTypes = {
        categoryName: '',
    }

    const handleSubmit = () => {}

    const validationSchema = Yup.object().shape({
        categoryName: Yup.string().required('Category Name is required'),
    })

    return (
        <div className="relative w-full h-full bg-white">
            <section
                id="hero"
                className="w-full bg-white flex flex-col items-center justify-center px-10 mt-[60px]"
            >
                <div className="relative flex-1 w-full p-8">
                    <FormHeader
                        title="Add Category"
                        onClick={() => router.push('/dashboard/categories')}
                    />
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            setFieldValue,
                        }) => (
                            <Form className="w-full max-w-md mx-auto">
                                <TextInput
                                    labelText="Category Name"
                                    placeholderText="Enter category name"
                                    id="categoryName"
                                    name="categoryName"
                                    value={values.categoryName}
                                    onChangeInput={handleChange}
                                    errorMessage={
                                        touched.categoryName &&
                                        errors.categoryName
                                            ? errors.categoryName
                                            : undefined
                                    }
                                />

                                <Dropdown
                                    labelText="Category Type"
                                    name="selectedCategoryType"
                                    data={categoryTypes}
                                    errorMessage={
                                        errorMessages.categoryType
                                            ? errorMessages.categoryType
                                            : undefined
                                    }
                                    editable={true}
                                    variant="create"
                                    onChange={(value) =>
                                        setSelectedCategoryType(value)
                                    }
                                />
                                {selectedCategoryType?.value === 'expense' ? (
                                    <Dropdown
                                        labelText="Expense Type"
                                        name="selectedExpenseType"
                                        data={expenseTypes}
                                        errorMessage={
                                            errorMessages.expenseType
                                                ? errorMessages.expenseType
                                                : undefined
                                        }
                                        editable={true}
                                        variant="create"
                                        onChange={(value) =>
                                            setSelectedExpenseType(value)
                                        }
                                    />
                                ) : null}
                                <ColorPickerPanel
                                    colorList={colorCollection}
                                    onColorPress={handleColorClick}
                                    selectedColor={selectedColor}
                                    setShowColorWheel={setShowColorWheel}
                                    errorMessage={errorMessages.color}
                                />
                                {showColorWheel && (
                                    <ColorPicker
                                        handleColorSelect={handleColorSelect}
                                        setShowColorWheel={setShowColorWheel}
                                        selectedColor={selectedColor}
                                    />
                                )}
                                <IconOnlySelector
                                    iconData={Object.values(
                                        ICON_NAMES.CATEGORY_ICONS
                                    )}
                                    onIconClick={handleIconClick}
                                    selectedIcon={selectedIcon}
                                    errorMessage={errorMessages.icon}
                                />
                                <div className="w-full flex my-6">
                                    <div className="w-full">
                                        <ButtonText
                                            label="Submit"
                                            onPress={() => {}}
                                            isBold={true}
                                        />
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </section>
            <Loader />
        </div>
    )
}
