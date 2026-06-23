import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/shared/Button';
import Card from '../components/shared/Card';
import { APP_MODES } from '../utils/constants';
import toast from 'react-hot-toast';

export default function OnboardingPage() {
  const { updateUserData } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    mode: 'menstruating',
    lastPeriodStart: '',
    periodLength: 5,
    cycleLength: 28,
    symptoms: [],
    goals: []
  });

  const totalSteps = 3;

  const handleNext = async () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Complete onboarding
      setLoading(true);
      const result = await updateUserData({
        ...formData,
        onboardingComplete: true,
        completedAt: new Date().toISOString()
      });
      if (result.success) {
        toast.success('Welcome to MyLuna! 🎉');
        navigate('/dashboard');
      }
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-serif text-plum">Tell us about yourself</h3>
            <p className="text-muted text-sm">This helps us personalize your experience</p>
            
            <div>
              <label className="block text-sm font-medium text-plum mb-2">
                What's your current situation?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(APP_MODES).map(([key, value]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, mode: value }))}
                    className={`
                      p-3 rounded-xl border text-center transition-all
                      ${formData.mode === value 
                        ? 'border-rose bg-rose-lt text-rose' 
                        : 'border-rose-md hover:border-rose'
                      }
                    `}
                  >
                    <div className="text-2xl mb-1">
                      {value === 'menstruating' && '🩸'}
                      {value === 'pregnant' && '🤰'}
                      {value === 'perimenopause' && '🌺'}
                      {value === 'postpartum' && '👶'}
                    </div>
                    <div className="text-sm capitalize">{value}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-plum mb-2">
                When did your last period start?
              </label>
              <input
                type="date"
                value={formData.lastPeriodStart}
                onChange={(e) => setFormData(prev => ({ ...prev, lastPeriodStart: e.target.value }))}
                className="w-full px-4 py-3 border border-rose-md rounded-xl focus:outline-none focus:ring-2 focus:ring-rose"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-serif text-plum">Cycle information</h3>
            <p className="text-muted text-sm">We'll use this to make accurate predictions</p>

            <div>
              <label className="block text-sm font-medium text-plum mb-2">
                Average cycle length (days)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="21"
                  max="45"
                  value={formData.cycleLength}
                  onChange={(e) => setFormData(prev => ({ ...prev, cycleLength: parseInt(e.target.value) }))}
                  className="flex-1"
                />
                <span className="text-lg font-medium text-rose w-12 text-center">
                  {formData.cycleLength}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-plum mb-2">
                Average period length (days)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="2"
                  max="10"
                  value={formData.periodLength}
                  onChange={(e) => setFormData(prev => ({ ...prev, periodLength: parseInt(e.target.value) }))}
                  className="flex-1"
                />
                <span className="text-lg font-medium text-rose w-12 text-center">
                  {formData.periodLength}
                </span>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-serif text-plum">Almost there!</h3>
            <p className="text-muted text-sm">Set your preferences</p>

            <div>
              <label className="block text-sm font-medium text-plum mb-2">
                What are your goals? (select all that apply)
              </label>
              <div className="space-y-2">
                {['Track my cycle', 'Understand my body', 'Conceive', 'Better health', 'Manage symptoms'].map(goal => (
                  <label key={goal} className="flex items-center gap-3 p-2 rounded-lg hover:bg-rose-lt cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.goals.includes(goal)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData(prev => ({ ...prev, goals: [...prev.goals, goal] }));
                        } else {
                          setFormData(prev => ({ ...prev, goals: prev.goals.filter(g => g !== goal) }));
                        }
                      }}
                      className="w-4 h-4 text-rose"
                    />
                    <span className="text-sm text-plum">{goal}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-rose-lt rounded-xl p-4">
              <p className="text-sm text-plum">
                🌟 We'll personalize your experience based on your selections
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blush px-4 py-12">
      <div className="max-w-lg w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center gap-2 mb-4">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-1 w-12 rounded-full transition-all ${
                  i < step ? 'bg-rose' : 'bg-rose-md'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-muted">Step {step} of {totalSteps}</p>
        </div>

        <Card>
          {renderStep()}

          <div className="flex gap-3 mt-6">
            {step > 1 && (
              <Button variant="outline" onClick={handleBack} className="flex-1">
                Back
              </Button>
            )}
            <Button 
              onClick={handleNext} 
              className="flex-1"
              loading={loading}
              disabled={step === 1 && !formData.lastPeriodStart}
            >
              {step === totalSteps ? 'Get Started 🎉' : 'Continue'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}