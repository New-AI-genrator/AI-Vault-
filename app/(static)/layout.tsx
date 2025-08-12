import { Metadata } from 'next';
import Link from 'next/link';
import '../globals.css';

export const metadata: Metadata = {
  title: 'AI Tools Directory',
  description: 'Your gateway to the best AI tools and resources',
};

export default function StaticPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-indigo-600">
            AI Tools Directory
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/about" className="text-gray-700 hover:text-indigo-600">
              About Us
            </Link>
            <Link href="/privacy" className="text-gray-700 hover:text-indigo-600">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-700 hover:text-indigo-600">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-indigo-600">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          {children}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:justify-start space-x-6">
              <Link href="/about" className="text-gray-400 hover:text-gray-500">
                About
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-gray-500">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-gray-500">
                Terms
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-gray-500">
                Contact
              </Link>
            </div>
            <div className="mt-8 md:mt-0 text-center md:text-right">
              <p className="text-base text-gray-400">
                &copy; {new Date().getFullYear()} AI Tools Directory. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
