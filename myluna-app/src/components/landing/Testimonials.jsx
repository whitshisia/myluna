import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "I've tried every period app out there. myluna is the first one that makes me feel genuinely understood, not just tracked.",
    name: "Naomi W.",
    location: "Lagos, Nigeria",
    initials: "NW",
    color: "#D4537E"
  },
  {
    quote: "The cycle phase insights changed how I plan my work week. I schedule big presentations during ovulation now and it actually works.",
    name: "Sana P.",
    location: "Mumbai, India",
    initials: "SP",
    color: "#7F77DD"
  },
  {
    quote: "I used the symptom export report at my gynaecology appointment. My doctor was genuinely impressed and said it saved us 20 minutes.",
    name: "Clara L.",
    location: "São Paulo, Brazil",
    initials: "CL",
    color: "#639922"
  }
];

export default function Testimonials() {
  return (
    <section className="py-16 px-4 md:px-8 bg-rose-lt" id="reviews">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-rose text-sm font-medium uppercase tracking-wider mb-2">Reviews</p>
          <h2 className="text-3xl md:text-4xl font-serif text-plum">
            Women who get it now
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-rose-md shadow-sm hover:shadow-lg transition-all"
            >
              <div className="text-rose text-lg mb-3">★★★★★</div>
              <blockquote className="text-muted text-sm italic leading-relaxed mb-4">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-sm"
                  style={{ background: testimonial.color }}
                >
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-medium text-plum text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted">{testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}