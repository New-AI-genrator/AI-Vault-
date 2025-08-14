"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi';
import { useAuth } from '../contexts/MockAuthContext';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    if (stored === 'dark') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      if (next === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      try { localStorage.setItem('theme', next); } catch { }
      return next;
    });
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white/90 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800 shadow-sm' : 'bg-white dark:bg-gray-900'}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AI Tools Directory</span>
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">Home</Link>
            <Link href="/ai-tools" className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">Categories</Link>
            <Link href="/new-tools" className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">New Tools</Link>
            <Link href="/compare" className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">Compare</Link>
            <Link href="/favorites" className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">Favorites</Link>
            <Link href="/blog" className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">Blog</Link>
            <Link href="/api-docs" className="group inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
              API Docs
              <span className="ml-1 px-1.5 py-0.5 text-[10px] rounded bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/60 transition-colors">New</span>
            </Link>
          </div>

          {/* Right actions */}
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <FiMoon className="w-5 h-5" /> : <FiSun className="w-5 h-5" />}
            </button>

            {isAuthenticated ? (
              <div className="hidden md:flex items-center space-x-3">
                <span className="text-sm text-gray-700 dark:text-gray-300">Hi, {user?.name}</span>
                <button onClick={logout} className="px-3 py-1.5 text-sm rounded-md bg-red-500 text-white hover:bg-red-600">Logout</button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link href="/login" className="px-3 py-1.5 text-sm text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">Login</Link>
                <Link href="/signup" className="px-3 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700">Sign Up</Link>
                <Link href="/suggest-tool" className="px-3 py-1.5 text-sm rounded-md bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-colors">Suggest a Tool</Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen(v => !v)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-200 ${isMenuOpen ? 'max-h-96 border-t border-gray-200 dark:border-gray-800' : 'max-h-0'}`}>
        <div className="px-4 pt-2 pb-4 space-y-1 bg-white dark:bg-gray-900">
          <Link href="/" onClick={closeMenu} className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">Home</Link>
          <Link href="/ai-tools" onClick={closeMenu} className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">Categories</Link>
          <Link href="/new-tools" onClick={closeMenu} className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">New Tools</Link>
          <Link href="/compare" onClick={closeMenu} className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">Compare</Link>
          <Link href="/favorites" onClick={closeMenu} className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">Favorites</Link>
          <Link href="/blog" onClick={closeMenu} className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">Blog</Link>
          <Link href="/api-docs" onClick={closeMenu} className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">API Docs</Link>
          <Link href="/suggest-tool" onClick={closeMenu} className="block px-3 py-2 rounded-md text-sm text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">Suggest a Tool</Link>

          <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-800">
            {isAuthenticated ? (
              <button onClick={() => { closeMenu(); logout(); }} className="w-full text-left px-3 py-2 rounded-md text-sm bg-red-500 text-white hover:bg-red-600">Logout</button>
            ) : (
              <div className="flex gap-2">
                <Link href="/login" onClick={closeMenu} className="flex-1 text-center px-3 py-2 rounded-md text-sm border border-gray-200 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800">Login</Link>
                <Link href="/signup" onClick={closeMenu} className="flex-1 text-center px-3 py-2 rounded-md text-sm bg-blue-600 text-white hover:bg-blue-700">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
