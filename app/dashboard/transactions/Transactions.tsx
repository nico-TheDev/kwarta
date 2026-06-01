'use client'

import { Edit } from 'lucide-react'

import DashboardSidebar from '@/components/shared/DashboardSidebar'
import EmptyContent from '@/components/shared/EmptyContent'
import Header from '@/components/shared/Header'
import { colors } from '@/constants/themes'

export default function Transactions() {
    return (
        <div className="w-full flex flex-row">
            <DashboardSidebar />
            <div className="relative w-full h-full bg-white">
                <section
                    id="hero"
                    className="w-full bg-white flex flex-col items-center justify-center px-10 mt-[60px]"
                >
                    <div className="relative flex-1 w-full p-8">
                        <Header title="Transactions" actions={[]} />
                        <div className="w-full flex items-center justify-center">
                            <EmptyContent
                                header="Create your first transaction"
                                subheader="Click the Add Transaction button to add your first transaction"
                                icon={<Edit color={colors.primary} size={70} />}
                            />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
