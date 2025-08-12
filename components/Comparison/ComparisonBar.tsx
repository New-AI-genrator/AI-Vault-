'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useComparison } from '@/contexts/ComparisonContext';
import { Tool } from '@/types/tool';
import { FaTimes, FaChevronUp, FaChevronDown, FaBalanceScale } from 'react-icons/fa';
import Image from 'next/image';

const ComparisonBar: React.FC = () => {
  const { tools, removeFromComparison, clearComparison } = useComparison();
  const [isExpanded, setIsExpanded] = useState(true);
  const router = useRouter();

  if (tools.length === 0) {
    return null;
  }

  const handleCompareClick = () => {
    if (tools.length >= 2) {
      const toolIds = tools.map(tool => tool.id).join(',');
      router.push(`/compare/${toolIds}`);
    }
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg border-t border-gray-200 dark:border-gray-700 transition-all duration-300 ${isExpanded ? 'h-40' : 'h-12'}`}>
      <div className="container mx-auto px-4 h-full">
        {/* Header */}
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center">
            <FaBalanceScale className="text-blue-600 dark:text-blue-400 mr-2" />
            <span className="font-medium">Compare Tools ({tools.length}/3)</span>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label={isExpanded ? 'Collapse' : 'Expand'}
            >
              {isExpanded ? <FaChevronDown /> : <FaChevronUp />}
            </button>
            <button 
              onClick={clearComparison}
              className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 text-sm"
            >
              Clear All
            </button>
            <button
              onClick={handleCompareClick}
              disabled={tools.length < 2}
              className={`px-4 py-1.5 rounded-md text-sm font-medium ${
                tools.length >= 2
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed'
              }`}
            >
              Compare {tools.length >= 2 ? `(${tools.length})` : ''}
            </button>
          </div>
        </div>

        {/* Tool List */}
        {isExpanded && (
          <div className="flex items-center space-x-4 pt-3 overflow-x-auto pb-4">
            {tools.map((tool) => (
              <div 
                key={tool.id}
                className="flex flex-col items-center w-24 flex-shrink-0 relative group"
              >
                <div className="relative w-16 h-16 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center justify-center mb-1 overflow-hidden">
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
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromComparison(tool.id);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                    aria-label={`Remove ${tool.name} from comparison`}
                  >
                    <FaTimes />
                  </button>
                </div>
                <span className="text-xs text-center font-medium text-gray-700 dark:text-gray-200 truncate w-full">
                  {tool.name}
                </span>
              </div>
            ))}
            
            {tools.length < 3 && (
              <div className="flex flex-col items-center w-24 flex-shrink-0 opacity-50">
                <div className="w-16 h-16 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center">
                  <span className="text-2xl text-gray-400">+</span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Add {3 - tools.length} more
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparisonBar;
