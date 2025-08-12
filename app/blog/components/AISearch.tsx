'use client';

import { useState, useEffect, useRef } from 'react';
import { FiSearch, FiX, FiLoader, FiArrowRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

// Mock search results - in a real app, this would come from an API
const mockSearchResults = [
  {
    id: '1',
    title: 'The Future of Web Development in 2024',
    excerpt: 'Exploring the latest trends and technologies shaping the future of web development, including AI integration, WebAssembly, and more.',
    category: 'Technology',
    date: '2024-03-15',
    slug: 'future-of-web-dev-2024',
    score: 0.95
  },
  {
    id: '2',
    title: 'Mastering Modern CSS Grid Layouts',
    excerpt: 'A comprehensive guide to creating responsive and creative layouts with modern CSS Grid techniques and best practices.',
    category: 'CSS',
    date: '2024-03-10',
    slug: 'modern-css-grid-layouts',
    score: 0.87
  },
  {
    id: '3',
    title: 'Building Scalable APIs with Next.js 14',
    excerpt: 'Learn how to build high-performance, scalable APIs using the latest features in Next.js 14, including route handlers and server components.',
    category: 'Next.js',
    date: '2024-03-05',
    slug: 'scalable-apis-nextjs-14',
    score: 0.82
  },
  {
    id: '4',
    title: 'The Art of Microinteractions',
    excerpt: 'How subtle animations and microinteractions can significantly improve user experience and engagement in web applications.',
    category: 'UI/UX',
    date: '2024-02-28',
    slug: 'art-of-microinteractions',
    score: 0.78
  },
  {
    id: '5',
    title: 'State Management in 2024',
    excerpt: 'Comparing the latest state management solutions for modern web applications, including Zustand, Jotai, and React Query.',
    category: 'React',
    date: '2024-02-20',
    slug: 'state-management-2024',
    score: 0.75
  },
];

// Debounce function to limit API calls
function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default function AISearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof mockSearchResults>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close search when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Focus input when search is opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Mock search function - in a real app, this would call your search API
  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simple client-side search for demo purposes
    const searchResults = mockSearchResults.filter(post => 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setResults(searchResults);
    setIsLoading(false);
  };

  // Debounced search
  const debouncedSearch = debounce(performSearch, 300);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="relative" ref={searchRef}>
      {/* Search Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-text hover:text-primary transition-colors"
        aria-label="Search"
      >
        <FiSearch className="w-5 h-5" />
      </button>

      {/* Search Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-50"
            >
              <div className="bg-bg rounded-xl shadow-2xl overflow-hidden border border-border/20">
                {/* Search Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiSearch className="h-5 w-5 text-text/40" />
                  </div>
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={handleSearch}
                    className="block w-full pl-12 pr-12 py-4 bg-bg border-0 text-text placeholder-text/50 focus:ring-0 text-base"
                    placeholder="Search articles, tutorials, and more..."
                    autoComplete="off"
                    spellCheck="false"
                  />
                  {query && (
                    <button
                      onClick={clearSearch}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-text/40 hover:text-text/70 transition-colors"
                    >
                      <FiX className="h-5 w-5" />
                    </button>
                  )}
                </div>

                {/* Search Results */}
                <div className="border-t border-border/20 max-h-[60vh] overflow-y-auto">
                  {isLoading ? (
                    <div className="flex items-center justify-center p-8">
                      <FiLoader className="animate-spin h-6 w-6 text-primary" />
                      <span className="ml-2 text-text/70">Searching...</span>
                    </div>
                  ) : query && results.length === 0 ? (
                    <div className="p-8 text-center">
                      <p className="text-text/70">No results found for "{query}"</p>
                      <p className="text-sm text-text/50 mt-2">Try different keywords or check back later.</p>
                    </div>
                  ) : results.length > 0 ? (
                    <ul>
                      {results.map((result) => (
                        <motion.li
                          key={result.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="border-b border-border/10 last:border-0 hover:bg-bg-secondary/50 transition-colors"
                        >
                          <a
                            href={`/blog/${result.slug}`}
                            className="block p-4 group"
                            onClick={() => setIsOpen(false)}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="text-xs font-medium px-2 py-0.5 rounded bg-primary/10 text-primary">
                                    {result.category}
                                  </span>
                                  <span className="text-xs text-text/50">
                                    {new Date(result.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                  </span>
                                </div>
                                <h3 className="text-lg font-semibold text-text group-hover:text-primary transition-colors truncate">
                                  {result.title}
                                </h3>
                                <p className="text-sm text-text/70 mt-1 line-clamp-2">
                                  {result.excerpt}
                                </p>
                              </div>
                              <div className="ml-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                <FiArrowRight className="h-5 w-5 text-text/40 group-hover:text-primary" />
                              </div>
                            </div>
                          </a>
                        </motion.li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-text/70">Search for articles, tutorials, and more...</p>
                      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-text/50">
                        {['React', 'Next.js', 'TypeScript', 'CSS', 'UI/UX', 'Web Dev'].map((tag) => (
                          <span 
                            key={tag}
                            className="inline-block px-3 py-1.5 bg-bg-secondary rounded-full hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                            onClick={() => {
                              setQuery(tag);
                              performSearch(tag);
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="px-4 py-3 bg-bg-secondary/30 text-xs text-text/50 border-t border-border/10 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="hidden sm:inline-flex items-center px-2 py-1 rounded bg-bg border border-border/20">
                      <kbd className="font-sans">⌘</kbd>
                      <span className="mx-0.5">+</span>
                      <kbd className="font-sans">K</kbd>
                    </span>
                    <span>Press <kbd className="font-sans">Esc</kbd> to close</span>
                  </div>
                  <span>AI-Powered Search</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
