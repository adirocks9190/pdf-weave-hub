import { useState, useCallback, useEffect } from 'react';
import { User } from '@/types';
import { APP_CONFIG } from '@/config/constants';

export function useAuth() {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(APP_CONFIG.storage.userKey);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const persistUser = useCallback((user: User | null) => {
    if (user) {
      localStorage.setItem(APP_CONFIG.storage.userKey, JSON.stringify(user));
    } else {
      localStorage.removeItem(APP_CONFIG.storage.userKey);
    }
  }, []);

  const signIn = useCallback(async (username: string, password: string) => {
    // Mock authentication - replace with real API
    const user: User = {
      id: 1,
      username,
      token: `tkn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
    setCurrentUser(user);
    persistUser(user);
  }, [persistUser]);

  const register = useCallback(async (username: string, password: string) => {
    // Mock registration - replace with real API
    const user: User = {
      id: Math.floor(Math.random() * 10000),
      username,
      token: `tkn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
    setCurrentUser(user);
    persistUser(user);
  }, [persistUser]);

  const signOut = useCallback(() => {
    setCurrentUser(null);
    persistUser(null);
    // Clear cart on logout
    if (currentUser) {
      localStorage.removeItem(`${APP_CONFIG.storage.cartPrefix}${currentUser.id}`);
    }
  }, [persistUser, currentUser]);

  return {
    user: currentUser,
    isLoggedIn: !!currentUser,
    signIn,
    register,
    signOut,
  };
}
