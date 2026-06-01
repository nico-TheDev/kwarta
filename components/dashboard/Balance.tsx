import formatCurrencyPHP from '@/utils/formatCurrencyToPHP'
import React, { useEffect, useState } from 'react'
import { MdBalance, MdVisibility, MdVisibilityOff } from 'react-icons/md'
import ButtonText from '../shared/ButtonText'

export default function Balance(props) {
    // ✅ MOCK DATA (temporary)
    const accounts = [
        {
            account_name: 'Cash',
            account_amount: 5000,
            account_color: '#3b82f6',
            account_icon: 'wallet',
        },
        {
            account_name: 'Bank',
            account_amount: 15000,
            account_color: '#10b981',
            account_icon: 'bank',
        },
    ]

    const transactions = [
        { type: 'savings', amount: 3000 },
        { type: 'investments', amount: 2000 },
    ]

    const [total, setTotal] = useState(0)
    const [accountAllocation, setAccountAllocation] = useState([])
    const [showDetails, setShowDetails] = useState(false)

    useEffect(() => {
        const totalBalance = accounts.reduce((acc, current) => {
            return acc + current.account_amount
        }, 0)

        const savingsAndInvestmentsTotal = transactions
            .filter((t) => t.type === 'savings' || t.type === 'investments')
            .reduce((acc, current) => acc + current.amount, 0)

        const grandTotal = totalBalance + savingsAndInvestmentsTotal
        setTotal(grandTotal)

        const accountDistribution = accounts.map((account) => ({
            name: account.account_name,
            amount: account.account_amount,
            width: Math.floor((account.account_amount / grandTotal) * 100),
            color: account.account_color,
            icon: account.account_icon,
        }))

        const savingsPart = {
            name: 'Savings and Investments',
            amount: savingsAndInvestmentsTotal,
            width: Math.ceil((savingsAndInvestmentsTotal / grandTotal) * 100),
            color: '#7c3aed', // deep purple
            icon: 'savings',
        }

        setAccountAllocation([...accountDistribution, savingsPart])
    }, [])

    return (
        <div className="bg-white rounded-2xl shadow p-6 h-full">
            <div className="flex flex-col gap-4">
                {/* TOP SECTION */}
                <div className="flex justify-between items-start gap-4">
                    <div>
                        <p className="text-xs text-black mb-1">Total Balance</p>
                        <h2 className="text-3xl font-bold whitespace-nowrap text-primary">
                            {formatCurrencyPHP(total)}
                        </h2>
                    </div>

                    {/* Avatar */}
                    <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center text-white">
                        <MdBalance size={20} />
                    </div>
                </div>

                {/* PROGRESS BAR */}
                <div className="flex items-center overflow-hidden rounded-full h-[10px]">
                    {accountAllocation.map((account, index) => (
                        <div
                            key={index}
                            title={`${account.name}: ${formatCurrencyPHP(account.amount)}`}
                            className="h-full"
                            style={{
                                width: `${account.width}%`,
                                backgroundColor: account.color,
                            }}
                        />
                    ))}
                </div>

                {/* TOGGLE BUTTON */}
                <div className="flex justify-end">
                    <div className="w-fit">
                        <ButtonText
                            contentVariant="text-with-icon"
                            label={
                                showDetails ? 'Hide Details' : 'Show Details'
                            }
                            onPress={() => setShowDetails(!showDetails)}
                            icon={
                                showDetails ? (
                                    <MdVisibilityOff size={20} />
                                ) : (
                                    <MdVisibility size={20} />
                                )
                            }
                        />
                    </div>
                </div>
                {/* DETAILS */}
                {showDetails && (
                    <div className="max-h-[125px] overflow-y-auto mt-2">
                        {accountAllocation.map((account, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <div
                                    className="mr-2"
                                    style={{ color: account.color }}
                                >
                                    ●
                                </div>

                                <span className="text-md text-black">
                                    {account.name}
                                </span>

                                <span className="ml-auto font-bold text-black">
                                    {formatCurrencyPHP(account.amount)}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
