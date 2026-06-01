'use client'

import { Edit } from 'lucide-react'

import ButtonText from '@/components/shared/ButtonText'
import DashboardSidebar from '@/components/shared/DashboardSidebar'
import EmptyContent from '@/components/shared/EmptyContent'
import Header from '@/components/shared/Header'
import { colors } from '@/constants/themes'

export default function Accounts() {
    return (
        <div className="w-full flex flex-row">
            <DashboardSidebar />
            <div className="relative w-full h-full bg-white">
                <section
                    id="hero"
                    className="w-full bg-white flex flex-col items-center justify-center px-10 mt-[60px]"
                >
                    <div className="relative flex-1 w-full p-8">
                        <Header
                            title="Accounts"
                            actions={[
                                {
                                    label: 'Add Account',
                                    onPress: () => {},
                                    isBold: true,
                                    variant: 'default',
                                },
                                {
                                    label: 'Transfer History',
                                    onPress: () => {},
                                    isBold: true,
                                    variant: 'outline',
                                },
                            ]}
                        />
                        <div className="w-full flex items-center justify-center">
                            <EmptyContent
                                header="Create your first financial account"
                                subheader="Click the Add Account button to add your first financial account"
                                icon={<Edit color={colors.primary} size={70} />}
                            />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
