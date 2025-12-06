"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

export type UserRole = 'tenant' | 'landlord' | null;

interface RoleContextValue {
  role: UserRole;
  isAuthenticated: boolean;
  isReady: boolean;
  login: (role: Exclude<UserRole, null>) => void;
  logout: () => void;
}

const RoleContext = createContext<RoleContextValue>({
  role: null,
  isAuthenticated: false,
  isReady: false,
  login: () => {},
  logout: () => {},
});

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>(null);
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem('role') : null;
    if (stored === 'tenant' || stored === 'landlord') {
      setRole(stored);
    }
    setReady(true);
  }, []);

  const login = (nextRole: Exclude<UserRole, null>) => {
    setRole(nextRole);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('role', nextRole);
    }
  };

  const logout = () => {
    setRole(null);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('role');
    }
  };

  const value = useMemo(
    () => ({
      role,
      isAuthenticated: role !== null,
      isReady,
      login,
      logout,
    }),
    [role, isReady],
  );

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRole() {
  return useContext(RoleContext);
}
