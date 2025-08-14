import * as React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import type { Tool } from '../../types/tool';

// Define styles with proper TypeScript types
interface SmartSearchStyles {
  [key: string]: React.CSSProperties | { [key: string]: React.CSSProperties };
}

const styles: SmartSearchStyles = {
  searchContainer: { position: 'relative', width: '100%', maxWidth: '800px', margin: '0 auto 2rem', zIndex: 10 },
  searchBar: { 
    display: 'flex', 
    alignItems: 'center', 
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    padding: '0.5rem',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)' as any,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
  },
  focused: {
    borderColor: 'rgba(99, 102, 241, 0.8)',
    boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.25)'
  },
  searchIcon: { padding: '0 0.75rem', color: 'rgba(255, 255, 255, 0.6)', display: 'flex', alignItems: 'center' },
  searchInput: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    color: 'white',
    fontSize: '1rem',
    padding: '0.75rem 0',
    outline: 'none'
  },
  clearButton: {
    background: 'none',
    border: 'none',
    color: 'rgba(255, 255, 255, 0.6)',
    cursor: 'pointer',
    padding: '0.5rem',
    marginRight: '0.25rem',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease'
  },
  filterButton: {
    background: 'none',
    border: 'none',
    color: 'rgba(255, 255, 255, 0.6)',
    cursor: 'pointer',
    padding: '0.5rem',
    margin: '0 0.25rem',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease'
  },
  activeFilter: {
    background: 'rgba(99, 102, 241, 0.3)',
    color: '#6366f1'
  },
  searchButton: {
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' as any,
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '0.75rem 1.5rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  suggestionsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    background: 'rgba(30, 30, 40, 0.95)',
    borderRadius: '8px',
    marginTop: '0.5rem',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
    zIndex: 50
  },
  suggestionItem: {
    padding: '0.75rem 1rem',
    cursor: 'pointer',
    transition: 'background 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    ':hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.05)'
    }
  },
  suggestionHeader: {
    padding: '0.5rem 1rem',
    fontSize: '0.75rem',
    color: 'rgba(255, 255, 255, 0.5)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  }
};

// Simple icon components
const FiSearch = ({ size = 20, className = '', ...props }: { size?: number, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const FiX = ({ size = 20, className = '', ...props }: { size?: number, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const FiFilter = ({ size = 20, className = '', ...props }: { size?: number, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

const FiClock = ({ size = 20, className = '', ...props }: { size?: number, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const FiStar = ({ size = 20, className = '', ...props }: { size?: number, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

type SuggestionType = 'recent' | 'tool' | 'tag';

interface Suggestion {
  type: SuggestionType;
  text: string;
  icon?: React.ReactNode;
}

interface Filters {
  pricing: string[];
  minRating: number;
  tags: string[];
}

interface SmartSearchProps {
  search: string;
  onSearchChange: (value: string) => void;
  onFilterChange: (filters: Filters) => void;
  allTags: string[];
  tools: Tool[];
}

const SmartSearch: React.FC<SmartSearchProps> = ({
  search,
  onSearchChange,
  onFilterChange,
  allTags,
  tools,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    pricing: [],
    minRating: 0,
    tags: [],
  });
  
  const inputRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Load recent searches from localStorage on mount
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      try {
        setRecentSearches(JSON.parse(savedSearches));
      } catch (e) {
        console.error('Failed to parse recent searches', e);
      }
    }
  }, []);

  // Save recent searches to localStorage when it changes
  useEffect(() => {
    if (recentSearches.length > 0) {
      localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    }
  }, [recentSearches]);

  // Add a search term to recent searches
  const addToRecentSearches = useCallback((term: string) => {
    if (!term.trim()) return;
    
    setRecentSearches((prev: string[]) => {
      // Remove the term if it already exists
      const updated = prev.filter(item => 
        item.toLowerCase() !== term.toLowerCase()
      );
      // Add to the beginning of the array and limit to 5 items
      updated.unshift(term);
      return updated.slice(0, 5);
    });
  }, []);

  // Handle search submission
  const handleSearch = useCallback((searchTerm: string) => {
    if (!searchTerm.trim()) return;
    
    onSearchChange(searchTerm);
    addToRecentSearches(searchTerm);
    setSuggestions([]);
    inputRef.current?.blur();
  }, [onSearchChange, addToRecentSearches]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && search.trim()) {
      handleSearch(search);
    } else if (e.key === 'Escape') {
      setSuggestions([]);
      inputRef.current?.blur();
    }
  }, [search, handleSearch]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Generate suggestions based on input
  const debouncedSearch = useDebounce(search, 300);
  
  useEffect(() => {
    if (!debouncedSearch) {
      setSuggestions([]);
      return;
    }

    const newSuggestions: Suggestion[] = [];
    
    // Add recent searches that match
    recentSearches.forEach(term => {
      if (term.toLowerCase().includes(debouncedSearch.toLowerCase())) {
        newSuggestions.push({
          type: 'recent',
          text: term,
          icon: <FiClock size={16} />
        });
      }
    });

    // Add tool name matches
    tools.forEach(tool => {
      if (tool.name.toLowerCase().includes(debouncedSearch.toLowerCase())) {
        newSuggestions.push({
          type: 'tool',
          text: tool.name,
          icon: <FiStar size={16} />
        });
      }
    });

    // Add tag matches
    allTags.forEach(tag => {
      if (tag.toLowerCase().includes(debouncedSearch.toLowerCase())) {
        newSuggestions.push({
          type: 'tag',
          text: `#${tag}`,
          icon: <FiFilter size={16} />
        });
      }
    });

    setSuggestions(newSuggestions);
  }, [debouncedSearch, tools, allTags, recentSearches]);

  // Clear search and suggestions
  const clearSearch = useCallback(() => {
    onSearchChange('');
    setSuggestions([]);
    inputRef.current?.focus();
  }, [onSearchChange]);

  // Toggle filter
  const toggleFilter = useCallback((type: 'pricing' | 'tag', value: string) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      
      if (type === 'pricing') {
        newFilters.pricing = prev.pricing.includes(value)
          ? prev.pricing.filter(p => p !== value)
          : [...prev.pricing, value];
      } else if (type === 'tag') {
        newFilters.tags = prev.tags.includes(value)
          ? prev.tags.filter(t => t !== value)
          : [...prev.tags, value];
      }
      
      onFilterChange(newFilters);
      return newFilters;
    });
  }, [onFilterChange]);

  return (
    <div style={styles.searchContainer} ref={searchRef}>
      <div 
        style={{
          ...styles.searchBar,
          ...(isFocused ? styles.focused : {})
        }}
      >
        <div style={styles.searchIcon}>
          <FiSearch size={20} />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          style={styles.searchInput}
          placeholder="Search AI tools..."
          aria-label="Search AI tools"
        />
        {search && (
          <button
            type="button"
            onClick={clearSearch}
            style={styles.clearButton}
            aria-label="Clear search"
          >
            <FiX size={20} />
          </button>
        )}
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          style={{
            ...styles.filterButton,
            ...(filters.pricing.length > 0 || filters.tags.length > 0 || filters.minRating > 0
              ? styles.activeFilter
              : {})
          }}
          aria-label="Toggle filters"
        >
          <FiFilter size={20} />
        </button>
        <button
          type="button"
          onClick={() => handleSearch(search)}
          style={styles.searchButton}
          aria-label="Search"
        >
          Search
        </button>
      </div>

      {suggestions.length > 0 && (
        <div style={styles.suggestionsContainer}>
          {suggestions.map((suggestion, index) => (
            <div
              key={`${suggestion.type}-${index}`}
              style={styles.suggestionItem as React.CSSProperties}
              onClick={() => {
                onSearchChange(suggestion.text.replace(/^#/, ''));
                handleSearch(suggestion.text.replace(/^#/, ''));
              }}
            >
              {suggestion.icon}
              <span>{suggestion.text}</span>
            </div>
          ))}
        </div>
      )}

      {showFilters && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          background: 'rgba(30, 30, 40, 0.95)',
          borderRadius: '8px',
          padding: '1rem',
          marginTop: '0.5rem',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
          zIndex: 100,
          width: '300px'
        }}>
          <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>Filters</h3>
          
          <div style={{ marginBottom: '1rem' }}>
            <h4 style={{ margin: '0 0 0.5rem 0' }}>Pricing</h4>
            {['Free', 'Freemium', 'Paid', 'Contact for Pricing', 'Free Trial', 'Deals'].map(option => (
              <label key={option} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                <input
                  type="checkbox"
                  checked={filters.pricing.includes(option)}
                  onChange={() => toggleFilter('pricing', option)}
                  style={{ marginRight: '0.5rem' }}
                />
                {option}
              </label>
            ))}
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <h4 style={{ margin: '0 0 0.5rem 0' }}>Minimum Rating</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {[1, 2, 3, 4, 5].map(rating => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => setFilters(prev => ({
                    ...prev,
                    minRating: prev.minRating === rating ? 0 : rating
                  }))}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: rating <= filters.minRating ? '#f59e0b' : 'rgba(255, 255, 255, 0.6)',
                    cursor: 'pointer',
                    fontSize: '1.25rem',
                    padding: 0
                  }}
                  aria-label={`${rating} star${rating !== 1 ? 's' : ''}`}
                >
                  ★
                </button>
              ))}
              <span style={{ marginLeft: '0.5rem', fontSize: '0.875rem' }}>
                {filters.minRating > 0 ? `${filters.minRating}+` : 'Any'}
              </span>
            </div>
          </div>

          <div>
            <h4 style={{ margin: '0 0 0.5rem 0' }}>Tags</h4>
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {allTags.map(tag => (
                <label key={tag} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <input
                    type="checkbox"
                    checked={filters.tags.includes(tag)}
                    onChange={() => toggleFilter('tag', tag)}
                    style={{ marginRight: '0.5rem' }}
                  />
                  {tag}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartSearch;
