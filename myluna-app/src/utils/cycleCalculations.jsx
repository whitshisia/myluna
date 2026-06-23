import { 
  differenceInDays, 
  addDays, 
  subDays, 
  format, 
  isWithinInterval,
  parseISO,
  eachDayOfInterval
} from 'date-fns';

// Calculate cycle length from period history
export const calculateCycleLength = (periodHistory) => {
  if (!periodHistory || periodHistory.length < 2) return 28;
  
  const lengths = [];
  for (let i = 1; i < periodHistory.length; i++) {
    const diff = differenceInDays(
      parseISO(periodHistory[i].startDate),
      parseISO(periodHistory[i-1].startDate)
    );
    if (diff > 0 && diff < 60) {
      lengths.push(diff);
    }
  }
  
  if (lengths.length === 0) return 28;
  const avg = lengths.reduce((a, b) => a + b, 0) / lengths.length;
  return Math.round(avg);
};

// Predict next period date
export const predictNextPeriod = (lastPeriodStart, averageCycleLength) => {
  return addDays(parseISO(lastPeriodStart), averageCycleLength);
};

// Calculate ovulation date
export const calculateOvulation = (nextPeriodDate, lutealPhaseLength = 14) => {
  return subDays(parseISO(nextPeriodDate), lutealPhaseLength);
};

// Calculate fertile window
export const calculateFertileWindow = (ovulationDate) => {
  const ovulation = parseISO(ovulationDate);
  const start = subDays(ovulation, 5);
  const end = addDays(ovulation, 1);
  return { start, end };
};

// Determine cycle phase
export const getCyclePhase = (currentDate, periodStart, cycleLength) => {
  const day = differenceInDays(
    parseISO(currentDate),
    parseISO(periodStart)
  ) % cycleLength + 1;
  
  if (day <= 5) return { phase: 'menstrual', day };
  if (day <= 13) return { phase: 'follicular', day };
  if (day === 14) return { phase: 'ovulation', day };
  if (day <= 28) return { phase: 'luteal', day };
  return { phase: 'unknown', day };
};

// Get period days in a month
export const getPeriodDaysInMonth = (periodHistory, year, month) => {
  const days = [];
  periodHistory.forEach(period => {
    const start = parseISO(period.startDate);
    const end = parseISO(period.endDate);
    
    eachDayOfInterval({ start, end }).forEach(day => {
      if (day.getFullYear() === year && day.getMonth() === month) {
        days.push(day.getDate());
      }
    });
  });
  return days;
};

// Calculate average symptoms for a phase
export const getAverageSymptoms = (symptoms, phase) => {
  const filtered = symptoms.filter(s => s.phase === phase);
  if (filtered.length === 0) return null;
  
  const averages = {};
  const keys = Object.keys(filtered[0]).filter(k => 
    !['id', 'userId', 'date', 'phase', 'createdAt'].includes(k)
  );
  
  keys.forEach(key => {
    const sum = filtered.reduce((acc, curr) => acc + (curr[key] || 0), 0);
    averages[key] = sum / filtered.length;
  });
  
  return averages;
};

// Generate cycle insights
export const generateInsights = (cycleData) => {
  const insights = [];
  const { periodHistory, symptoms } = cycleData;
  
  // Regularity insight
  if (periodHistory.length >= 3) {
    const lengths = periodHistory.map((p, i) => {
      if (i === 0) return null;
      return differenceInDays(
        parseISO(p.startDate),
        parseISO(periodHistory[i-1].startDate)
      );
    }).filter(Boolean);
    
    const variance = Math.max(...lengths) - Math.min(...lengths);
    if (variance <= 3) {
      insights.push({
        type: 'regularity',
        message: 'Your cycle is very regular! Great consistency.',
        icon: '📊'
      });
    } else if (variance <= 7) {
      insights.push({
        type: 'regularity',
        message: 'Your cycle is fairly regular. Minor variations are normal.',
        icon: '📈'
      });
    } else {
      insights.push({
        type: 'regularity',
        message: 'Your cycle varies. Consider tracking any lifestyle changes.',
        icon: '🔄'
      });
    }
  }
  
  // Symptom patterns
  if (symptoms && symptoms.length > 0) {
    const commonSymptoms = {};
    symptoms.forEach(s => {
      Object.keys(s).forEach(key => {
        if (typeof s[key] === 'number' && s[key] > 3) {
          commonSymptoms[key] = (commonSymptoms[key] || 0) + 1;
        }
      });
    });
    
    const mostCommon = Object.entries(commonSymptoms)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2);
    
    if (mostCommon.length > 0) {
      insights.push({
        type: 'symptoms',
        message: `Common symptoms: ${mostCommon.map(([key]) => key).join(', ')}`,
        icon: '💡'
      });
    }
  }
  
  return insights;
};