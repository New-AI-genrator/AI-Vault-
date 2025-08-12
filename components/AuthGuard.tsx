import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      const publicPaths = ['/login', '/signup'];
      if (!publicPaths.includes(router.pathname)) {
        router.push('/login');
      }
    }
  }, [user, isLoading, router]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading THE WAR ROOM...</p>
        </div>
      </div>
    );
  }

  // Show children if user is authenticated or on public pages
  const publicPaths = ['/login', '/signup'];
  if (user || publicPaths.includes(router.pathname)) {
    return <>{children}</>;
  }

  // Redirect to login if not authenticated
  return null;
}
