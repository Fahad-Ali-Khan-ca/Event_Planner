import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  location: string;
  description: string;
  imageUrl: string;
}

interface FavoritesContextValue {
  favorites: Event[];
  add: (event: Event) => void;
  remove: (id: string) => void;
  clear: () => void;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Event[]>([]);
  const add = (event: Event) => setFavorites(prev => [...prev, event]);
  const remove = (id: string) => setFavorites(prev => prev.filter(e => e.id !== id));
  const clear = () => setFavorites([]);

  return (
    <FavoritesContext.Provider value={{ favorites, add, remove, clear }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export function useFavorites(): FavoritesContextValue {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within FavoritesProvider');
  return context;
}