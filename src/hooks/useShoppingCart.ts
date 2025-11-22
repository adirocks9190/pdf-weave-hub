import { useState, useCallback, useMemo } from 'react';
import { CartItem, Item } from '@/types';
import { toast } from 'sonner';
import { APP_CONFIG } from '@/config/constants';

export function useShoppingCart(userId: number | null) {
  const storageKey = userId ? `${APP_CONFIG.storage.cartPrefix}${userId}` : null;
  
  const [items, setItems] = useState<CartItem[]>(() => {
    if (!storageKey) return [];
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const saveToStorage = useCallback((cartItems: CartItem[]) => {
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(cartItems));
    }
  }, [storageKey]);

  const addItem = useCallback((product: Item) => {
    setItems(prev => {
      const existing = prev.find(item => item.item.id === product.id);
      let updated: CartItem[];
      
      if (existing) {
        updated = prev.map(item =>
          item.item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        toast.success('Quantity updated');
      } else {
        updated = [...prev, { item: product, quantity: 1 }];
        toast.success('Added to cart');
      }
      
      saveToStorage(updated);
      return updated;
    });
  }, [saveToStorage]);

  const removeItem = useCallback((productId: number) => {
    setItems(prev => {
      const updated = prev.filter(item => item.item.id !== productId);
      saveToStorage(updated);
      toast.success('Removed from cart');
      return updated;
    });
  }, [saveToStorage]);

  const updateItemQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    
    setItems(prev => {
      const updated = prev.map(item =>
        item.item.id === productId ? { ...item, quantity } : item
      );
      saveToStorage(updated);
      return updated;
    });
  }, [saveToStorage, removeItem]);

  const clearAll = useCallback(() => {
    setItems([]);
    if (storageKey) {
      localStorage.removeItem(storageKey);
    }
  }, [storageKey]);

  const totalAmount = useMemo(
    () => items.reduce((sum, item) => sum + item.item.price * item.quantity, 0),
    [items]
  );

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  return {
    items,
    addItem,
    removeItem,
    updateItemQuantity,
    clearAll,
    totalAmount,
    totalItems,
  };
}
