'use client';

import React, { useState } from 'react';
import { FiMail, FiUser, FiCheck, FiAlertCircle } from 'react-icons/fi';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface NewsletterProps {
  title?: string;
  description?: string;
  className?: string;
}

const Newsletter: React.FC<NewsletterProps> = ({
  title = 'Stay Updated',
  description = 'Subscribe to our newsletter for the latest AI tools and updates.',
  className = '',
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setError('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setStatus('success');
      setEmail('');
      setName('');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Failed to subscribe');
      console.error('Subscription error:', err);
    }
  };

  if (status === 'success') {
    return (
      <div className={`bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 md:p-8 shadow-lg ${className}`}>
        <div className="flex items-center justify-center space-x-3 text-white">
          <FiCheck className="w-6 h-6" />
          <h3 className="text-xl font-bold">Thank you for subscribing!</h3>
        </div>
        <p className="mt-2 text-blue-100 text-center">
          We've sent a confirmation email to your inbox.
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 md:p-8 shadow-lg ${className}`}>
      <div className="max-w-md mx-auto">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-blue-100 mb-6">{description}</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiUser className="h-5 w-5 text-blue-300" />
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name (optional)"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
              disabled={status === 'loading'}
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMail className="h-5 w-5 text-blue-300" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
              disabled={status === 'loading'}
            />
          </div>
          
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
          
          <p className="text-xs text-blue-100 text-center">
            We respect your privacy. Unsubscribe at any time.
          </p>
          
          {status === 'error' && (
            <div className="flex items-center justify-center space-x-2 text-red-200 text-sm">
              <FiAlertCircle className="w-4 h-4" />
              <span>{error || 'Failed to subscribe. Please try again.'}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
