import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../shared/Button';
import { sendEmailVerification } from '../../firebase';

export default function VerifyEmail() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (currentUser?.emailVerified) {
      navigate('/onboarding');
    }
  }, [currentUser, navigate]);

  const handleResend = async () => {
    setLoading(true);
    try {
      await sendEmailVerification(currentUser);
      setMessage('Verification email sent! Check your inbox.');
    } catch (error) {
      setMessage('Error sending verification email. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blush px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="text-4xl mb-4">✉️</div>
        <h2 className="text-2xl font-serif text-plum mb-2">Verify Your Email</h2>
        <p className="text-muted mb-4">
          We've sent a verification link to <strong>{currentUser?.email}</strong>
        </p>
        <p className="text-sm text-muted mb-6">
          Please check your email and click the verification link to continue.
        </p>

        {message && (
          <div className="mb-4 p-3 rounded-lg bg-rose-lt text-rose-dk text-sm">
            {message}
          </div>
        )}

        <Button
          onClick={handleResend}
          loading={loading}
          fullWidth
        >
          Resend Verification Email
        </Button>

        <button
          onClick={() => navigate('/')}
          className="mt-4 text-muted hover:text-rose text-sm transition-colors"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}