/* contexts/FavoritesContext.js */
import React, { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const add = event => setFavorites(prev => [...prev, event]);
  const remove = id => setFavorites(prev => prev.filter(e => e.id !== id));
  const clear = () => setFavorites([]);
  return (
    <FavoritesContext.Provider value={{ favorites, add, remove, clear }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
