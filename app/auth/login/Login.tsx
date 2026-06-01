'use client'

import { Form, Formik } from 'formik'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'nextjs-toploader/app'
import * as Yup from 'yup'

import { colors } from '@/constants/themes'
import Loader from '@/components/shared/Loader'
import TextInput from '@/components/shared/TextInput'
import useLoaderStore from '@/stores/useLoaderStore'
import { LoginTypes } from '@/types/types'

export default function Login() {
    const router = useRouter()

    const { showLoader, hideLoader } = useLoaderStore()

    const initialValues: LoginTypes = {
        email: '',
        password: '',
    }

    const handleSubmit = () => {}

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        password: Yup.string().required('Password is required'),
    })

    return (
        <div className="w-full h-screen flex flex-row">
            <div className="w-[60%] flex flex-col bg-white p-10 items-center">
                <div className="w-full flex justify-between items-center mb-6">
                    <button
                        className="mb-[30px] flex items-center cursor-pointer"
                        onClick={() => router.push('/')}
                    >
                        <ArrowLeft size={15} color={colors.primary} />
                        <h2 className="text-sm md:text-md font-semibold text-primary ml-[10px]">
                            Return to Home
                        </h2>
                    </button>
                </div>

                <h2 className="text-[40px] font-bold text-primary text-center mb-6">
                    Login to CASH
                </h2>

                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    {({ values, errors, touched, handleChange }) => (
                        <Form className="w-full max-w-md">
                            <TextInput
                                labelText="Email Address:"
                                placeholderText="Enter email"
                                id="email"
                                name="email"
                                value={values.email}
                                onChangeInput={handleChange}
                                errorMessage={
                                    touched.email && errors.email
                                        ? errors.email
                                        : undefined
                                }
                            />
                            <TextInput
                                labelText="Password:"
                                placeholderText="Enter password"
                                id="password"
                                name="password"
                                variant="password"
                                value={values.password}
                                onChangeInput={handleChange}
                                errorMessage={
                                    touched.password && errors.password
                                        ? errors.password
                                        : undefined
                                }
                            />
                            <button
                                type="button"
                                className="text-primary underline cursor-pointer"
                                onClick={() =>
                                    router.push('/auth/reset-password')
                                }
                            >
                                Reset your password
                            </button>
                            <div className="mt-6">
                                <button
                                    type="submit"
                                    className="w-full bg-primary text-white py-3 rounded-lg text-lg cursor-pointer"
                                >
                                    Login
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <div className="w-[40%] relative flex flex-col overflow-hidden ">
                {/* Background Image */}
                <img
                    src="/images/login.png"
                    alt="background"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/40"></div>
                <div className="relative z-10 w-full h-full flex flex-col justify-center items-center px-4 py-10 text-center">
                    <h2 className="text-white text-[55px] font-bold mb-4">
                        Hello, Friend!
                    </h2>

                    <p className="text-white text-[20px] max-w-[70%] mb-8">
                        Enter your personal details and start journey with us
                    </p>

                    <button
                        type="submit"
                        className="w-[70%] bg-primary text-white py-3 rounded-lg text-lg cursor-pointer"
                    >
                        Sign Up
                    </button>
                </div>
            </div>
            <Loader />
        </div>
    )
}
