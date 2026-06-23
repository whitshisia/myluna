import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../shared/Button';
import Input from '../shared/Input';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await resetPassword(email);
    if (result.success) {
      setSent(true);
    }
    setLoading(false);
  };

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blush px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="text-4xl mb-4">📧</div>
          <h2 className="text-2xl font-serif text-plum mb-2">Check Your Email</h2>
          <p className="text-muted mb-6">
            We've sent a password reset link to <strong>{email}</strong>
          </p>
          <Link to="/login" className="text-rose hover:underline">
            Back to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blush px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-serif text-plum">Reset Password</h2>
          <p className="text-muted text-sm mt-1">
            Enter your email and we'll send you a reset link
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />

          <Button
            type="submit"
            fullWidth
            loading={loading}
            className="mt-4"
          >
            Send Reset Link
          </Button>
        </form>

        <p className="text-center mt-4 text-sm">
          <Link to="/login" className="text-rose hover:underline">
            Back to Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}