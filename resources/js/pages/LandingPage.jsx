import React from 'react';
import "../../css/app.css";
import Navbar from '../components/common/Navbar.jsx';
import Hero from '../components/landing/Hero.jsx';
import Featured from '../components/landing/Featured.jsx';
import HowItWorks from '../components/landing/HowItWorks.jsx'
import Testimonials from '../components/landing/Testimonials.jsx';
import Statistics from '../components/landing/Statistics.jsx';
import FAQ from '../components/landing/FAQ.jsx';
import LatestUpdates from '../components/landing/LatestUpdates.jsx';
import Footer from '../components/common/Footer.jsx';


export default function LandingPage() {
    return (
        <>
            <Navbar />
            <Hero />
            <Featured />
            <HowItWorks />
            <Testimonials />
            <Statistics />
            <FAQ />
            <LatestUpdates />
            <Footer />
        </>
    );
}
