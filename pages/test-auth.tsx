import { useAuth } from '../contexts/MockAuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function TestAuth() {
  const { user, isAuthenticated, login } = useAuth();
  const router = useRouter();

  // Auto-login on page load
  useEffect(() => {
    login();
  }, [login]);

  const containerStyle = {
    maxWidth: '800px',
    margin: '50px auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    lineHeight: '1.6'
  };

  const infoBoxStyle = {
    marginTop: '30px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9'
  };

  const buttonStyle = {
    padding: '10px 15px',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px'
  };

  return (
    <div style={containerStyle}>
      <h1>Authentication Test Page</h1>
      
      <div style={infoBoxStyle}>
        <h2>User Information</h2>
        {isAuthenticated ? (
          <div>
            <p><strong>Status:</strong> <span style={{color: 'green'}}>Authenticated</span></p>
            <p><strong>Name:</strong> {user?.name || 'N/A'}</p>
            <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
            <p><strong>User ID:</strong> {user?.id || 'N/A'}</p>
          </div>
        ) : (
          <p>Not authenticated</p>
        )}
      </div>

      <div style={{marginTop: '30px'}}>
        <h3>Test Navigation</h3>
        <p>Try navigating to other pages - the authentication state will be maintained.</p>
        <button 
          onClick={() => router.push('/')}
          style={buttonStyle}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
