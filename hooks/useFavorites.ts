import { useState, useEffect } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    setIsClient(true);
    const storedFavorites = localStorage.getItem('favoriteTools');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('favoriteTools', JSON.stringify(favorites));
    }
  }, [favorites, isClient]);

  const addFavorite = (toolId: string) => {
    if (!favorites.includes(toolId)) {
      setFavorites([...favorites, toolId]);
    }
  };

  const removeFavorite = (toolId: string) => {
    setFavorites(favorites.filter(id => id !== toolId));
  };

  const toggleFavorite = (toolId: string) => {
    if (isFavorite(toolId)) {
      removeFavorite(toolId);
    } else {
      addFavorite(toolId);
    }
  };

  const isFavorite = (toolId: string) => {
    return favorites.includes(toolId);
  };

  return {
    favorites,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
  };
}

export default useFavorites;
