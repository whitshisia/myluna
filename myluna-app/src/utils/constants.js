export const CYCLE_PHASES = {
  MENSTRUAL: 'menstrual',
  FOLLICULAR: 'follicular',
  OVULATION: 'ovulation',
  LUTEAL: 'luteal'
};

export const CYCLE_PHASE_INFO = {
  [CYCLE_PHASES.MENSTRUAL]: {
    name: 'Menstrual',
    days: 'Days 1-5',
    description: 'Rest and restore. Low energy is natural — honour it with gentleness.',
    icon: '🌷',
    color: '#D4537E'
  },
  [CYCLE_PHASES.FOLLICULAR]: {
    name: 'Follicular',
    days: 'Days 6-13',
    description: 'Rising oestrogen boosts focus, creativity, and motivation. A great time to start new projects.',
    icon: '🌱',
    color: '#639922'
  },
  [CYCLE_PHASES.OVULATION]: {
    name: 'Ovulation',
    days: 'Day 14',
    description: 'Peak energy, confidence, and social drive. Your most powerful few days.',
    icon: '☀️',
    color: '#EF9F27'
  },
  [CYCLE_PHASES.LUTEAL]: {
    name: 'Luteal',
    days: 'Days 15-28',
    description: 'Energy dips toward the end. Ideal for reflection, deep work, and self-care rituals.',
    icon: '🌙',
    color: '#7F77DD'
  }
};

export const SYMPTOMS = [
  { id: 'cramps', label: 'Cramps', icon: '😖' },
  { id: 'headache', label: 'Headache', icon: '🤕' },
  { id: 'bloating', label: 'Bloating', icon: '🤰' },
  { id: 'fatigue', label: 'Fatigue', icon: '😴' },
  { id: 'moodSwings', label: 'Mood Swings', icon: '🎭' },
  { id: 'acne', label: 'Acne', icon: '😩' },
  { id: 'breastTenderness', label: 'Breast Tenderness', icon: '🤱' },
  { id: 'backPain', label: 'Back Pain', icon: '🤦' },
  { id: 'nausea', label: 'Nausea', icon: '🤢' },
  { id: 'appetiteChanges', label: 'Appetite Changes', icon: '🍽️' }
];

export const FLOW_LEVELS = [
  { value: 'light', label: 'Light', emoji: '💧' },
  { value: 'moderate', label: 'Moderate', emoji: '💦' },
  { value: 'heavy', label: 'Heavy', emoji: '🌊' },
  { value: 'veryHeavy', label: 'Very Heavy', emoji: '🌊🌊' }
];

export const MOOD_LEVELS = [
  { value: 1, label: 'Very Low', emoji: '😞' },
  { value: 2, label: 'Low', emoji: '😔' },
  { value: 3, label: 'Neutral', emoji: '😐' },
  { value: 4, label: 'Good', emoji: '😊' },
  { value: 5, label: 'Excellent', emoji: '😍' }
];

export const ENERGY_LEVELS = [
  { value: 1, label: 'Exhausted', emoji: '🫠' },
  { value: 2, label: 'Tired', emoji: '😫' },
  { value: 3, label: 'Okay', emoji: '😐' },
  { value: 4, label: 'Energetic', emoji: '💪' },
  { value: 5, label: 'Very Energetic', emoji: '⚡' }
];

export const APP_MODES = {
  MENSTRUATING: 'menstruating',
  PREGNANT: 'pregnant',
  PERIMENOPAUSE: 'perimenopause',
  POSTPARTUM: 'postpartum'
};

export const PREGNANCY_WEEKS = Array.from({ length: 42 }, (_, i) => i + 1);

export const PERIMENOPAUSE_STAGES = {
  EARLY: 'early',
  MID: 'mid',
  LATE: 'late',
  POST: 'post'
};