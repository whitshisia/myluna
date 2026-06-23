import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../shared/Button';
import PhoneMockup from './PhoneMockup';

export default function Hero() {
  return (
    <section className="min-h-[92vh] grid grid-cols-1 lg:grid-cols-2 gap-8 items-center px-4 md:px-8 py-12 lg:py-20 max-w-7xl mx-auto relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute right-0 top-0 w-96 h-96 bg-rose-lt rounded-full blur-3xl opacity-30 pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <div className="inline-flex items-center gap-2 text-rose text-sm font-medium uppercase tracking-wider mb-4">
          <span>♡</span> Understand your body. Love your cycle.
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-plum leading-tight mb-4">
          Your cycle.<br />
          <span className="text-rose italic">Your power.</span>
        </h1>
        
        <p className="text-muted text-lg max-w-md mb-8 leading-relaxed">
          Track your period, predict your cycle, and understand your body better — 
          every single day. Because you deserve to feel in control.
        </p>
        
        <div className="flex flex-wrap gap-4">
          <Link to="/register">
            <Button size="lg">Start tracking — it's free</Button>
          </Link>
          <Button variant="outline" size="lg">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0a8 8 0 110 16A8 8 0 018 0zm0 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zm-1 4.25a.75.75 0 011.5 0v3.69l2.03 1.17a.75.75 0 01-.75 1.3l-2.4-1.39A.75.75 0 017 9.75V5.75z"/>
            </svg>
            See how it works
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap gap-6 mt-8 pt-8 border-t border-rose-md">
          <div className="flex items-center gap-2">
            <span className="text-rose">❤️</span>
            <span><strong>2.4M</strong> women tracking</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-amber">⭐</span>
            <span><strong>4.9</strong> / 5 rating</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green">🔒</span>
            <span><strong>100%</strong> private</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="hidden lg:block relative"
      >
        <PhoneMockup />
      </motion.div>
    </section>
  );
}