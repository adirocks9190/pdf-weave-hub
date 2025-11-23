import { useState, useEffect, useCallback } from 'react';
import { Item } from '@/types';

export const useWishlist = (userId: number | null) => {
  const storageKey = userId ? `wishlist_${userId}` : 'wishlist_guest';
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      setItems(JSON.parse(stored));
    }
  }, [storageKey]);

  const saveToStorage = useCallback((newItems: Item[]) => {
    localStorage.setItem(storageKey, JSON.stringify(newItems));
    setItems(newItems);
  }, [storageKey]);

  const addItem = useCallback((item: Item) => {
    setItems(current => {
      if (current.some(i => i.id === item.id)) {
        return current;
      }
      const updated = [...current, item];
      saveToStorage(updated);
      return updated;
    });
  }, [saveToStorage]);

  const removeItem = useCallback((itemId: number) => {
    setItems(current => {
      const updated = current.filter(i => i.id !== itemId);
      saveToStorage(updated);
      return updated;
    });
  }, [saveToStorage]);

  const isInWishlist = useCallback((itemId: number) => {
    return items.some(i => i.id === itemId);
  }, [items]);

  const clearWishlist = useCallback(() => {
    saveToStorage([]);
  }, [saveToStorage]);

  return {
    items,
    addItem,
    removeItem,
    isInWishlist,
    clearWishlist,
    count: items.length,
  };
};
