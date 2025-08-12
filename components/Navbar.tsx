"use client";

import React, { useState, useEffect } from "react";
import { categories } from "../data/categories";
import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';
import { FaHeart } from 'react-icons/fa';

export default function Navbar() {
  const [theme, setTheme] = useState("dark");
  const { user, logout } = useAuth();

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    if (saved) {
      setTheme(saved);
      document.documentElement.classList.toggle("dark", saved === "dark");
    } else {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme);
    }
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <nav className="w-full bg-white/10 backdrop-blur-md border-b border-white/20 flex items-center px-6 py-4 z-50 sticky top-0">
      <div className="flex items-center gap-3 mr-8">
        <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">AI Tools Directory</span>
        <span className="ml-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold">2025</span>
      </div>
      <ul className="hidden md:flex gap-8 text-base font-medium flex-1">
        <li><a href="/" className="text-white hover:text-blue-300 transition duration-300">Home</a></li>
        <li>
          <Link href="/favorites" className="flex items-center text-white hover:text-blue-300 transition duration-300">
            <FaHeart className="mr-1" /> Favorites
          </Link>
        </li>
        <li className="relative group">
          <button className="text-white hover:text-blue-300 transition duration-300 flex items-center gap-1">Categories <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></button>
          <div className="absolute left-0 top-full mt-2 w-[700px] bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 grid grid-cols-3 gap-6 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 z-50">
            {categories.slice(0, 6).map((cat) => (
              <div key={cat.name}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{cat.icon}</span>
                  <span className="font-semibold text-base text-white">{cat.name}</span>
                </div>
                <ul className="ml-6 list-disc text-sm text-gray-300">
                  {cat.subcategories?.slice(0, 3).map((sub) => (
                    <li key={sub.name} className="hover:text-blue-300 cursor-pointer transition duration-300">{sub.name}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </li>
        <li><a href="/compare" className="text-white hover:text-blue-300 transition duration-300">Compare</a></li>
        <li><a href="/new-tools" className="text-white hover:text-blue-300 transition duration-300">New Tools</a></li>
        <li><a href="/blog" className="text-white hover:text-blue-300 transition duration-300">Blog</a></li>
        <li><a href="#community" className="text-white hover:text-blue-300 transition duration-300">Community</a></li>
        <li><a href="/api-docs" className="text-white hover:text-blue-300 transition duration-300 flex items-center gap-1">API <span className="px-1.5 py-0.5 text-xs bg-blue-500/20 text-blue-300 rounded">Docs</span></a></li>
      </ul>
      <a
        href="/suggest-tool"
        className="ml-4 px-5 py-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold shadow hover:from-green-500 hover:to-blue-600 transition-all duration-300"
      >
        Suggest a Tool
      </a>
      
      {/* User Info and Logout */}
      <UserSection />
      <button
        className="ml-4 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
        aria-label="Toggle dark mode"
        onClick={toggleTheme}
      >
        {theme === "dark" ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 6.66l-.71-.71M4.05 4.93l-.71-.71" /></svg>
        ) : (
          <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 7.07l-1.41-1.41M6.34 6.34L4.93 4.93m12.02 0l-1.41 1.41M6.34 17.66l-1.41 1.41" /></svg>
        )}
      </button>
    </nav>
  );
}

// User Section Component
function UserSection() {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  if (!user) return null;

  return (
    <div className="ml-4 relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <span className="text-white font-medium hidden sm:block">{user.name}</span>
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {showDropdown && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 z-50">
          <div className="text-white mb-3">
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-gray-300">{user.email}</p>
            <p className="text-xs text-gray-400 mt-1">Member since {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
          <hr className="border-white/20 mb-3" />
          <button
            onClick={() => {
              logout();
              setShowDropdown(false);
            }}
            className="w-full px-3 py-2 text-left text-red-300 hover:text-red-200 hover:bg-red-500/20 rounded-lg transition-all duration-300 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}