'use client'

import { useRouter } from 'nextjs-toploader/app'

import FormHeader from '@/components/shared/FormHeader'
import { Icon } from '@/components/shared/IconLibrary/Icons'
import { ICON_NAMES } from '@/constants/icons'
import { colors } from '@/constants/themes'

export default function Profile() {
    const router = useRouter()

    const user = {}

    return (
        <div className="relative w-full h-full bg-white">
            <section
                id="hero"
                className="w-full bg-white flex flex-col items-center justify-center px-10 mt-[60px]"
            >
                <div className="relative flex-1 w-full p-8">
                    <FormHeader
                        title="My Profile"
                        onClick={() => router.push('/dashboard')}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                        {/* LEFT: Profile Card */}
                        <div className="bg-white shadow rounded-2xl p-5">
                            <div className="flex items-center gap-4">
                                {/* Avatar / Icon */}
                                <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                    {user?.image ? (
                                        <img
                                            src={user.image}
                                            alt="profile"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <Icon
                                            name={
                                                ICON_NAMES.SYSTEM_ICONS.PROFILE
                                            }
                                            color={colors.primary}
                                            size={60}
                                        />
                                    )}
                                </div>

                                {/* Name + Email */}
                                <div>
                                    <p className="text-base font-semibold text-gray-900">
                                        {user?.name || 'Guest User'}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {user?.email || 'No email'}
                                    </p>
                                </div>
                            </div>

                            <button className="mt-4 w-full py-2 text-xs rounded-lg bg-primary text-white hover:bg-green-600">
                                Edit Profile
                            </button>
                        </div>

                        {/* RIGHT: Account Status Card */}
                        <div className="bg-white shadow rounded-2xl p-5">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">
                                Account Status
                            </h3>

                            <div className="flex flex-col gap-3 text-sm">
                                {/* Status Row */}
                                <div className="flex justify-between">
                                    <span className="text-gray-500">
                                        Status
                                    </span>
                                    <span className="text-green-600 font-medium">
                                        Active
                                    </span>
                                </div>

                                {/* Plan */}
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Plan</span>
                                    <span className="text-gray-900 font-medium">
                                        Free
                                    </span>
                                </div>

                                {/* Goals */}
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Goals</span>
                                    <span className="text-gray-900 font-medium">
                                        5 Total
                                    </span>
                                </div>

                                {/* Completed */}
                                <div className="flex justify-between">
                                    <span className="text-gray-500">
                                        Completed
                                    </span>
                                    <span className="text-green-600 font-medium">
                                        1 Goal
                                    </span>
                                </div>
                            </div>

                            <button className="mt-4 w-full py-2 text-xs rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100">
                                Upgrade Plan
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
