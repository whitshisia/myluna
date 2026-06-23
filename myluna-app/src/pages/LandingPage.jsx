import React from 'react';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import Testimonials from '../components/landing/Testimonials';
import PrivacySection from '../components/landing/PrivacySection';
import CTASection from '../components/landing/CTASection';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-blush">
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <PrivacySection />
      <CTASection />
      <Footer />
    </div>
  );
}