'use client';

import React, { useState, useEffect } from 'react';
import { Tool } from '@/types/tool';
import { useComparison } from '@/contexts/ComparisonContext';
import { FaBalanceScale, FaCheck, FaPlus } from 'react-icons/fa';

interface ComparisonButtonProps {
  tool: Tool;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const ComparisonButton: React.FC<ComparisonButtonProps> = ({
  tool,
  size = 'md',
  showLabel = true,
  className = '',
}) => {
  const { addToComparison, removeFromComparison, isInComparison, canAddMore } = useComparison();
  const [isInCompare, setIsInCompare] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Handle hydration mismatch
  useEffect(() => {
    setIsClient(true);
    setIsInCompare(isInComparison(tool.id));
  }, [isInComparison, tool.id]);

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const iconClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInCompare) {
      removeFromComparison(tool.id);
    } else if (canAddMore) {
      addToComparison(tool);
    }
    setIsInCompare(!isInCompare);
  };

  if (!isClient) {
    return (
      <button 
        className={`inline-flex items-center ${sizeClasses[size]} ${className}`}
        disabled
      >
        <FaBalanceScale className={iconClasses[size]} />
        {showLabel && <span className="ml-2">Compare</span>}
      </button>
    );
  }

  const isDisabled = !isInCompare && !canAddMore;
  const buttonText = isInCompare ? 'Added' : canAddMore ? 'Compare' : 'Max 3';

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className={`inline-flex items-center ${sizeClasses[size]} ${
        isInCompare 
          ? 'text-green-500 hover:text-green-600' 
          : isDisabled
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300'
      } transition-colors ${className}`}
      aria-label={isInCompare ? 'Remove from comparison' : 'Add to comparison'}
      title={isInCompare ? 'Remove from comparison' : 'Add to comparison'}
    >
      {isInCompare ? (
        <FaCheck className={`${iconClasses[size]} fill-current`} />
      ) : (
        <FaBalanceScale className={`${iconClasses[size]} fill-current`} />
      )}
      {showLabel && (
        <span className="ml-2">
          {buttonText}
        </span>
      )}
    </button>
  );
};

export default ComparisonButton;
