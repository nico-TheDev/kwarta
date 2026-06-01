import React from 'react'

export default function CTASection() {
    return (
        <div className="w-full py-10 px-6 bg-secondary">
            <section className="py-32 bg-secondary text-center">
                <h3 className="text-4xl font-extrabold text-white">
                    Start Your Financial Journey with Confidence
                </h3>
                <p className="mt-6 text-white/80 text-lg">
                    Learn the fundamentals of money, build better habits, and
                    take control of your financial future.
                </p>
                <button className="mt-10 bg-primary text-white px-10 py-4 rounded-xl text-lg cursor-pointer">
                    Sign Up
                </button>
            </section>
        </div>
    )
}
