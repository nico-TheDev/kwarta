'use client'

import DashboardSidebar from '@/components/shared/DashboardSidebar'
import Header from '@/components/shared/Header'

export default function Categories() {
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
                            title="Categories"
                            actions={[
                                {
                                    label: 'Add Category',
                                    onPress: () => {},
                                    isBold: true,
                                    variant: 'default',
                                },
                            ]}
                        />
                        <div className="w-full flex items-center justify-center">
                            {/* <EmptyContent
                                header="Create your first financial account"
                                subheader="Click the Add Account button to add your first financial account"
                                icon={<Edit color={colors.primary} size={70} />}
                            /> */}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
