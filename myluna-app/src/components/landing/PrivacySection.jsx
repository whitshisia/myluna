import React from 'react';
import { motion } from 'framer-motion';

const privacyItems = [
  'All data encrypted and stored locally on your device',
  'We never sell or share your health data with third parties',
  'Anonymous mode available — no account required to start',
  'Delete your data completely at any time, instantly',
  'GDPR and HIPAA compliant — independently audited'
];

export default function PrivacySection() {
  return (
    <section className="bg-plum text-white py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-rose-md text-sm font-medium uppercase tracking-wider mb-2">
            Privacy first
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
            Your body data belongs to you. Full stop.
          </h2>
          <p className="text-white/70 text-lg">
            We built myluna with privacy at the foundation — not bolted on afterward.
            Your most personal data stays personal.
          </p>
        </div>

        <div className="space-y-4">
          {privacyItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3"
            >
              <div className="w-6 h-6 rounded-full bg-rose flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.5">
                  <polyline points="1,6 4.5,9.5 11,2" />
                </svg>
              </div>
              <span className="text-white/80 text-sm">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}