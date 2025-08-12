'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TwoFactorSetupForm from '@/components/auth/TwoFactorSetupForm';

export default function TwoFactorSetupPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [has2FA, setHas2FA] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const check2FAStatus = async () => {
      try {
        const response = await fetch('/api/auth/me', {
          credentials: 'include',
        });

        if (response.ok) {
          const user = await response.json();
          if (user.isTwoFactorEnabled) {
            setHas2FA(true);
          }
        }
      } catch (error) {
        console.error('Error checking 2FA status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    check2FAStatus();
  }, []);

  const handleDisable2FA = async () => {
    if (!window.confirm('Are you sure you want to disable two-factor authentication? This will make your account less secure.')) {
      return;
    }

    try {
      const response = await fetch('/api/auth/2fa/disable', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        setHas2FA(false);
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to disable 2FA');
      }
    } catch (error) {
      console.error('Error disabling 2FA:', error);
      alert(error instanceof Error ? error.message : 'Failed to disable 2FA');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Two-Factor Authentication
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Add an extra layer of security to your account
          </p>
        </div>
        
        <div className="px-4 py-5 sm:p-6">
          {has2FA ? (
            <div className="space-y-4">
              <div className="bg-green-50 border-l-4 border-green-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-700">
                      Two-factor authentication is <span className="font-bold">enabled</span> on your account.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleDisable2FA}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Disable Two-Factor Authentication
                </button>
              </div>
            </div>
          ) : (
            <TwoFactorSetupForm />
          )}
        </div>
      </div>
    </div>
  );
}
