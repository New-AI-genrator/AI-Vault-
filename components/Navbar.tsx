import Link from 'next/link';
import { useAuth } from '../contexts/MockAuthContext';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold">
              AI Tools Directory
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <Link href="/tools" className="hover:text-blue-600">
              Tools
            </Link>
            <Link href="/blog" className="hover:text-blue-600">
              Blog
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span>Welcome, {user?.name}</span>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login"
                  className="px-4 py-2 text-gray-700 hover:text-blue-600"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
