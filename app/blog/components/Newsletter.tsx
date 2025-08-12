'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiCheck, FiSend } from 'react-icons/fi';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API call
    try {
      // In a real app, you would make an API call here
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStatus('success');
      setMessage('Thank you for subscribing! Check your email to confirm.');
      setEmail('');
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <section id="subscribe" className="py-20 bg-gradient-to-br from-primary/5 via-bg to-secondary/5">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-4xl mx-auto bg-bg rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid md:grid-cols-2">
            {/* Left Side - Illustration */}
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-8 md:p-12 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <FiMail className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
                <p className="text-text/70 mb-6">Get the latest articles and news delivered to your inbox.</p>
                
                <div className="flex flex-col space-y-3 text-left max-w-xs mx-auto">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                        <FiCheck className="w-3 h-3 text-primary" />
                      </div>
                    </div>
                    <p className="ml-2 text-sm text-text/80">Weekly curated content</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                        <FiCheck className="w-3 h-3 text-primary" />
                      </div>
                    </div>
                    <p className="ml-2 text-sm text-text/80">No spam, ever</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                        <FiCheck className="w-3 h-3 text-primary" />
                      </div>
                    </div>
                    <p className="ml-2 text-sm text-text/80">Unsubscribe anytime</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Side - Form */}
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-2">Subscribe to our newsletter</h2>
              <p className="text-text/70 mb-8">Get the latest posts delivered right to your inbox.</p>
              
              {status === 'success' ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-50 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiCheck className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Success!</h3>
                  <p className="text-text/80">{message}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text/80 mb-2">
                      Email address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="h-5 w-5 text-text/40" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-border/30 bg-bg rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none transition-all"
                        placeholder="you@example.com"
                        required
                        disabled={status === 'loading'}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      disabled={status === 'loading' || !email}
                      className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {status === 'loading' ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Subscribing...
                        </>
                      ) : (
                        <>
                          <FiSend className="mr-2 h-5 w-5" />
                          Subscribe Now
                        </>
                      )}
                    </button>
                  </div>
                  
                  <p className="text-xs text-text/50 text-center">
                    We care about your data. Read our{' '}
                    <a href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </a>.
                  </p>
                  
                  {status === 'error' && (
                    <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm rounded-lg">
                      {message}
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
