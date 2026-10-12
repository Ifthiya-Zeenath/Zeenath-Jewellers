import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from 'firebase/auth';
import {
  loginWithEmail,
  logoutUser,
  subscribeToAuthState,
  getCurrentUser,
  sendPasswordReset,
  checkUserIsAdmin,
} from '../services/authService';
import type { AuthResponse } from '../services/authService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  refreshAdminStatus: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(getCurrentUser());
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isSubscribed = true;

    // Subscribe to Firebase auth state changes
    const unsubscribe = subscribeToAuthState(async (currentUser) => {
      if (!isSubscribed) return;

      if (!currentUser) {
        setUser(null);
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      setUser(currentUser);
      try {
        const verifiedAdmin = await checkUserIsAdmin(currentUser);
        if (isSubscribed) {
          setIsAdmin(verifiedAdmin);
        }
      } catch {
        if (isSubscribed) {
          setIsAdmin(false);
        }
      } finally {
        if (isSubscribed) {
          setLoading(false);
        }
      }
    });

    return () => {
      isSubscribed = false;
      unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<AuthResponse> => {
    setLoading(true);
    const res = await loginWithEmail(email, password);
    if (res.success && res.user) {
      setUser(res.user);
      setIsAdmin(Boolean(res.isAdmin));
    } else {
      setIsAdmin(false);
    }
    setLoading(false);
    return res;
  };

  const logout = async (): Promise<void> => {
    await logoutUser();
    setUser(null);
    setIsAdmin(false);
  };

  const resetPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
    return await sendPasswordReset(email);
  };

  const refreshAdminStatus = async (): Promise<boolean> => {
    if (!user) {
      setIsAdmin(false);
      return false;
    }
    const verified = await checkUserIsAdmin(user);
    setIsAdmin(verified);
    return verified;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: Boolean(user),
        isAdmin,
        login,
        logout,
        resetPassword,
        refreshAdminStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
