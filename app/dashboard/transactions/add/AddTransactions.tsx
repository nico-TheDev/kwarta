'use client'

import { DatePickerProps } from 'antd'
import { Form, Formik } from 'formik'
import { useRouter } from 'nextjs-toploader/app'
import { useEffect, useState } from 'react'
import * as Yup from 'yup'

import ButtonText from '@/components/shared/ButtonText'
import CommentInput from '@/components/shared/CommentInput'
import CustomDatePicker from '@/components/shared/CustomDatePicker'
import Dropdown from '@/components/shared/Dropdown'
import FormHeader from '@/components/shared/FormHeader'
import Loader from '@/components/shared/Loader'
import TextInput from '@/components/shared/TextInput'
import useLoaderStore from '@/stores/useLoaderStore'
import { AddTransactionTypes } from '@/types/types'

type TransactionType = 'expense' | 'income' | 'savings' | 'investments'
export default function AddTransactions() {
    const router = useRouter()

    const { showLoader, hideLoader } = useLoaderStore()

    // sample data for dropdown
    const transactionTypes = [
        { label: 'Expense', value: 'expense' },
        { label: 'Income', value: 'income' },
        { label: 'Savings', value: 'savings' },
        { label: 'Investments', value: 'investments' },
    ]
    const accounts = [
        { label: 'Cash Wallet', value: 'cash_wallet' },
        { label: 'BPI Savings', value: 'bpi_savings' },
        { label: 'GCash', value: 'gcash' },
        { label: 'Credit Card', value: 'credit_card' },
    ]
    const categories: Record<
        TransactionType | string,
        { label: string; value: string }[]
    > = {
        expense: [
            { label: 'Food', value: 'food' },
            { label: 'Transportation', value: 'transportation' },
            { label: 'Bills', value: 'bills' },
            { label: 'Shopping', value: 'shopping' },
            { label: 'Entertainment', value: 'entertainment' },
        ],
        income: [
            { label: 'Salary', value: 'salary' },
            { label: 'Freelance', value: 'freelance' },
            { label: 'Business', value: 'business' },
            { label: 'Gifts', value: 'gifts' },
        ],
        savings: [
            { label: 'Emergency Fund', value: 'emergency_fund' },
            { label: 'Travel Fund', value: 'travel_fund' },
            { label: 'Education', value: 'education' },
        ],
        investments: [
            { label: 'Stocks', value: 'stocks' },
            { label: 'Crypto', value: 'crypto' },
            { label: 'Mutual Funds', value: 'mutual_funds' },
        ],
    }

    // form states
    const [selectedFile, setSelectedFile] = useState('')
    const [selectedTransactionType, setSelectedTransactionType] =
        useState('expense')
    console.log('selected transaction type:', selectedTransactionType)
    const [selectedAccount, setSelectedAccount] = useState<string>(
        accounts[0].value
    )
    const [filteredCategories, setFilteredCategories] = useState(
        categories[selectedTransactionType] || []
    )
    // Lazily initialize selectedCategory safely
    const [selectedCategory, setSelectedCategory] = useState<string>(() => {
        const defaultCategories = categories['expense'] || []
        return defaultCategories[0]?.value || ''
    })
    console.log('filtered:', filteredCategories)
    useEffect(() => {
        setFilteredCategories(categories[selectedTransactionType] || [])
    }, [selectedTransactionType])
    const [selectedTransactionDate, setSelectedTransactionDate] =
        useState<string>('')
    const onChangeTransactionDate: DatePickerProps['onChange'] = (
        date,
        dateString
    ) => {
        // dateString is always a string when NOT using range picker
        setSelectedTransactionDate(dateString as string)
    }

    const [errorMessages, setErrorMessages] = useState<{
        transactionType: string | undefined
        account: string | undefined
        category: string | undefined
        transactionDate: string | undefined
    }>({
        transactionType: undefined,
        account: undefined,
        category: undefined,
        transactionDate: undefined,
    })

    const initialValues: AddTransactionTypes = {
        transactionAmount: '',
        comment: '',
    }

    const handleSubmit = () => {}

    const validationSchema = Yup.number()
        .transform((value, originalValue) =>
            originalValue === '' ? undefined : Number(originalValue)
        )
        .typeError('Transaction Amount must be a number')
        .required('Transaction Amount is required')
        .moreThan(0, 'Transaction Amount must be greater than 0')

    return (
        <div className="relative w-full h-full bg-white">
            <section
                id="hero"
                className="w-full bg-white flex flex-col items-center justify-center px-10 mt-[60px]"
            >
                <div className="relative flex-1 w-full p-8">
                    <FormHeader
                        title="Add Transaction"
                        onClick={() => router.push('/dashboard/transactions')}
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
                                    labelText="Transaction Amount"
                                    placeholderText="Enter amount"
                                    variant="number"
                                    id="transactionAmount"
                                    name="transactionAmount"
                                    value={values.transactionAmount}
                                    onChangeInput={handleChange}
                                    errorMessage={
                                        touched.transactionAmount &&
                                        errors.transactionAmount
                                            ? errors.transactionAmount
                                            : undefined
                                    }
                                />
                                <Dropdown
                                    labelText="Transaction Type"
                                    name="selectedTransactionType"
                                    data={transactionTypes}
                                    errorMessage={
                                        errorMessages.transactionType
                                            ? errorMessages.transactionType
                                            : undefined
                                    }
                                    editable={true}
                                    variant="create"
                                    onChange={(value) =>
                                        setSelectedTransactionType(value)
                                    }
                                    hasPreSelected={true}
                                />
                                <Dropdown
                                    labelText="Account"
                                    name="selectedAccount"
                                    data={accounts}
                                    errorMessage={
                                        errorMessages.account
                                            ? errorMessages.account
                                            : undefined
                                    }
                                    editable={true}
                                    variant="create"
                                    onChange={(value) =>
                                        setSelectedAccount(value)
                                    }
                                />
                                <Dropdown
                                    labelText="Category"
                                    name="selectedCategory"
                                    data={
                                        filteredCategories.length > 0
                                            ? filteredCategories
                                            : [
                                                  {
                                                      label: 'Please select transaction type',
                                                      value: '',
                                                  },
                                              ]
                                    }
                                    errorMessage={
                                        errorMessages.category
                                            ? errorMessages.category
                                            : undefined
                                    }
                                    editable={true}
                                    variant="create"
                                    onChange={(value) =>
                                        setSelectedCategory(value)
                                    }
                                />
                                <CustomDatePicker
                                    labelText="Transaction Date"
                                    onChangeDate={onChangeTransactionDate}
                                    errorMessage={
                                        errorMessages.transactionDate
                                            ? errorMessages.transactionDate
                                            : undefined
                                    }
                                />

                                <CommentInput
                                    values={values.comment}
                                    handleChange={handleChange}
                                    selectedFile={selectedFile}
                                    setSelectedFile={setSelectedFile}
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
