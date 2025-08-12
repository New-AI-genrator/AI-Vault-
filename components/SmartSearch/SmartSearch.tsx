import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { FiSearch, FiX, FiFilter, FiClock, FiStar } from 'react-icons/fi';
import { Tool } from '../../types/tool';
import styles from './SmartSearch.module.css';

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

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
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

  const handleSearch = useCallback((query: string) => {
    if (!query.trim()) return;

    onSearchChange(query);

    // Update recent searches
    const updatedSearches = [
      query,
      ...recentSearches.filter((item) => item !== query),
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
  }, [handleSearch, suggestions]);

  return (
    <div className={styles.searchContainer} ref={searchRef}>
      <div className={`${styles.searchBar} ${isFocused ? styles.focused : ''}`}>
        <div className={styles.searchIcon}>
          <FiSearch size={20} />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          onKeyDown={handleKeyDown}
          placeholder="Search for AI tools, categories, or ask a question..."
          className={styles.searchInput}
          aria-autocomplete="list"
          aria-controls="search-suggestions"
          aria-expanded={suggestions.length > 0}
          aria-activedescendant={suggestions.length > 0 ? `suggestion-${suggestions.length - 1}` : undefined}
        />

        {search && (
          <button
            onClick={() => {
              onSearchChange('');
              setSuggestions([]);
            }}
            className={styles.clearButton}
            aria-label="Clear search"
          >
            <FiX size={20} />
          </button>
        )}

        <button
          className={`${styles.filterButton} ${Object.values(filters).some(f => Array.isArray(f) ? f.length > 0 : f > 0) ? styles.activeFilter : ''}`}
          onClick={() => setShowFilters(!showFilters)}
          aria-label="Toggle filters"
          aria-expanded={showFilters}
        >
          <FiFilter size={20} />
        </button>

        <button
          className={styles.searchButton}
          onClick={() => handleSearch(search)}
          aria-label="Search"
        >
          Search
        </button>
      </div>

      {/* Search suggestions */}
      {(suggestions.length > 0 || (isFocused && recentSearches.length > 0 && !search)) && (
        <div
          id="search-suggestions"
          className={styles.suggestionsContainer}
          role="listbox"
          aria-label="Search suggestions"
        >
          {suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <button
                key={`${suggestion.type}-${index}`}
                id={`suggestion-${index}`}
                data-suggestion-index={index}
                role="option"
                aria-selected={false}
                className={styles.suggestionItem}
                onClick={() => handleSearch(suggestion.text)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch(suggestion.text);
                  }
                }}
                tabIndex={-1}
              >
                <div className="flex items-center gap-2">
                  {suggestion.icon}
                  <span className="truncate">{suggestion.text}</span>
                </div>
              </button>
            ))
          ) : (
            <>
              <div className={styles.suggestionHeader}>
                <FiClock size={16} />
                <span>Recent searches</span>
              </div>
              {recentSearches.map((recent, index) => (
                <button
                  key={`recent-${index}`}
                  className={styles.suggestionItem}
                  onClick={() => handleSearch(recent)}
                >
                  <div className="flex items-center gap-2">
                    <FiClock className="text-gray-400 flex-shrink-0" />
                    <span className="truncate">{recent}</span>
                  </div>
                </button>
              ))}
            </>
          )}
        </div>
      )}

      
      {/* Advanced filters */}
      {showFilters && (
        <div className={styles.filtersContainer}>
          <div className={styles.filterSection}>
            <h4>Pricing</h4>
            <div className={styles.filterOptions}>
              {['Free', 'Freemium', 'Paid', 'Contact', 'Open Source'].map((price) => (
                <label key={price} className={styles.filterOption}>
                  <input
                    type="checkbox"
                    checked={filters.pricing.includes(price)}
                    onChange={(e) => {
                      const newPricing = e.target.checked
                        ? [...filters.pricing, price]
                        : filters.pricing.filter((p) => p !== price);
                      handleFilterChange('pricing', newPricing);
                    }}
                  />
                  <span>{price}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className={styles.filterSection}>
            <h4>Minimum Rating</h4>
            <div className={styles.ratingFilter}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className={`${styles.starButton} ${filters.minRating >= star ? styles.active : ''}`}
                  onClick={() => handleFilterChange('minRating', filters.minRating === star ? 0 : star)}
                  aria-label={`${star} star${star > 1 ? 's' : ''} and up`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          
          <div className={styles.filterSection}>
            <h4>Tags</h4>
            <div className={styles.tagCloud}>
              {allTags.slice(0, 15).map((tag) => (
                <button
                  key={tag}
                  className={`${styles.tag} ${filters.tags.includes(tag) ? styles.activeTag : ''}`}
                  onClick={() => {
                    const newTags = filters.tags.includes(tag)
                      ? filters.tags.filter((t) => t !== tag)
                      : [...filters.tags, tag];
                    handleFilterChange('tags', newTags);
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartSearch;
