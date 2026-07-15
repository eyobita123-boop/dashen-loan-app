import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  fullName: string;
  role: string;
  branch?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Always set a fake user – no API calls
  const [user] = useState<User>({
    id: '1',
    email: 'admin@dashen.com',
    fullName: 'Admin User',
    role: 'ADMIN',
  });
  const [loading] = useState(false);

  const login = async () => {
    // Do nothing – already logged in
  };

  const register = async () => {
    // Do nothing
  };

  const logout = () => {
    // Do nothing – but you could clear state if needed
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: true,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
