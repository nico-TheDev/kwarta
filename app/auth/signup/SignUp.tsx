'use client'

import Link from 'next/link'
import { useState } from 'react'

import { Form, Formik } from 'formik'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'nextjs-toploader/app'
import * as Yup from 'yup'

import { colors } from '@/constants/themes'
import Loader from '@/components/shared/Loader'
import TextInput from '@/components/shared/TextInput'
import useLoaderStore from '@/stores/useLoaderStore'
import { SignUpTypes } from '@/types/types'

export default function SignUp() {
    const router = useRouter()
    const { showLoader, hideLoader } = useLoaderStore()

    const initialValues: SignUpTypes = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    const [checkedTerms, setCheckedTerms] = useState(false)

    const handleSubmit = () => {}

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        userName: Yup.string().required('User name is required'),
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters long')
            .matches(
                /[A-Z]/,
                'Password must contain at least one uppercase letter'
            )
            .matches(
                /[a-z]/,
                'Password must contain at least one lowercase letter'
            )
            .matches(/[0-9]/, 'Password must contain at least one number')
            .matches(
                /[@$!%*?&]/,
                'Password must contain at least one special character'
            ),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Please confirm your password'),
    })

    return (
        <div className="w-full flex flex-row">
            <div className="w-[40%] relative flex flex-col overflow-hidden ">
                {/* Background Image */}
                <img
                    src="/images/signup.png"
                    alt="background"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/40"></div>
                <div className="relative z-10 w-full h-full flex flex-col justify-center items-center px-4 py-10 text-center">
                    <h2 className="text-white text-[55px] font-bold mb-4">
                        Welcome Back!
                    </h2>

                    <p className="text-white text-[20px] max-w-[70%] mb-8">
                        Login to manage your finances
                    </p>

                    <button
                        type="submit"
                        className="w-[70%] bg-primary text-white py-3 rounded-lg text-lg cursor-pointer"
                    >
                        Log In
                    </button>
                </div>
            </div>
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
                    Create Account
                </h2>

                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    {({ values, errors, touched, handleChange }) => (
                        <Form className="w-full max-w-md mx-auto">
                            <TextInput
                                labelText="Name"
                                placeholderText="Enter your name"
                                id="name"
                                name="name"
                                value={values.name}
                                onChangeInput={handleChange}
                                errorMessage={
                                    touched.name && errors.name
                                        ? errors.name
                                        : undefined
                                }
                            />
                            <TextInput
                                labelText="Email Address"
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
                                labelText="Password"
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
                            <TextInput
                                labelText="Confirm Password"
                                placeholderText="Enter confirm password"
                                id="confirmPassword"
                                name="confirmPassword"
                                variant="password"
                                value={values.confirmPassword}
                                onChangeInput={handleChange}
                                errorMessage={
                                    touched.confirmPassword &&
                                    errors.confirmPassword
                                        ? errors.confirmPassword
                                        : undefined
                                }
                            />
                            <div className="flex items-center gap-4">
                                <input
                                    type="checkbox"
                                    className="h-5 w-5 bg-primary rounded-sm"
                                    name="terms"
                                    id="terms"
                                    onChange={(e) => {
                                        setCheckedTerms(e.target.checked)
                                    }}
                                />
                                <label
                                    htmlFor="terms"
                                    className="text-h6 text-black"
                                >
                                    I acknowledge that I have read and
                                    understood the{' '}
                                    <Link
                                        href="/terms-conditions?from=signup"
                                        target="_blank"
                                        className="text-primary font-semibold cursor-pointer"
                                    >
                                        CASH Terms and Conditions
                                    </Link>{' '}
                                    and{' '}
                                    <Link
                                        href="/privacy-policy?from=signup"
                                        target="_blank"
                                        className="text-primary font-semibold cursor-pointer"
                                    >
                                        CASH Privacy Policy{' '}
                                    </Link>
                                    (as may be updated from time to time) and
                                    hereby agree to be bound by such terms.
                                </label>
                            </div>
                            <div className="mt-6 mb-6 text-center">
                                <button
                                    type="submit"
                                    className="w-full bg-primary text-white py-3 rounded-lg text-lg cursor-pointer"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>

            <Loader />
        </div>
    )
}
