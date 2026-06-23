import React from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: '📍',
    title: 'Accurate period prediction',
    description: 'Our algorithm learns your unique cycle length and adjusts predictions each month.'
  },
  {
    icon: '🌡️',
    title: 'Ovulation & fertility tracking',
    description: 'Know your fertile window with confidence — whether you\'re trying to conceive or planning ahead.'
  },
  {
    icon: '🧠',
    title: 'Mood & energy forecasts',
    description: 'Understand why you feel the way you feel. Cycle phases affect energy, focus, and emotion.'
  },
  {
    icon: '💊',
    title: 'Symptom logging & reports',
    description: 'Export detailed health reports you can share directly with your doctor.'
  }
];

export default function Features() {
  return (
    <section className="py-16 px-4 md:px-8 bg-white" id="features">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-rose text-sm font-medium uppercase tracking-wider mb-2">Features</p>
          <h2 className="text-3xl md:text-4xl font-serif text-plum mb-4">
            Everything your cycle needs
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Built with input from OB-GYNs and women's health experts to give you real, actionable insight.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-blush rounded-2xl p-6 border border-rose-md hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-rose-lt flex items-center justify-center text-2xl flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-medium text-plum mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-rose-lt rounded-2xl p-6 text-center">
            <div className="text-3xl font-serif text-rose font-bold">94%</div>
            <div className="text-sm text-muted">Prediction accuracy</div>
          </div>
          <div className="bg-rose-lt rounded-2xl p-6 text-center">
            <div className="text-3xl font-serif text-rose font-bold">28d</div>
            <div className="text-sm text-muted">Average cycle</div>
          </div>
          <div className="bg-rose-lt rounded-2xl p-6 text-center">
            <div className="text-3xl font-serif text-rose font-bold">7.2M+</div>
            <div className="text-sm text-muted">Cycles logged</div>
          </div>
          <div className="bg-rose-lt rounded-2xl p-6 text-center">
            <div className="text-3xl font-serif text-rose font-bold">🏆</div>
            <div className="text-sm text-muted">Most loved feature</div>
          </div>
        </div>
      </div>
    </section>
  );
}