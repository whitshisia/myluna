import React, { useState } from 'react';
import { format } from 'date-fns';
import Card from '../shared/Card';
import Button from '../shared/Button';
import { SYMPTOMS, FLOW_LEVELS, MOOD_LEVELS, ENERGY_LEVELS } from '../../utils/constants';
import toast from 'react-hot-toast';

export default function SymptomLogger({ onLog }) {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [flowLevel, setFlowLevel] = useState('');
  const [mood, setMood] = useState(3);
  const [energy, setEnergy] = useState(3);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSymptomToggle = (symptomId) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const symptomData = {
      date: new Date().toISOString(),
      symptoms: selectedSymptoms,
      flowLevel,
      mood,
      energy,
      notes,
      phase: 'follicular',
    };

    const result = await onLog(symptomData);
    if (result && result.success) {
      toast.success('Symptoms logged successfully!');
      setSelectedSymptoms([]);
      setFlowLevel('');
      setMood(3);
      setEnergy(3);
      setNotes('');
    } else {
      toast.error('Error logging symptoms');
    }
    setLoading(false);
  };

  return (
    <Card>
      <h3 className="text-lg font-medium text-plum mb-4">
        Log Your Symptoms
      </h3>
      <p className="text-sm text-muted mb-6">
        {format(new Date(), 'EEEE, MMMM d, yyyy')}
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Symptoms */}
        <div>
          <label className="block text-sm font-medium text-plum mb-2">
            Select Symptoms
          </label>
          <div className="flex flex-wrap gap-2">
            {SYMPTOMS.map(symptom => (
              <button
                key={symptom.id}
                type="button"
                onClick={() => handleSymptomToggle(symptom.id)}
                className={`
                  px-3 py-2 rounded-full text-sm transition-all
                  ${selectedSymptoms.includes(symptom.id)
                    ? 'bg-rose text-white'
                    : 'bg-rose-lt text-muted hover:bg-rose-md'
                  }
                `}
              >
                {symptom.icon} {symptom.label}
              </button>
            ))}
          </div>
        </div>

        {/* Flow Level */}
        <div>
          <label className="block text-sm font-medium text-plum mb-2">
            Flow Level
          </label>
          <div className="flex flex-wrap gap-2">
            {FLOW_LEVELS.map(level => (
              <button
                key={level.value}
                type="button"
                onClick={() => setFlowLevel(level.value)}
                className={`
                  px-4 py-2 rounded-full text-sm transition-all
                  ${flowLevel === level.value
                    ? 'bg-rose text-white'
                    : 'bg-rose-lt text-muted hover:bg-rose-md'
                  }
                `}
              >
                {level.emoji} {level.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mood */}
        <div>
          <label className="block text-sm font-medium text-plum mb-2">
            Mood
          </label>
          <div className="flex flex-wrap gap-2">
            {MOOD_LEVELS.map(level => (
              <button
                key={level.value}
                type="button"
                onClick={() => setMood(level.value)}
                className={`
                  px-3 py-2 rounded-full text-sm transition-all
                  ${mood === level.value
                    ? 'bg-rose text-white'
                    : 'bg-rose-lt text-muted hover:bg-rose-md'
                  }
                `}
              >
                {level.emoji} {level.label}
              </button>
            ))}
          </div>
        </div>

        {/* Energy */}
        <div>
          <label className="block text-sm font-medium text-plum mb-2">
            Energy Level
          </label>
          <div className="flex flex-wrap gap-2">
            {ENERGY_LEVELS.map(level => (
              <button
                key={level.value}
                type="button"
                onClick={() => setEnergy(level.value)}
                className={`
                  px-3 py-2 rounded-full text-sm transition-all
                  ${energy === level.value
                    ? 'bg-rose text-white'
                    : 'bg-rose-lt text-muted hover:bg-rose-md'
                  }
                `}
              >
                {level.emoji} {level.label}
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-plum mb-2">
            Notes (optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-4 py-3 border border-rose-md rounded-xl focus:outline-none focus:ring-2 focus:ring-rose"
            rows="3"
            placeholder="Any additional notes about how you're feeling..."
          />
        </div>

        <Button
          type="submit"
          fullWidth
          loading={loading}
          disabled={selectedSymptoms.length === 0}
        >
          Log Symptoms
        </Button>
      </form>
    </Card>
  );
}