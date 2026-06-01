import React from 'react'
import { useRouter } from 'nextjs-toploader/app'

export default function HeroSection() {
    const router = useRouter()
    return (
        <div className="w-full py-10 px-6 min-h-screen flex items-center bg-[url('/images/landing-bg.jpg')] bg-cover bg-center bg-no-repeat relative">
            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-black/60"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
                    <span className="text-[#06F9F5] drop-shadow-primary">
                        Smarter Finance
                    </span>{' '}
                    Starts Here
                </h2>

                <p className="mt-6 text-lg md:text-xl text-white max-w-2xl mx-auto">
                    Learn, manage, and grow your money with confidence.
                </p>

                <div className="mt-10 flex justify-center gap-6">
                    <button
                        className="bg-primary cursor-pointer text-white px-8 py-4 rounded-xl text-lg"
                        onClick={() => router.push('/')}
                    >
                        Learn more
                    </button>
                </div>
            </div>
        </div>
    )
}
