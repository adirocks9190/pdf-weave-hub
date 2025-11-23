import React, { createContext, useContext } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useShoppingCart } from '@/hooks/useShoppingCart';
import { useWishlist } from '@/hooks/useWishlist';
import { Item } from '@/types';

interface AppStoreValue {
  auth: ReturnType<typeof useAuth>;
  cart: ReturnType<typeof useShoppingCart>;
  wishlist: ReturnType<typeof useWishlist>;
}

const AppStoreContext = createContext<AppStoreValue | null>(null);

export const AppStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuth();
  const cart = useShoppingCart(auth.user?.id ?? null);
  const wishlist = useWishlist(auth.user?.id ?? null);

  return (
    <AppStoreContext.Provider value={{ auth, cart, wishlist }}>
      {children}
    </AppStoreContext.Provider>
  );
};

export const useAppStore = () => {
  const context = useContext(AppStoreContext);
  if (!context) {
    throw new Error('useAppStore must be used within AppStoreProvider');
  }
  return context;
};
