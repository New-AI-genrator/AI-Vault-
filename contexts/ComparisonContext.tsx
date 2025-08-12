'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Tool } from '@/types/tool';

interface ComparisonContextType {
  tools: Tool[];
  addToComparison: (tool: Tool) => void;
  removeFromComparison: (toolId: string) => void;
  clearComparison: () => void;
  isInComparison: (toolId: string) => boolean;
  canAddMore: boolean;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export const ComparisonProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tools, setTools] = useState<Tool[]>([]);
  const maxTools = 3;

  const addToComparison = useCallback((tool: Tool) => {
    setTools(prev => {
      // Don't add if already in comparison or limit reached
      if (prev.some(t => t.id === tool.id) || prev.length >= maxTools) {
        return prev;
      }
      return [...prev, tool];
    });
  }, []);

  const removeFromComparison = useCallback((toolId: string) => {
    setTools(prev => prev.filter(tool => tool.id !== toolId));
  }, []);

  const clearComparison = useCallback(() => {
    setTools([]);
  }, []);

  const isInComparison = useCallback((toolId: string) => {
    return tools.some(tool => tool.id === toolId);
  }, [tools]);

  return (
    <ComparisonContext.Provider
      value={{
        tools,
        addToComparison,
        removeFromComparison,
        clearComparison,
        isInComparison,
        canAddMore: tools.length < maxTools,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = (): ComparisonContextType => {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
};
