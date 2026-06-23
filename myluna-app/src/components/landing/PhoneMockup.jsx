import React from 'react';
import { motion } from 'framer-motion';

export default function PhoneMockup() {
  const today = 4;
  const periodDays = [2, 3, 4, 5, 6];
  const fertileDays = [11, 12, 13, 14, 16, 17];

  const getDayClass = (day) => {
    if (day === today && periodDays.includes(day)) return 'bg-rose text-white border-2 border-rose';
    if (day === today) return 'border-2 border-rose text-rose';
    if (periodDays.includes(day)) return 'bg-rose text-white';
    if (fertileDays.includes(day)) return 'bg-rose-md text-rose-dk';
    return 'text-plum';
  };

  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3, repeat: Infinity }}
      className="relative w-[320px] mx-auto"
    >
      {/* Floating badges */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="absolute -left-16 top-20 bg-white rounded-2xl shadow-lg p-3 flex items-center gap-3 z-10"
      >
        <div className="w-10 h-10 rounded-full bg-rose-lt flex items-center justify-center text-xl">🌙</div>
        <div>
          <div className="text-xs text-muted">Cycle day</div>
          <div className="font-semibold text-plum">Day 16</div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2.5, delay: 0.5, repeat: Infinity }}
        className="absolute -right-16 bottom-40 bg-white rounded-2xl shadow-lg p-3 flex items-center gap-3 z-10"
      >
        <div className="w-10 h-10 rounded-full bg-amber/20 flex items-center justify-center text-xl">✨</div>
        <div>
          <div className="text-xs text-muted">Peak energy</div>
          <div className="font-semibold text-plum">Ovulation week</div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2.5, delay: 1, repeat: Infinity }}
        className="absolute -left-16 bottom-20 bg-white rounded-2xl shadow-lg p-3 flex items-center gap-3 z-10"
      >
        <div className="w-10 h-10 rounded-full bg-green/20 flex items-center justify-center text-xl">💚</div>
        <div>
          <div className="text-xs text-muted">Next period</div>
          <div className="font-semibold text-plum">12 days away</div>
        </div>
      </motion.div>

      {/* Phone frame */}
      <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-rose-md">
        {/* Notch */}
        <div className="h-8 bg-blush flex items-center justify-center border-b border-rose-md">
          <div className="w-16 h-1.5 bg-rose-md rounded-full" />
        </div>

        <div className="p-4">
          {/* Header */}
          <div className="mb-4">
            <h3 className="text-lg font-medium text-plum">Hello, Aisha 👋</h3>
            <p className="text-sm text-muted">Here's your cycle overview</p>
          </div>

          {/* Status */}
          <div className="bg-rose-lt rounded-2xl p-3 flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-rose flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-white" />
            </div>
            <div>
              <p className="text-xs text-muted">Today</p>
              <p className="text-sm font-medium text-plum">Day 5 of period · Flow is moderate</p>
            </div>
          </div>

          {/* Calendar */}
          <div className="mb-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-plum">June 2026</span>
              <div className="flex gap-2">
                <button className="text-muted hover:text-rose">‹</button>
                <button className="text-muted hover:text-rose">›</button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-0.5 text-center">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                <div key={day} className="text-xs text-muted font-medium py-1">{day}</div>
              ))}
              {[31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 1].map((day, index) => {
                const isOtherMonth = index < 2 || index > 30;
                return (
                  <div
                    key={index}
                    className={`
                      text-sm py-1 rounded-full w-8 h-8 flex items-center justify-center mx-auto
                      ${isOtherMonth ? 'text-rose-md/50' : getDayClass(day)}
                    `}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="flex gap-4 mb-3 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-rose" />
              <span className="text-muted">Period</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-rose-md" />
              <span className="text-muted">Fertile</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-amber" />
              <span className="text-muted">Ovulation</span>
            </div>
          </div>

          {/* Insight */}
          <div className="bg-blush rounded-2xl p-3 flex items-start gap-3">
            <div className="text-lg">💡</div>
            <div>
              <p className="text-sm font-medium text-plum">Daily insight</p>
              <p className="text-xs text-muted">Your body is doing amazing things today. Rest and be kind to yourself.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}