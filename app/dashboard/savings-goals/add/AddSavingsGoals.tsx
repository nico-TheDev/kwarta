'use client'

import { Form, Formik } from 'formik'
import { useRouter } from 'nextjs-toploader/app'
import { useState } from 'react'
import * as Yup from 'yup'

import ButtonText from '@/components/shared/ButtonText'
import CustomDatePicker from '@/components/shared/CustomDatePicker'
import Dropdown from '@/components/shared/Dropdown'
import FormHeader from '@/components/shared/FormHeader'
import Loader from '@/components/shared/Loader'
import TextInput from '@/components/shared/TextInput'
import useLoaderStore from '@/stores/useLoaderStore'
import { AddSavingsGoalTypes } from '@/types/types'
import { DatePickerProps } from 'antd'

export default function AddSavingsGoals() {
    const router = useRouter()

    const { showLoader, hideLoader } = useLoaderStore()

    // sample data
    const categories = [
        { label: 'Food', value: 'food' },
        { label: 'Transportation', value: 'transportation' },
        { label: 'Bills', value: 'bills' },
        { label: 'Shopping', value: 'shopping' },
        { label: 'Entertainment', value: 'entertainment' },
    ]
    const status = [
        { label: 'Ongoing', value: 'ongoing' },
        { label: 'Completed', value: 'completed' },
    ]

    // form states
    const [selectedCategoryType, setSelectedCategoryType] = useState<string>(
        categories[0].value
    )
    const [selectedStatus, setSelectedStatus] = useState<string>(
        status[0]?.value
    )

    const [selectedStartDate, setSelectedStartDate] = useState<string>('')
    const onChangeStartDate: DatePickerProps['onChange'] = (
        date,
        dateString
    ) => {
        // dateString is always a string when NOT using range picker
        setSelectedStartDate(dateString as string)
    }

    const [selectedEndDate, setSelectedEndDate] = useState<string>('')
    const onChangeEndDate: DatePickerProps['onChange'] = (date, dateString) => {
        // dateString is always a string when NOT using range picker
        setSelectedEndDate(dateString as string)
    }

    const [errorMessages, setErrorMessages] = useState<{
        categoryType: string | undefined
        startDate: string | undefined
        endDate: string | undefined
        status: string | undefined
    }>({
        categoryType: undefined,
        startDate: undefined,
        endDate: undefined,
        status: undefined,
    })

    const initialValues: AddSavingsGoalTypes = {
        goalName: '',
        goalAmount: '',
    }

    const handleSubmit = () => {}

    const validationSchema = Yup.object().shape({
        goalName: Yup.string().required('Goal Name is required'),
        goalAmount: Yup.string()
            .required('Goal Amount is required')
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
                        title="Add New Goal"
                        onClick={() => router.push('/dashboard/savings-goals')}
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
                                    labelText="Goal Name"
                                    placeholderText="Enter goal name"
                                    id="goalName"
                                    name="goalName"
                                    value={values.goalName}
                                    onChangeInput={handleChange}
                                    errorMessage={
                                        touched.goalName && errors.goalName
                                            ? errors.goalName
                                            : undefined
                                    }
                                />
                                <TextInput
                                    labelText="Goal Amount"
                                    placeholderText="Enter amount"
                                    variant="number"
                                    id="goalAmount"
                                    name="goalAmount"
                                    value={values.goalAmount}
                                    onChangeInput={handleChange}
                                    errorMessage={
                                        touched.goalAmount && errors.goalAmount
                                            ? errors.goalAmount
                                            : undefined
                                    }
                                />
                                <CustomDatePicker
                                    labelText="Start Date"
                                    onChangeDate={onChangeStartDate}
                                    errorMessage={
                                        errorMessages.startDate
                                            ? errorMessages.startDate
                                            : undefined
                                    }
                                />
                                <CustomDatePicker
                                    labelText="End Date"
                                    onChangeDate={onChangeEndDate}
                                    errorMessage={
                                        errorMessages.endDate
                                            ? errorMessages.endDate
                                            : undefined
                                    }
                                />
                                <Dropdown
                                    labelText="Category Type"
                                    name="selectedCategoryType"
                                    data={categories}
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
                                    hasPreSelected={true}
                                />
                                <Dropdown
                                    labelText="Status"
                                    name="selectedStatus"
                                    data={status}
                                    errorMessage={
                                        errorMessages.status
                                            ? errorMessages.status
                                            : undefined
                                    }
                                    editable={true}
                                    variant="create"
                                    onChange={(value) =>
                                        setSelectedStatus(value)
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
