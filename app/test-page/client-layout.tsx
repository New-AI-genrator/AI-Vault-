'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/contexts/AuthContext';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {children}
      </main>
      <Footer />
    </AuthProvider>
  );
}
