import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'nextjs-toploader/app'
import { colors } from '@/constants/themes'

export default function FormHeader({ title, onClick }) {
    const router = useRouter()
    return (
        <>
            <div className="w-full flex justify-between items-center mb-6">
                <button
                    className="mb-[30px] flex items-center cursor-pointer"
                    onClick={onClick}
                >
                    <ArrowLeft size={15} color={colors.primary} />
                    <h2 className="text-sm md:text-md font-semibold text-primary ml-[10px]">
                        Go back
                    </h2>
                </button>
            </div>
            <h2 className="text-3xl font-bold text-center text-primary mb-6">
                {title}
            </h2>
        </>
    )
}
