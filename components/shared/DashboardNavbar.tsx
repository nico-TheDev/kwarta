'use client'

import Image from 'next/image'
import { useRouter } from 'nextjs-toploader/app'
import { useState } from 'react'
import {
    FaBook,
    FaShieldAlt,
    FaSignOutAlt,
    FaUser,
    FaUserCircle,
} from 'react-icons/fa'
import { toast } from 'react-toastify'

import useUserStore from '@/stores/useUserStore'
import ButtonText from './ButtonText'

interface DashboardNavbarProps {
    isStatusBarVisible: boolean
    offset?: number
    startLoading?: () => void
    stopLoading?: () => void
}

export default function DashboardNavbar({
    isStatusBarVisible,
    offset,
    startLoading,
    stopLoading,
}: DashboardNavbarProps) {
    const router = useRouter()

    const user = useUserStore((state) => state.user)
    // console.log('current user:', user)
    const [loaded, setLoaded] = useState(false)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    const menuItems = [
        // {
        //     label: 'Home',
        //     icon: <FaHome />,
        //     path: '/dashboard',
        // },
        // {
        //     label: 'Accounts',
        //     icon: <FaListAlt />,
        //     path: '/dashboard/account/posts',
        // },
        // {
        //     label: 'Transactions',
        //     icon: <FaReceipt />,
        //     path: '/dashboard/account/listings',
        // },
        // {
        //     label: 'Cashflow',
        //     icon: <FaStar />,
        //     path: '/dashboard/account/reviews',
        // },
        // {
        //     label: 'Categories',
        //     icon: <FaStar />,
        //     path: '/dashboard/account/reviews',
        // },
        // {
        //     label: 'Savings',
        //     icon: <FaUser />,
        //     path: '/dashboard/account/profile',
        // },
        {
            label: 'Investments',
            icon: <FaUser />,
            path: '/dashboard/account/profile',
        },
        {
            label: 'Stocks',
            icon: <FaUser />,
            path: '/dashboard/account/profile',
        },
        {
            label: 'Bonds',
            icon: <FaUser />,
            path: '/dashboard/account/profile',
        },
        {
            label: 'Articles',
            icon: <FaUser />,
            path: '/dashboard/account/profile',
        },
        {
            label: 'Profile',
            icon: <FaUser />,
            path: '/dashboard/account/profile',
        },
        {
            label: 'Settings',
            icon: <FaUser />,
            path: '/dashboard/account/profile',
        },
    ]

    const policyLinks = [
        {
            label: 'Terms & Conditions',
            icon: <FaBook />,
            path: '/terms-conditions?from=dashboard',
        },
        {
            label: 'Privacy Policy',
            icon: <FaShieldAlt />,
            path: '/privacy-policy?from=dashboard',
        },
    ]

    const setLoggedOut = useUserStore((state) => state.setLoggedOut)
    const clearUser = useUserStore((state) => state.clearUser)
    const clearUserToken = useUserStore((state) => state.clearUserToken)
    const handleLogout = () => {
        console.log('Logging out...')
        startLoading?.()
        toggleSidebar()
        setLoggedOut()
        clearUser()
        clearUserToken()
        setTimeout(() => {
            stopLoading?.()
            toast.success('Logged out successfully.')
            router.push('/')
        }, 2000)
    }

    return (
        <>
            <nav
                className={`w-full bg-white fixed ${
                    isStatusBarVisible ? `top-[${offset}px]` : 'top-0'
                } left-0 z-30 h-16 border-b-[2px] border-secondary p-[70px]`}
            >
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-full">
                    <div className="flex items-center space-x-4">
                        <button onClick={() => router.push('/dashboard')}>
                            <Image
                                src={'/cash-logo.svg'}
                                alt="Logo"
                                width={100}
                                height={100}
                                className="w-[60px] h-auto mr-[50px]"
                            />
                        </button>
                    </div>

                    <div className="flex laptop:hidden space-x-4 font-medium text-white items-center justify-center">
                        <button
                            className="w-12 h-12 rounded-full overflow-hidden bg-tertiary flex items-center justify-center"
                            onClick={toggleSidebar}
                        >
                            <FaUserCircle className="text-white text-3xl" />
                        </button>
                    </div>
                    <div className="hidden laptop:flex items-center space-x-4 text-primary font-bold">
                        <ButtonText
                            label="Add Transaction"
                            onPress={() => {}}
                            isBold={true}
                        />
                        <button
                            onClick={toggleSidebar}
                            className="flex items-center px-4 py-2 whitespace-nowrap"
                        >
                            Hi, {user !== null ? user?.first_name : 'User'}!
                        </button>
                    </div>
                </div>
            </nav>

            <div
                className={`fixed top-0 right-0 h-screen w-80 bg-white shadow-2xl z-50 transform ${
                    isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
                } transition-transform duration-300 ease-in-out flex flex-col`}
            >
                {/* Header */}
                <div className="bg-primary p-6 flex flex-col items-center text-center border-b">
                    {user?.profile_photo ? (
                        <Image
                            src={user?.profile_photo}
                            alt="User"
                            width={70}
                            height={70}
                            className="rounded-full mb-3 object-cover border-primary"
                        />
                    ) : (
                        <div
                            className="w-12 h-12 rounded-full overflow-hidden bg-tertiary flex items-center justify-center"
                            onClick={toggleSidebar}
                        >
                            <FaUserCircle className="text-white text-4xl" />
                        </div>
                    )}

                    <h3 className="text-white text-lg font-bold">
                        {user
                            ? `${user?.first_name} ${user?.last_name}`
                            : 'User'}
                    </h3>
                    <p className="text-sm text-white">{user?.email}</p>
                    <p className="text-sm text-white">{user?.mobile_number}</p>
                </div>

                {/* Menu */}
                <div className="flex flex-col py-4 flex-1 overflow-y-auto">
                    {menuItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                router.push(item.path)
                                setIsSidebarOpen(false)
                            }}
                            className="flex items-center gap-4 px-6 py-3 text-black hover:bg-gray-100 transition-all"
                        >
                            <span className="text-lg text-secondary">
                                {item.icon}
                            </span>
                            <span className="text-[15px]">{item.label}</span>
                        </button>
                    ))}

                    <hr className="my-4 border-tertiary" />

                    {policyLinks.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                router.push(item.path)
                                setIsSidebarOpen(false)
                            }}
                            className="flex items-center gap-4 px-6 py-3 text-primary cursor-pointer"
                        >
                            <span className="text-lg text-secondary">
                                {item.icon}
                            </span>
                            <span className="text-[15px] font-medium text-primary">
                                {item.label}
                            </span>
                        </button>
                    ))}

                    <hr className="my-4 border-tertiary" />

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-4 px-6 py-3 text-black hover:bg-gray-100 transition-all"
                    >
                        <FaSignOutAlt className="text-lg text-secondary" />
                        <span className="text-[15px]">Log Out</span>
                    </button>
                </div>
            </div>

            {/* Overlay */}
            {isSidebarOpen ? (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-30"
                    onClick={toggleSidebar}
                />
            ) : null}

            {/* Padding for page content */}
            <div className="pt-[80px]" />
        </>
    )
}
