'use client'

import { Form, Formik } from 'formik'
import { useRouter } from 'nextjs-toploader/app'
import { useState } from 'react'
import * as Yup from 'yup'

import ButtonText from '@/components/shared/ButtonText'
import CommentInput from '@/components/shared/CommentInput'
import Dropdown from '@/components/shared/Dropdown'
import FormHeader from '@/components/shared/FormHeader'
import Loader from '@/components/shared/Loader'
import TextInput from '@/components/shared/TextInput'
import useLoaderStore from '@/stores/useLoaderStore'
import { AddBudgetTypes } from '@/types/types'

export default function AddBudget() {
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
    const generateMonthOptions = (count = 5) => {
        const today = new Date()

        return Array.from({ length: count }, (_, i) => {
            const date = new Date(today.getFullYear(), today.getMonth() + i, 1)

            const label = date.toLocaleString('en-US', {
                month: 'long',
                year: 'numeric',
            })

            const value = date.toISOString().slice(0, 7) // YYYY-MM

            return { label, value }
        })
    }

    const monthOptions = generateMonthOptions(5)

    // form states
    const [selectedCategoryType, setSelectedCategoryType] = useState<string>(
        categories[0].value
    )
    const [selectedMonth, setSelectedMonth] = useState<string>(
        monthOptions[0]?.value
    )

    const [errorMessages, setErrorMessages] = useState<{
        categoryType: string | undefined
        month: string | undefined
    }>({
        categoryType: undefined,
        month: undefined,
    })

    const initialValues: AddBudgetTypes = {
        budgetAmount: '',
        budgetDescription: '',
    }

    const handleSubmit = () => {}

    const validationSchema = Yup.number()
        .transform((value, originalValue) =>
            originalValue === '' ? undefined : Number(originalValue)
        )
        .typeError('Budget Amount must be a number')
        .required('Budget Amount is required')
        .moreThan(0, 'Budget Amount must be greater than 0')

    return (
        <div className="relative w-full h-full bg-white">
            <section
                id="hero"
                className="w-full bg-white flex flex-col items-center justify-center px-10 mt-[60px]"
            >
                <div className="relative flex-1 w-full p-8">
                    <FormHeader
                        title="Add New Budget"
                        onClick={() => router.push('/dashboard/budget')}
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
                                    labelText="Budget Amount"
                                    placeholderText="Enter amount"
                                    variant="number"
                                    id="budgetAmount"
                                    name="budgetAmount"
                                    value={values.budgetAmount}
                                    onChangeInput={handleChange}
                                    errorMessage={
                                        touched.budgetAmount &&
                                        errors.budgetAmount
                                            ? errors.budgetAmount
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
                                    labelText="Month"
                                    name="selectedMonth"
                                    data={monthOptions}
                                    errorMessage={
                                        errorMessages.month
                                            ? errorMessages.month
                                            : undefined
                                    }
                                    editable={true}
                                    variant="create"
                                    onChange={(value) =>
                                        setSelectedMonth(value)
                                    }
                                />

                                <CommentInput
                                    labelText="Budget Description"
                                    placeholder="Enter description/note"
                                    values={values.budgetDescription}
                                    handleChange={handleChange}
                                    variant="comment"
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
