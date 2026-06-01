import React from 'react'
import { FaChartLine, FaEye, FaBook, FaLightbulb } from 'react-icons/fa'

export default function AboutSection() {
    const cards = [
        {
            title: 'Cash Flow Monitoring',
            description:
                'Start monitoring the flow of your finances and be aware of your spending habits.',
            icon: <FaChartLine className="text-white text-3xl" />,
        },
        {
            title: 'Visual Analytics',
            description:
                'Intelligent data presentations that simplify complexity effortlessly.',
            icon: <FaEye className="text-white text-3xl" />,
        },
        {
            title: 'Finance Articles',
            description:
                'Read about different articles related to financial literacy and other fields of money.',
            icon: <FaBook className="text-white text-3xl" />,
        },
        {
            title: 'Decision Support System',
            description:
                "Gives you insight about topics you're not familiar about.",
            icon: <FaLightbulb className="text-white text-3xl" />,
        },
    ]

    return (
        <div className="w-full py-10 px-6 bg-white">
            <section className="relative w-full py-24 bg-white overflow-hidden">
                <div className="relative max-w-6xl mx-auto px-6 text-center">
                    {/* Heading */}
                    <h2 className="text-4xl md:text-5xl font-extrabold text-black leading-tight">
                        What is <span className="text-primary">CASH</span>?
                    </h2>

                    {/* Description */}
                    <p className="mt-6 text-lg text-black/70 max-w-3xl mx-auto">
                        <span className="font-semibold text-black">
                            CASH (Classify and Analyze Spending Habits)
                        </span>{' '}
                        is a modern financial literacy platform designed to help
                        you learn by doing. It transforms complex financial
                        concepts into practical, real-world experiences.
                    </p>

                    <p className="mt-4 text-lg text-black/70 max-w-3xl mx-auto">
                        From tracking your spending to exploring investments and
                        reading curated financial content, CASH empowers you to
                        build smarter financial habits with confidence.
                    </p>

                    {/* Feature Cards */}
                    <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {cards.map((card, index) => (
                            <div
                                key={index}
                                className={`p-6 rounded-2xl backdrop-blur-xl bg-primary ? "border border-white/10" : ""
          } shadow-lg hover:scale-105 transition-all`}
                            >
                                <div className="flex justify-center items-center mb-4">
                                    {card.icon}
                                </div>

                                <h4 className="text-xl font-semibold text-white">
                                    {card.title}
                                </h4>
                                <p className="mt-3 text-white/80 text-sm">
                                    {card.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
