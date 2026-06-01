'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaUserCircle } from 'react-icons/fa'
import { toast } from 'react-toastify'

import { logos } from '@/constants/themes'
import useUserStore from '@/stores/useUserStore'
// import MobileNavButton from './MobileNavButton'

export default function LandingPageNavbar() {
    const router = useRouter()
    const pathname = usePathname()

    const user = useUserStore((state) => state.user)
    const isLoggedIn = useUserStore((state) => state.isLoggedIn)
    const setLoggedOut = useUserStore((state) => state.setLoggedOut)
    const clearUser = useUserStore((state) => state.clearUser)
    const clearUserToken = useUserStore((state) => state.clearUserToken)

    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            console.log('Click detected:', event.target)
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setDropdownOpen(false)
            }
        }

        if (dropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [dropdownOpen])

    const handleLogout = () => {
        setDropdownOpen(false)

        setLoggedOut()
        clearUser()
        clearUserToken()

        setTimeout(() => {
            toast.success('Logged out successfully.')
            if (pathname === '/') {
                window.location.reload()
            } else {
                router.push('/')
            }
            router.push('/')
        }, 2000)
    }

    // const [name, setName] = useState<string>('');
    // console.log('name:', name)
    // useEffect(() => {
    //     const decrypt = async () => {
    //         if (user?.first_name?.data && user?.first_name?.iv) {
    //         const name = decryptData(user.first_name.data, user.first_name.iv);
    //         setName(name); // assuming you have a useState for this
    //         }
    //     };

    //     decrypt();
    // }, [user]);

    return (
        <nav className={`w-full pt-2 px-1 bg-white`}>
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* Left: Logo + Nav Links */}
                <div className="flex items-center space-x-10">
                    <button className="mb-4" onClick={() => router.push('/')}>
                        <Image
                            src={'/cash-logo.svg'}
                            alt="landing-page-logo"
                            width={100}
                            height={100}
                            className="w-[60px] sm:w-[60px]"
                        />
                    </button>

                    {/* Show only on medium screens and up */}
                    {/* <div className="hidden laptop:flex space-x-6 font-medium text-tertiary">
                        <Link href="/marketplace">Marketplace</Link>
                        <Link href="/community">Community</Link>
                    </div>

                    <div className="flex laptop:hidden">
                        <MobileNavButton />
                    </div> */}
                </div>

                <div className="relative">
                    {isLoggedIn ? (
                        <>
                            {/* Mobile */}
                            <div className="flex laptop:hidden">
                                <button
                                    className="w-12 h-12 rounded-full overflow-hidden bg-primary flex items-center justify-center disabled:opacity-60"
                                    onClick={() =>
                                        setDropdownOpen((prev) => !prev)
                                    }
                                    disabled={dropdownOpen}
                                >
                                    <FaUserCircle className="text-white text-3xl" />
                                </button>
                            </div>

                            {/* Desktop */}
                            <div className="hidden laptop:flex">
                                <button
                                    onClick={() =>
                                        setDropdownOpen((prev) => !prev)
                                    }
                                    disabled={dropdownOpen}
                                    className="flex items-center bg-primary text-white px-4 py-2 rounded-md disabled:opacity-60"
                                >
                                    Hi, {user.first_name}!
                                </button>
                            </div>
                        </>
                    ) : (
                        <Link
                            href="/auth/login"
                            className="bg-primary text-white px-4 py-2 rounded-md"
                        >
                            Login
                        </Link>
                    )}

                    {/* Dropdown */}
                    {dropdownOpen && (
                        <div
                            ref={dropdownRef}
                            className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50"
                        >
                            <button
                                onClick={() => router.push('/dashboard')}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Dashboard
                            </button>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}
