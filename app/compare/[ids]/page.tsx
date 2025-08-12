'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tool } from '@/types/tool';
import { getToolById } from '@/lib/tools';
import { FaArrowLeft, FaExternalLinkAlt, FaStar, FaRegStar, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { useComparison } from '@/contexts/ComparisonContext';

interface ComparisonPageProps {
  params: {
    ids: string;
  };
}

const ComparisonPage: React.FC<ComparisonPageProps> = ({ params }) => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { clearComparison } = useComparison();

  useEffect(() => {
    const loadTools = async () => {
      try {
        const ids = params.ids.split(',');
        if (ids.length < 2 || ids.length > 3) {
          throw new Error('Please select 2-3 tools to compare');
        }

        const toolPromises = ids.map(id => getToolById(id));
        const loadedTools = (await Promise.all(toolPromises)).filter(Boolean) as Tool[];
        
        if (loadedTools.length < 2) {
          throw new Error('Could not load one or more tools');
        }

        setTools(loadedTools);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    loadTools();
  }, [params.ids]);

  // Get all unique features from all tools
  const getAllFeatures = () => {
    const features = new Set<string>();
    tools.forEach(tool => {
      if (tool.features) {
        tool.features.forEach(feature => features.add(feature));
      }
    });
    return Array.from(features);
  };

  const features = getAllFeatures();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <div className="max-w-7xl mx-auto py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((j) => (
                      <div key={j} className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <div className="max-w-7xl mx-auto py-8 text-center">
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-6">
            <p>{error}</p>
          </div>
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FaArrowLeft className="mr-2" /> Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Compare AI Tools</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Side-by-side comparison of {tools.length} tools
            </p>
          </div>
          <button
            onClick={() => {
              clearComparison();
              router.push('/');
            }}
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FaTimes className="mr-2" /> Clear Comparison
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          {/* Header Row */}
          <div className="grid grid-cols-12 border-b border-gray-200 dark:border-gray-700">
            <div className="col-span-12 md:col-span-3 p-4 bg-gray-50 dark:bg-gray-800 font-medium text-gray-700 dark:text-gray-300">
              Features
            </div>
            {tools.map((tool) => (
              <div key={tool.id} className="col-span-12 md:col-span-3 p-4 border-l border-gray-200 dark:border-gray-700">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center justify-center mb-3 overflow-hidden">
                    {tool.logo ? (
                      <Image
                        src={tool.logo}
                        alt={tool.name}
                        width={40}
                        height={40}
                        className="object-contain p-1"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = '/placeholder-logo.svg';
                        }}
                      />
                    ) : (
                      <div className="text-gray-400 text-2xl">
                        {tool.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">{tool.name}</h3>
                  <div className="flex items-center mt-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-yellow-400">
                        {star <= (tool.rating || 0) ? <FaStar /> : <FaRegStar />}
                      </span>
                    ))}
                  </div>
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline mt-2"
                  >
                    Visit Website <FaExternalLinkAlt className="ml-1 text-xs" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Row */}
          <div className="grid grid-cols-12 border-b border-gray-200 dark:border-gray-700">
            <div className="col-span-12 md:col-span-3 p-4 bg-gray-50 dark:bg-gray-800 font-medium text-gray-700 dark:text-gray-300">
              Pricing
            </div>
            {tools.map((tool) => (
              <div key={tool.id} className="col-span-12 md:col-span-3 p-4 border-l border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    {tool.pricing?.startsWith('$') ? tool.pricing : `$${tool.pricing}`}
                  </span>
                  {tool.pricingPeriod && (
                    <span className="text-sm text-gray-500 dark:text-gray-400">/{tool.pricingPeriod}</span>
                  )}
                  {tool.pricingDescription && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{tool.pricingDescription}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Description Row */}
          <div className="grid grid-cols-12 border-b border-gray-200 dark:border-gray-700">
            <div className="col-span-12 md:col-span-3 p-4 bg-gray-50 dark:bg-gray-800 font-medium text-gray-700 dark:text-gray-300">
              Description
            </div>
            {tools.map((tool) => (
              <div key={tool.id} className="col-span-12 md:col-span-3 p-4 border-l border-gray-200 dark:border-gray-700">
                <p className="text-gray-700 dark:text-gray-300">{tool.description}</p>
              </div>
            ))}
          </div>

          {/* Features Rows */}
          {features.map((feature) => (
            <div key={feature} className="grid grid-cols-12 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
              <div className="col-span-12 md:col-span-3 p-4 bg-gray-50 dark:bg-gray-800 font-medium text-gray-700 dark:text-gray-300">
                {feature}
              </div>
              {tools.map((tool) => (
                <div key={tool.id} className="col-span-12 md:col-span-3 p-4 border-l border-gray-200 dark:border-gray-700">
                  <div className="flex justify-center">
                    {tool.features?.includes(feature) ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        ✓ Included
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                        ✗ Not Included
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FaArrowLeft className="mr-2" /> Back to All Tools
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ComparisonPage;
