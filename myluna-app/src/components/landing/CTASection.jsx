import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../shared/Button';
import Input from '../shared/Input';
import toast from 'react-hot-toast';

export default function CTASection() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      toast.success('Thanks for your interest! We\'ll keep you updated.');
      setEmail('');
    }
  };

  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-rose-lt via-blush to-rose-md">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-serif text-plum mb-4">
          Start understanding your body today.
        </h2>
        <p className="text-muted text-lg mb-8">
          Join 2.4 million women who've taken control of their cycle health.
          Free forever, no credit card needed.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1"
            required
          />
          <Link to="/register">
            <Button type="submit" size="lg" fullWidth>
              Get the app →
            </Button>
          </Link>
        </form>

        <p className="text-sm text-muted mt-4">
          Available on iOS & Android · No credit card required · Cancel anytime
        </p>
      </div>
    </section>
  );
}