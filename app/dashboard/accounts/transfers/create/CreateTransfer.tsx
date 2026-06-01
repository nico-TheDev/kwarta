'use client'

import { DatePickerProps } from 'antd'
import { Form, Formik } from 'formik'
import { useRouter } from 'nextjs-toploader/app'
import { useState } from 'react'
import * as Yup from 'yup'

import ButtonText from '@/components/shared/ButtonText'
import CommentInput from '@/components/shared/CommentInput'
import CustomDatePicker from '@/components/shared/CustomDatePicker'
import Dropdown from '@/components/shared/Dropdown'
import FormHeader from '@/components/shared/FormHeader'
import Loader from '@/components/shared/Loader'
import TextInput from '@/components/shared/TextInput'
import useLoaderStore from '@/stores/useLoaderStore'
import { CreateTransferTypes } from '@/types/types'

export default function CreateTransfer() {
    const router = useRouter()

    const { showLoader, hideLoader } = useLoaderStore()

    // sample data for dropdown
    const accounts = [
        { label: 'Bank 1', value: 'bank-1' },
        { label: 'Bank 2', value: 'bank-2' },
        { label: 'Bank 3', value: 'bank-3' },
    ]

    // form states
    const [selectedSenderAccount, setSelectedSenderAccount] = useState<string>(
        accounts[0].value
    )
    const [selectedReceiverAccount, setSelectedReceiverAccount] =
        useState<string>(accounts[0].value)
    const [selectedFile, setSelectedFile] = useState('')
    const [selectedTransferDate, setSelectedTransferDate] = useState<string>('')
    const onChangeTransferDate: DatePickerProps['onChange'] = (
        date,
        dateString
    ) => {
        // dateString is always a string when NOT using range picker
        setSelectedTransferDate(dateString as string)
    }

    // error messages for required form states
    const [errorMessages, setErrorMessages] = useState<{
        senderAccount: string | undefined
        receiverAccount: string | undefined
        transferDate: string | undefined
    }>({
        senderAccount: undefined,
        receiverAccount: undefined,
        transferDate: undefined,
    })

    const initialValues: CreateTransferTypes = {
        transferAmount: '',
        comment: '',
    }

    const handleSubmit = () => {}

    const validationSchema = Yup.number()
        .transform((value, originalValue) =>
            originalValue === '' ? undefined : Number(originalValue)
        )
        .typeError('Transfer Amount must be a number')
        .required('Transfer Amount is required')
        .moreThan(0, 'Transfer Amount must be greater than 0')

    return (
        <div className="relative w-full h-full bg-white">
            <section
                id="hero"
                className="w-full bg-white flex flex-col items-center justify-center px-10 mt-[60px]"
            >
                <div className="relative flex-1 w-full p-8">
                    <FormHeader
                        title="Create Transfer"
                        onClick={() =>
                            router.push('/dashboard/accounts/transfers')
                        }
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
                                    labelText="Transfer Amount"
                                    placeholderText="Enter amount"
                                    variant="number"
                                    id="transferAmount"
                                    name="transferAmount"
                                    value={values.transferAmount}
                                    onChangeInput={handleChange}
                                    errorMessage={
                                        touched.transferAmount &&
                                        errors.transferAmount
                                            ? errors.transferAmount
                                            : undefined
                                    }
                                />
                                <Dropdown
                                    labelText="Choose Sender Account "
                                    name="selectedSenderAccount"
                                    data={accounts}
                                    errorMessage={
                                        errorMessages.senderAccount
                                            ? errorMessages.senderAccount
                                            : undefined
                                    }
                                    editable={true}
                                    variant="create"
                                    onChange={(value) =>
                                        setSelectedSenderAccount(value)
                                    }
                                />
                                <Dropdown
                                    labelText="Choose Receiver Account "
                                    name="selectedReceiverAccount"
                                    data={accounts}
                                    errorMessage={
                                        errorMessages.receiverAccount
                                            ? errorMessages.receiverAccount
                                            : undefined
                                    }
                                    editable={true}
                                    variant="create"
                                    onChange={(value) =>
                                        setSelectedReceiverAccount(value)
                                    }
                                />
                                <CustomDatePicker
                                    labelText="Transfer Date"
                                    onChangeDate={onChangeTransferDate}
                                    errorMessage={
                                        errorMessages.transferDate
                                            ? errorMessages.transferDate
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
