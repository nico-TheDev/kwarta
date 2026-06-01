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
import { AddAccountTypes } from '@/types/types'

export default function AddAccount() {
    const router = useRouter()

    const { showLoader, hideLoader } = useLoaderStore()

    // sample data
    const accountTypes = [
        { label: 'Cash on Hand', value: 'cash-on-hand' },
        { label: 'E-Wallet', value: 'e-wallet' },
        { label: 'Personal Savings Account', value: 'personal-savings' },
        { label: 'Business Savings Account', value: 'business-savings' },
        { label: 'Investment Account', value: 'investment-account' },
    ]

    // form states
    const [selectedAccountType, setSelectedAccountType] = useState<string>(
        accountTypes[0].value
    )
    const [selectedIcon, setSelectedIcon] = useState(null)
    const [showColorWheel, setShowColorWheel] = useState(false)
    const [selectedColor, setSelectedColor] = useState('')

    const handleColorClick = (color) => {
        setSelectedColor(color)
        setShowColorWheel(false)
    }

    const handleColorSelect = (color) => {
        const hex = color?.hex
        if (!hex) return

        setSelectedColor(hex)
    }

    const handleIconClick = (icon) => {
        setSelectedIcon(icon)
    }

    const [errorMessages, setErrorMessages] = useState<{
        accountType: string | undefined
        color: string | undefined
        icon: string | undefined
    }>({
        accountType: undefined,
        color: undefined,
        icon: undefined,
    })

    const initialValues: AddAccountTypes = {
        accountName: '',
        accountAmount: '',
        accountDescription: '',
    }

    const handleSubmit = () => {}

    const validationSchema = Yup.object().shape({
        accountName: Yup.string().required('Account Name is required'),
        accountAmount: Yup.string()
            .required('Account Amount is required')
            .matches(/^\d+(\.\d+)?$/, 'Amount must be a valid number'),
    })

    return (
        <div className="relative w-full h-full bg-white">
            <section
                id="hero"
                className="w-full bg-white flex flex-col items-center justify-center px-10 mt-[60px]"
            >
                <div className="relative flex-1 w-full p-8">
                    <FormHeader
                        title="Add Account"
                        onClick={() => router.push('/dashboard/accounts')}
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
                                    labelText="Account Name"
                                    placeholderText="Enter account name"
                                    id="accountName"
                                    name="accountName"
                                    value={values.accountName}
                                    onChangeInput={handleChange}
                                    errorMessage={
                                        touched.accountName &&
                                        errors.accountName
                                            ? errors.accountName
                                            : undefined
                                    }
                                />
                                <TextInput
                                    labelText="Account Amount"
                                    placeholderText="Enter amount"
                                    variant="number"
                                    id="accountAmount"
                                    name="accountAmount"
                                    value={values.accountAmount}
                                    onChangeInput={handleChange}
                                    errorMessage={
                                        touched.accountAmount &&
                                        errors.accountAmount
                                            ? errors.accountAmount
                                            : undefined
                                    }
                                />
                                <Dropdown
                                    labelText="Account Type"
                                    name="accountType"
                                    data={accountTypes}
                                    errorMessage={
                                        errorMessages.accountType
                                            ? errorMessages.accountType
                                            : undefined
                                    }
                                    editable={true}
                                    variant="create"
                                    onChange={(value) =>
                                        setSelectedAccountType(value)
                                    }
                                />
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
                                        ICON_NAMES.ACCOUNT_ICONS
                                    )}
                                    onIconClick={handleIconClick}
                                    selectedIcon={selectedIcon}
                                    errorMessage={errorMessages.icon}
                                />
                                <TextInput
                                    labelText="Account Description"
                                    placeholderText="Enter description"
                                    variant="paragraph"
                                    id="accountDescription"
                                    name="accountDescription"
                                    value={values.accountDescription}
                                    onChangeInput={handleChange}
                                    errorMessage={
                                        touched.accountDescription &&
                                        errors.accountDescription
                                            ? errors.accountDescription
                                            : undefined
                                    }
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
