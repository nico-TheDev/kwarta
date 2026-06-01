'use client'

import AboutSection from '@/components/landing-page/AboutSection'
import CTASection from '@/components/landing-page/CTASection'
import HeroSection from '@/components/landing-page/HeroSection'
import LandingPageFooter from '@/components/landing-page/LandingPageFooter'
import LandingPageNavbar from '@/components/landing-page/LandingPageNavbar'

export default function Home() {
    return (
        <div className="relative w-full h-full bg-white">
            <LandingPageNavbar />
            <HeroSection />
            <AboutSection />
            <CTASection />
            <LandingPageFooter />
        </div>
    )
}
