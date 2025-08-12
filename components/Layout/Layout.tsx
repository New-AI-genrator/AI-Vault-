import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '../Navbar';
import AIAssistant from '../AIAssistant';
import Footer from '../Footer/Footer';
import { ComparisonProvider } from '@/contexts/ComparisonContext';

// Dynamically import ComparisonBar to avoid SSR issues with localStorage
const ComparisonBar = dynamic(
  () => import('@/components/Comparison/ComparisonBar'),
  { ssr: false }
);

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <ComparisonProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <main className="container mx-auto px-4 py-8 flex-grow">
          {children}
        </main>
        <Footer />
        <AIAssistant />
        <ComparisonBar />
      </div>
    </ComparisonProvider>
  );
};

export default Layout;
