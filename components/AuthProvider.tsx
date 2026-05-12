'use client';

import { SessionProvider, useSession, signOut, getSession } from 'next-auth/react';
import { createContext, useContext, useMemo } from 'react';

type AuthUser = {
  _id?: string;
  username?: string;
  email?: string;
  isVerified?: boolean;
  isAdmin?: boolean;
};

type AuthContextValue = {
  user: any | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  refreshAuth: () => Promise<void>;
  clearAuth: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function InnerProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  const refreshAuth = async () => {
    await getSession();
  };

  const clearAuth = () => {
    void signOut({ redirect: false });
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user: session?.user ?? null,
      isAuthenticated: !!session,
      isLoading: status === 'loading',
      refreshAuth,
      clearAuth
    }),
    [session, status]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <InnerProvider>{children}</InnerProvider>
    </SessionProvider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}