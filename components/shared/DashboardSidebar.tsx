import React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
    FaChartBar,
    FaWallet,
    FaExchangeAlt,
    FaStream,
    FaFolder,
    FaPiggyBank,
    FaMoneyCheckAlt,
    FaStock,
    FaFileAlt,
    FaBook,
    FaUser,
    FaCog,
} from 'react-icons/fa'
import { FaRectangleList } from 'react-icons/fa6'
import { HiDocumentReport } from 'react-icons/hi'

export default function DashboardSidebar() {
    const pathname = usePathname()

    const items = [
        {
            href: '/dashboard',
            icon: <FaChartBar />,
            title: 'Dashboard',
        },
        {
            href: '/dashboard/accounts',
            icon: <FaWallet />,
            title: 'Accounts',
        },
        {
            href: '/dashboard/transactions',
            icon: <FaExchangeAlt />,
            title: 'Transactions',
        },
        {
            href: '/dashboard/budget',
            icon: <FaRectangleList />,
            title: 'Budget',
        },
        {
            href: '/dashboard/savings-goals',
            icon: <FaPiggyBank />,
            title: 'Savings Goals',
        },
        {
            href: '/dashboard/reports',
            icon: <HiDocumentReport />,
            title: 'Reports',
        },
        {
            href: '/dashboard/categories',
            icon: <FaFolder />,
            title: 'Categories',
        },
        // {
        //     href: '/savings',
        //     icon: <FaPiggyBank />,
        //     title: 'Savings',
        // },
        //     {
        //         href: '/investments',
        //         icon: <FaMoneyCheckAlt />,
        //         title: getLanguage(currentLanguage).investment,
        //     },
        //     {
        //         href: '/stocks',
        //         icon: <FaStock />,
        //         title: getLanguage(currentLanguage).stocks,
        //     },
        //     { href: '/bonds', icon: <FaFileAlt />, title: 'Bonds' },
        //     {
        //         href: '/articles',
        //         icon: <FaBook />,
        //         title: getLanguage(currentLanguage).articles,
        //     },
        //     {
        //         href: '/profile',
        //         icon: <FaUser />,
        //         title: getLanguage(currentLanguage).profile,
        //     },
        //     { href: '/settings', icon: <FaCog />, title: 'Settings' },
    ]

    return (
        <div className="w-64 bg-secondary flex flex-col mt-[60px]">
            <div className="flex flex-col space-y-2 py-6 px-4">
                {items.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-primary transition-colors ${
                                isActive ? 'bg-primary font-semibold' : ''
                            }`}
                        >
                            <span className="text-white text-lg">
                                {item.icon}
                            </span>
                            <span className="text-white">{item.title}</span>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
