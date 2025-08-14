import * as React from 'react';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
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
    backdropFilter: 'blur(10px)' as any, // Using any as a workaround for TypeScript
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
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' as any, // Using any as a workaround for TypeScript
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
    background: 'rgba(0, 0, 0, 0.2)'
  },
  filtersContainer: {
    background: 'rgba(30, 30, 40, 0.95)',
    borderRadius: '8px',
    marginTop: '0.5rem',
    padding: '1rem',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
  },
  filterSection: {
    marginBottom: '1rem'
  },
  filterOptions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginTop: '0.5rem'
  },
  filterOption: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem'
  },
  ratingFilter: {
    display: 'flex',
    gap: '0.25rem',
    marginTop: '0.5rem'
  },
  starButton: {
    background: 'none',
    border: 'none',
    color: 'rgba(255, 255, 255, 0.3)',
    cursor: 'pointer',
    fontSize: '1.25rem',
    padding: '0.25rem',
    transition: 'all 0.2s ease',
    ':hover': {
      color: '#facc15'
    }
  },
  tagCloud: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginTop: '0.5rem'
  },
  tag: {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '9999px',
    padding: '0.25rem 0.75rem',
    fontSize: '0.75rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    ':hover': {
      background: 'rgba(255, 255, 255, 0.2)'
    }
  },
  activeTag: {
    background: '#6366f1',
    color: 'white',
    ':hover': {
      background: '#4f46e5'
    }
  }
};

// Simple icon components with proper TypeScript types
interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: number;
  className?: string;
  children?: React.ReactNode;
}

const FiSearch: React.FC<IconProps> = ({ className = '', ...props }) => (
  <span className={className} {...props}>🔍</span>
);

const FiX: React.FC<IconProps> = ({ className = '', ...props }) => (
  <span className={className} {...props}>✕</span>
);

const FiFilter: React.FC<IconProps> = ({ className = '', ...props }) => (
  <span className={className} {...props}>⚙️</span>
);

const FiClock: React.FC<IconProps> = ({ className = '', ...props }) => (
  <span className={className} {...props}>🕒</span>
);

const FiStar: React.FC<IconProps> = ({ className = '', ...props }) => (
  <span className={className} {...props}>★</span>
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

type SuggestionType = 'suggestion' | 'recent' | 'popular';

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
}): React.ReactElement => {
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    pricing: [],
    minRating: 0,
    tags: [],
  });
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Load recent searches from localStorage on component mount
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
  
  // Save recent searches to localStorage when they change
  useEffect(() => {
    if (recentSearches.length > 0) {
      localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    }
  }, [recentSearches]);
  
  // Add search term to recent searches
  const addToRecentSearches = useCallback((term: string) => {
    if (!term.trim()) return;
    
    setRecentSearches(prev => {
      // Remove if already exists
      const updated = prev.filter(item => item.toLowerCase() !== term.toLowerCase());
      // Add to beginning
      updated.unshift(term);
      // Keep only the 5 most recent searches
      return updated.slice(0, 5);
    });
  }, []);
  
  // Handle search
  const handleSearch = useCallback((searchTerm: string) => {
    if (!searchTerm.trim()) return;
    
    onSearchChange(searchTerm);
    addToRecentSearches(searchTerm);
    setSuggestions([]);
    inputRef.current?.blur();
  }, [onSearchChange, addToRecentSearches]);

  const debouncedSearch = useDebounce(search, 300);

  // Load recent searches from localStorage
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      try {
        const parsedSearches = JSON.parse(savedSearches);
        if (Array.isArray(parsedSearches)) {
          setRecentSearches(parsedSearches);
        }
      } catch (error) {
        console.error('Failed to parse recent searches', error);
      }
    }
  }, []);

  // Generate tool suggestions
  const toolSuggestions = useMemo(() => {
    if (!debouncedSearch.trim()) return [];

    const searchLower = debouncedSearch.toLowerCase();

    return tools
      .filter(
        (tool) =>
          tool.name.toLowerCase().includes(searchLower) ||
          tool.description.toLowerCase().includes(searchLower) ||
          (tool.tags && tool.tags.some(tag => tag.toLowerCase().includes(searchLower)))
      )
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 3)
      .map(tool => ({
        type: 'suggestion' as const,
        text: tool.name,
        icon: <FiStar className="text-yellow-400" />
      }));
  }, [debouncedSearch, tools]);

  // Generate tag suggestions
  const tagSuggestions = useMemo(() => {
    if (!debouncedSearch.trim()) return [];

    const searchLower = debouncedSearch.toLowerCase();
    return allTags
      .filter(tag => tag.toLowerCase().includes(searchLower))
      .slice(0, 3)
      .map(tag => ({
        type: 'suggestion' as const,
        text: `#${tag}`
      }));
  }, [debouncedSearch, allTags]);

  // Generate common queries
  const commonQueries = useMemo(() => {
    if (!debouncedSearch.trim()) return [];

    return [
      `Free ${debouncedSearch} tools`,
      `Best ${debouncedSearch} AI tools`,
      `How to use AI for ${debouncedSearch}`,
      `${debouncedSearch} tools comparison`
    ].map(query => ({
      type: 'suggestion' as const,
      text: query
    }));
  }, [debouncedSearch]);

  // Update suggestions based on input
  useEffect(() => {
    if (!debouncedSearch.trim()) {
      setSuggestions(
        recentSearches.map(text => ({
          type: 'recent' as const,
          text,
          icon: <FiClock className="text-gray-400" />
        }))
      );
      return;
    }

    // Combine all suggestions
    const allSuggestions = [
      ...toolSuggestions,
      ...tagSuggestions,
      ...commonQueries
    ];

    setSuggestions(allSuggestions.slice(0, 5));
  }, [debouncedSearch, toolSuggestions, tagSuggestions, commonQueries, recentSearches]);

  const handleSearch = useCallback((searchTerm: string) => {
    onSearchChange(searchTerm);
    if (searchTerm.trim()) {
      addToRecentSearches(searchTerm);
    }
    ].slice(0, 5);

    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    setSuggestions([]);

    // Close keyboard on mobile after search
    inputRef.current?.blur();
  }, [onSearchChange, recentSearches]);

  const handleFilterChange = useCallback((filterType: keyof Filters, value: any) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  }, [filters, onFilterChange]);

  // Close suggestions when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSuggestions([]);
        inputRef.current?.blur();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Load recent searches from localStorage on component mount
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

  // Save recent searches to localStorage when they change
  useEffect(() => {
    if (recentSearches.length > 0) {
      localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    }
  }, [recentSearches]);

  // Add search term to recent searches
  const addToRecentSearches = useCallback((term: string) => {
    if (!term.trim()) return;
    
    setRecentSearches(prev => {
      // Remove if already exists
      const updated = prev.filter(item => item.toLowerCase() !== term.toLowerCase());
      // Add to beginning
      updated.unshift(term);
      // Keep only the 5 most recent searches
      return updated.slice(0, 5);
    });
  }, []);

  // Handle keyboard navigation in suggestions
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!suggestions.length) return;

    const currentIndex = suggestions.findIndex(
      (_, i) => document.activeElement === document.querySelector(`[data-suggestion-index="${i}"]`)
    );

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % suggestions.length;
      const nextElement = document.querySelector(`[data-suggestion-index="${nextIndex}"]`) as HTMLElement;
      nextElement?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + suggestions.length) % suggestions.length;
      const prevElement = document.querySelector(
        `[data-suggestion-index="${prevIndex}"]`
      ) as HTMLElement;

      if (prevIndex === suggestions.length - 1) {
        inputRef.current?.focus();
      } else {
        prevElement?.focus();
      }
    } else if (e.key === 'Enter' && currentIndex >= 0) {
      e.preventDefault();
      const selectedSuggestion = suggestions[currentIndex];
      handleSearch(selectedSuggestion.text);
    }
  }, [suggestions, handleSearch]);

  return (
    <div style={styles.searchContainer as React.CSSProperties} ref={searchRef}>
      <div 
        style={{
          ...styles.searchBar as React.CSSProperties,
          ...(isFocused ? styles.focused as React.CSSProperties : {})
        }}
      >
        <div style={styles.searchIcon as React.CSSProperties}>
          <FiSearch size={20} />
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          onKeyDown={handleKeyDown}
          placeholder="Search for AI tools, categories, or ask a question..."
          style={styles.searchInput as React.CSSProperties}
          ref={inputRef}
        />

        {search && (
          <button 
            onClick={() => {
              onSearchChange('');
              setSuggestions([]);
            }}
            style={styles.clearButton as React.CSSProperties}
            aria-label="Clear search"
          >
            <FiX size={20} />
          </button>
        )}

        <button 
          onClick={() => setShowFilters(!showFilters)}
          style={{
            ...styles.filterButton as React.CSSProperties,
            ...(Object.values(filters).some(f => Array.isArray(f) ? f.length > 0 : f > 0) 
              ? styles.activeFilter as React.CSSProperties 
              : {})
          }}
          aria-label="Toggle filters"
          aria-expanded={showFilters}
        >
          <FiFilter size={20} />
        </button>

        <button 
          onClick={() => handleSearch(search)}
          style={styles.searchButton as React.CSSProperties}
          aria-label="Search"
        >
          Search
        </button>
      </div>
    </div>
  );
};



const styles: SmartSearchStyles = {
  searchContainer: { 
    position: 'relative', 
    width: '100%', 
    maxWidth: '800px', 
    margin: '0 auto 2rem', 
    zIndex: 10 
  },
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
  searchIcon: { 
    padding: '0 0.75rem', 
    color: 'rgba(255, 255, 255, 0.6)', 
    display: 'flex', 
    alignItems: 'center' 
  },
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
    '&:hover': {
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
    background: 'rgba(0, 0, 0, 0.2)'
  }
};

return (
  <div style={styles.searchContainer} ref={searchRef}>
    <div 
      style={{ 
        ...styles.searchBar as React.CSSProperties, 
        ...(isFocused ? styles.focused as React.CSSProperties : {}) 
      }}
    >
      <div style={styles.searchIcon as React.CSSProperties}>
        <FiSearch size={20} />
      </div>
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        onKeyDown={handleKeyDown}
        placeholder="Search for AI tools, categories, or ask a question..."
        style={styles.searchInput as React.CSSProperties}
        ref={inputRef}
      />

      {search && (
        <button 
          onClick={() => {
            onSearchChange('');
            setSuggestions([]);
          }}
          style={styles.clearButton as React.CSSProperties}
          aria-label="Clear search"
        >
          <FiX size={20} />
        </button>
      )}

      <button 
        onClick={() => setShowFilters(!showFilters)}
        style={{
          ...styles.filterButton as React.CSSProperties,
          ...(Object.values(filters).some(f => Array.isArray(f) ? f.length > 0 : f > 0) 
            ? styles.activeFilter as React.CSSProperties 
            : {})
        }}
        aria-label="Toggle filters"
        aria-expanded={showFilters}
      >
        <FiFilter size={20} />
      </button>

      <button 
        onClick={() => handleSearch(search)}
        style={styles.searchButton as React.CSSProperties}
        aria-label="Search"
      >
        Search
      </button>
    </div>

    {/* Search suggestions */}
    {(suggestions.length > 0 || (isFocused && recentSearches.length > 0 && !search)) && (
      <div
        style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          marginTop: '0.5rem',
          backgroundColor: '#3f3f3f',
          borderRadius: '0.5rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          zIndex: 50,
          maxHeight: '300px',
          overflowY: 'auto',
        }}
      >
        {suggestions.length > 0 ? (
          suggestions.map((suggestion, index) => (
            <button
              key={`${suggestion.type}-${index}`}
              onClick={() => handleSearch(suggestion.text)}
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                padding: '0.75rem 1rem',
                backgroundColor: 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: '0.95rem',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#4f4f4f';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                width: '100%',
              }}>
                {suggestion.icon}
                <span style={{
                  flex: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {suggestion.text}
                </span>
              </div>
            </button>
          ))
        ) : (
          <>
            <div style={{
              padding: '0.75rem 1rem',
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '0.85rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}>
              Recent searches
            </div>
            {recentSearches.map((recent, index) => (
              <button
                key={`recent-${index}`}
                onClick={() => handleSearch(recent)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  padding: '0.5rem 1rem',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#fff',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = '#4f4f4f';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                }}
              >
                <FiClock size={16} style={{ marginRight: '0.75rem', opacity: 0.7 }} />
                <span style={{
                  flex: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {recent}
                </span>
              </button>
            ))}
          </>
        )}
      </div>
    )}

    {/* Search button */}
    <button 
      onClick={() => handleSearch(search)}
      style={{
        marginLeft: '0.5rem',
        padding: '0.5rem 1rem',
        backgroundColor: '#4f46e5',
        color: 'white',
        border: 'none',
        borderRadius: '0.375rem',
        cursor: 'pointer',
        fontWeight: 500,
        transition: 'background-color 0.2s',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = '#4338ca';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = '#4f46e5';
      }}
      aria-label="Search"
    >
      Search
        </button>
      </div>

      {/* Search suggestions */}
      {(suggestions.length > 0 || (isFocused && recentSearches.length > 0 && !search)) && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '0.5rem',
            backgroundColor: '#3f3f3f',
            borderRadius: '0.25rem',
            boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
          }}
        >
          {suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <button
                key={`${suggestion.type}-${index}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.5rem',
                  fontSize: '1rem',
                  color: '#fff',
                  backgroundColor: '#3f3f3f',
                  borderRadius: '0.25rem',
                  border: 'none',
                  outline: 'none',
                  cursor: 'pointer',
                  ':hover': {
                    backgroundColor: '#4f4f4f',
                  }
                }}
                onClick={() => handleSearch(suggestion.text)}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}>
                  {suggestion.icon}
                  <span style={{
                    flex: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    {suggestion.text}
                  </span>
                </div>
              </button>
            ))
          ) : (
            <>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.5rem',
                fontSize: '1rem',
                color: '#fff',
                backgroundColor: '#3f3f3f',
                borderRadius: '0.25rem',
              }}>
                <FiClock size={16} />
                <span style={{
                  flex: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  Recent searches
                </span>
              </div>
              {recentSearches.map((recent, index) => (
                <button
                  key={`recent-${index}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.5rem',
                    fontSize: '1rem',
                    color: '#fff',
                    backgroundColor: '#3f3f3f',
                    borderRadius: '0.25rem',
                    border: 'none',
                    outline: 'none',
                    cursor: 'pointer',
                    ':hover': {
                      backgroundColor: '#4f4f4f',
                    }
                  }}
                  onClick={() => handleSearch(recent)}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}>
                    <FiClock size={16} />
                    <span style={{
                      flex: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {recent}
                    </span>
                  </div>
                </button>
              ))}
            </>
          )}
        </div>
      )}

      {/* Advanced filters */}
      {showFilters && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '0.5rem',
          backgroundColor: '#3f3f3f',
          borderRadius: '0.25rem',
          boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '0.5rem',
              backgroundColor: '#3f3f3f',
              borderRadius: '0.25rem',
            }}>
              <h4 style={{
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'rgba(255, 255, 255, 0.8)',
                marginBottom: '0.5rem',
              }}>
                Pricing
              </h4>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}>
                {['Free', 'Freemium', 'Paid', 'Contact', 'Open Source'].map((price) => (
                  <label key={price} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.875rem',
                    color: 'rgba(255, 255, 255, 0.8)',
                  }}>
                    <input
                      type="checkbox"
                      checked={filters.pricing.includes(price)}
                      onChange={(e) => {
                        const newPricing = e.target.checked
                          ? [...filters.pricing, price]
                          : filters.pricing.filter((p) => p !== price);
                        handleFilterChange('pricing', newPricing);
                      }}
                      style={{
                        borderRadius: '0.25rem',
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                        color: '#6366f1',
                        focus: {
                          ring: '2px solid rgba(99, 102, 241, 0.5)'
                        }
                      }}
                    />
                    {price}
                  </label>
                ))}
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '0.5rem',
              backgroundColor: '#3f3f3f',
              borderRadius: '0.25rem',
            }}>
              <h4 style={{
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'rgba(255, 255, 255, 0.8)',
                marginBottom: '0.5rem',
              }}>
                Minimum Rating
              </h4>
              <div style={{
                display: 'flex',
                gap: '0.5rem',
              }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleFilterChange('minRating', filters.minRating === star ? 0 : star)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '2rem',
                      height: '2rem',
                      borderRadius: '0.25rem',
                      backgroundColor: '#3f3f3f',
                      color: filters.minRating >= star ? '#facc15' : 'rgba(255, 255, 255, 0.3)',
                      cursor: 'pointer',
                    }}
                    aria-label={`${star} star${star > 1 ? 's' : ''} and up`}
                  >
                    <FiStar />
                  </button>
                ))}
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '0.5rem',
              backgroundColor: '#3f3f3f',
              borderRadius: '0.25rem',
            }}>
              <h4 style={{
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'rgba(255, 255, 255, 0.8)',
                marginBottom: '0.5rem',
              }}>
                Tags
              </h4>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}>
                {allTags.slice(0, 15).map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      const newTags = filters.tags.includes(tag)
                        ? filters.tags.filter((t) => t !== tag)
                        : [...filters.tags, tag];
                      handleFilterChange('tags', newTags);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '0.25rem',
                      fontSize: '0.875rem',
                      color: 'rgba(255, 255, 255, 0.8)',
                      backgroundColor: '#3f3f3f',
                      borderRadius: '0.25rem',
                      cursor: 'pointer',
                      ...(filters.tags.includes(tag) ? {
                        backgroundColor: '#4f4f4f',
                      } : {})
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartSearch;
