'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function TwoFactorVerificationForm() {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showBackupCode, setShowBackupCode] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || code.length !== 6) return;

    try {
      setIsLoading(true);
      setError('');

      const response = await fetch('/api/auth/2fa/login-verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email,
          token: code 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Verification failed');
      }

      // Redirect to dashboard or intended URL
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed');
      setCode('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseBackupCode = () => {
    setShowBackupCode(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Two-Factor Authentication
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {showBackupCode
              ? 'Enter one of your backup codes'
              : 'Enter the 6-digit code from your authenticator app'}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="code" className="sr-only">
                {showBackupCode ? 'Backup Code' : 'Verification Code'}
              </label>
              <input
                id="code"
                name="code"
                type={showBackupCode ? 'text' : 'tel'}
                autoComplete={showBackupCode ? 'one-time-code' : 'off'}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder={showBackupCode ? 'Backup code' : '123456'}
                value={code}
                onChange={(e) => {
                  const value = showBackupCode 
                    ? e.target.value 
                    : e.target.value.replace(/\D/g, '').slice(0, 6);
                  setCode(value);
                }}
                maxLength={showBackupCode ? 12 : 6}
                pattern={showBackupCode ? '.{8,12}' : '\d{6}'}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading || (showBackupCode ? code.length < 8 : code.length !== 6)}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isLoading || (showBackupCode ? code.length < 8 : code.length !== 6)
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              }`}
            >
              {isLoading ? 'Verifying...' : 'Verify'}
            </button>
          </div>
        </form>

        {!showBackupCode && (
          <div className="text-center">
            <button
              type="button"
              onClick={handleUseBackupCode}
              className="text-sm text-blue-600 hover:text-blue-500 focus:outline-none"
            >
              Use a backup code instead
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
