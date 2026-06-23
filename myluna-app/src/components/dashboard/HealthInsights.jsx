import React from 'react';
import Card from '../shared/Card';
import { generateInsights } from '../../utils/cycleCalculations';

export default function HealthInsights({ cycleData }) {
  const insights = generateInsights(cycleData || {});

  const dailyInsights = [
    {
      icon: '🌙',
      title: 'Rest and Recover',
      description: 'Your body is doing amazing things. Take time to rest and be kind to yourself today.'
    },
    {
      icon: '💧',
      title: 'Stay Hydrated',
      description: 'Drinking enough water can help reduce cramps and fatigue. Aim for 2-3 liters today.'
    },
    {
      icon: '🧘',
      title: 'Gentle Movement',
      description: 'Light stretching or yoga can help relieve tension and improve your mood.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Cycle Insights */}
      <Card>
        <h3 className="text-lg font-medium text-plum mb-4">Cycle Insights</h3>
        {insights.length > 0 ? (
          <div className="space-y-3">
            {insights.map((insight, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-blush rounded-xl">
                <span className="text-2xl">{insight.icon}</span>
                <div>
                  <p className="text-sm text-plum font-medium">{insight.message}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted text-sm">Log more cycles to see personalized insights.</p>
        )}
      </Card>

      {/* Daily Tips */}
      <Card>
        <h3 className="text-lg font-medium text-plum mb-4">Daily Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {dailyInsights.map((tip, index) => (
            <div key={index} className="p-4 bg-blush rounded-xl text-center">
              <div className="text-3xl mb-2">{tip.icon}</div>
              <h4 className="font-medium text-plum text-sm">{tip.title}</h4>
              <p className="text-xs text-muted mt-1">{tip.description}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Phase Information */}
      <Card>
        <h3 className="text-lg font-medium text-plum mb-4">Understanding Your Cycle</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-rose-lt rounded-xl">
            <span className="text-2xl">🌷</span>
            <div>
              <h4 className="font-medium text-plum text-sm">Menstrual Phase (Days 1-5)</h4>
              <p className="text-xs text-muted">Rest and restore. Low energy is natural — honour it with gentleness.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-green/10 rounded-xl">
            <span className="text-2xl">🌱</span>
            <div>
              <h4 className="font-medium text-plum text-sm">Follicular Phase (Days 6-13)</h4>
              <p className="text-xs text-muted">Rising oestrogen boosts focus, creativity, and motivation.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-amber/10 rounded-xl">
            <span className="text-2xl">☀️</span>
            <div>
              <h4 className="font-medium text-plum text-sm">Ovulation (Day 14)</h4>
              <p className="text-xs text-muted">Peak energy, confidence, and social drive.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-purple-100 rounded-xl">
            <span className="text-2xl">🌙</span>
            <div>
              <h4 className="font-medium text-plum text-sm">Luteal Phase (Days 15-28)</h4>
              <p className="text-xs text-muted">Ideal for reflection, deep work, and self-care rituals.</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}