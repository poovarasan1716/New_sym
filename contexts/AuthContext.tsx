"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AUTH_STORAGE_KEY = 'auth_user';

interface User {
  id: string;
  teamName: string;
  member1: string;
  member2: string;
  code: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (teamName: string, member1: string, member2: string, code: string) => Promise<void>;
  loginWithGoogle: (info: unknown) => Promise<void>;
  signup: (email: string, password: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (error) {
      console.log('Error loading user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = useCallback(async (teamName: string, member1: string, member2: string, code: string) => {
    // Simulate API call
    const newUser: User = {
      id: Date.now().toString(),
      teamName,
      member1,
      member2,
      code,
    };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
    setUser(newUser);
  }, []);

  const loginWithGoogle = useCallback(async (info: unknown) => {
    // Mock implementation
    const newUser: User = {
      id: Date.now().toString(),
      teamName: 'Google Team',
      member1: 'Google User',
      member2: '',
      code: 'GOOGLE_AUTH',
    };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
    setUser(newUser);
  }, []);

  const signup = useCallback(async (email: string, password: string, username: string) => {
    const newUser: User = {
      id: Date.now().toString(),
      teamName: username + "'s Team",
      member1: username,
      member2: '',
      code: 'SIGNUP_FLOW',
    };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
    setUser(newUser);
  }, []);

  const logout = useCallback(async () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, login, loginWithGoogle, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}
