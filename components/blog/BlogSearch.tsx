'use client';

import { useState, useEffect } from 'react';
import { FiSearch, FiX, FiFilter } from 'react-icons/fi';

type BlogSearchProps = {
  onSearch: (query: string) => void;
  onCategoryFilter: (category: string) => void;
  onTagFilter: (tag: string) => void;
  categories: string[];
  tags: string[];
  activeCategory?: string;
  activeTag?: string;
};

export default function BlogSearch({ 
  onSearch, 
  onCategoryFilter, 
  onTagFilter, 
  categories, 
  tags, 
  activeCategory, 
  activeTag 
}: BlogSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, onSearch]);

  const handleClearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  const handleCategoryClick = (category: string) => {
    if (activeCategory === category) {
      onCategoryFilter('');
    } else {
      onCategoryFilter(category);
    }
  };

  const handleTagClick = (tag: string) => {
    if (activeTag === tag) {
      onTagFilter('');
    } else {
      onTagFilter(tag);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="Search blog posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            onClick={handleClearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <FiX className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Mobile Filters Button */}
      <div className="lg:hidden">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
        >
          <FiFilter className="mr-2 h-4 w-4" />
          {isFiltersOpen ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {/* Filters */}
      <div className={`${isFiltersOpen ? 'block' : 'hidden'} lg:block space-y-6`}>
        {/* Categories */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Categories</h3>
          <div className="space-y-2">
            <button
              onClick={() => handleCategoryClick('')}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                !activeCategory
                  ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-100'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                  activeCategory === category
                    ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-100'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Popular Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  activeTag === tag
                    ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-100'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
