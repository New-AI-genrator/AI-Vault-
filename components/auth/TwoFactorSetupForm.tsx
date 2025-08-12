'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface TwoFactorSetupResponse {
  secret: string;
  qrCode: string;
  otpauth_url: string;
}

export default function TwoFactorSetupForm() {
  const [step, setStep] = useState<'setup' | 'verify'>('setup');
  const [secret, setSecret] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const router = useRouter();

  // Fetch 2FA setup data when component mounts
  useEffect(() => {
    const setup2FA = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/auth/2fa/setup', {
          method: 'POST',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to set up 2FA');
        }

        const data: TwoFactorSetupResponse = await response.json();
        setSecret(data.secret);
        setQrCode(data.qrCode);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    setup2FA();
  }, []);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationCode) return;

    try {
      setIsLoading(true);
      setError('');
      
      const response = await fetch('/api/auth/2fa/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ token: verificationCode }),
      });

      if (!response.ok) {
        throw new Error('Invalid verification code');
      }

      const data = await response.json();
      setBackupCodes(data.backupCodes);
      setStep('verify');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleComplete = () => {
    router.push('/dashboard');
  };

  if (isLoading && step === 'setup') {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (step === 'verify' && backupCodes.length > 0) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">2FA Setup Complete</h2>
        <p className="mb-4">Here are your backup codes. Please save them in a safe place:</p>
        
        <div className="bg-gray-100 p-4 rounded mb-6">
          {backupCodes.map((code, index) => (
            <div key={index} className="font-mono text-center py-1">
              {code}
            </div>
          ))}
        </div>
        
        <p className="text-sm text-red-600 mb-4">
          Warning: These codes won't be shown again. Make sure to save them now!
        </p>
        
        <button
          onClick={handleComplete}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          Continue to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Set Up Two-Factor Authentication</h2>
      
      <div className="mb-6">
        <p className="mb-4">Scan the QR code with your authenticator app:</p>
        
        <div className="flex flex-col items-center mb-6">
          {qrCode ? (
            <Image
              src={qrCode}
              alt="QR Code"
              width={200}
              height={200}
              className="mb-4"
            />
          ) : (
            <div className="w-48 h-48 bg-gray-200 flex items-center justify-center mb-4">
              Loading QR code...
            </div>
          )}
          
          <div className="text-sm text-gray-600 bg-gray-100 p-3 rounded">
            <p>Or enter this code manually:</p>
            <p className="font-mono text-center mt-1">{secret}</p>
          </div>
        </div>
        
        <form onSubmit={handleVerify}>
          <div className="mb-4">
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
              Enter verification code
            </label>
            <input
              type="text"
              id="code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="123456"
              maxLength={6}
              pattern="\d{6}"
              required
            />
          </div>
          
          {error && (
            <div className="mb-4 text-red-600 text-sm">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={isLoading || verificationCode.length !== 6}
            className={`w-full py-2 px-4 rounded-md text-white font-medium ${
              isLoading || verificationCode.length !== 6
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLoading ? 'Verifying...' : 'Verify and Activate'}
          </button>
        </form>
      </div>
    </div>
  );
}
