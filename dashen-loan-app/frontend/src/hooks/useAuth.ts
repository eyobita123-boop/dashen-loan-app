import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { login as apiLogin, register as apiRegister, getMe } from '../services/auth';

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
                        const [user, setUser] = useState<User | null>(null);
                          const [loading, setLoading] = useState(true);

                            useEffect(() => {
                                const token = localStorage.getItem('token');
                                    if (token) {
                                          getMe()
                                                  .then((res) => {
                                                            if (res.success) {
                                                                        setUser(res.data);
                                                                                  } else {
                                                                                              localStorage.removeItem('token');
                                                                                                        }
                                                                                                                })
                                                                                                                        .catch(() => localStorage.removeItem('token'))
                                                                                                                                .finally(() => setLoading(false));
                                                                                                                                    } else {
                                                                                                                                          setLoading(false);
                                                                                                                                              }
                                                                                                                                                }, []);

                                                                                                                                                  const login = async (email: string, password: string) => {
                                                                                                                                                      const res = await apiLogin(email, password);
                                                                                                                                                          if (res.success) {
                                                                                                                                                                localStorage.setItem('token', res.data.token);
                                                                                                                                                                      setUser(res.data.user);
                                                                                                                                                                          } else {
                                                                                                                                                                                throw new Error(res.error || 'Login failed');
                                                                                                                                                                                    }
                                                                                                                                                                                      };

                                                                                                                                                                                        const register = async (data: any) => {
                                                                                                                                                                                            const res = await apiRegister(data);
                                                                                                                                                                                                if (!res.success) throw new Error(res.error || 'Registration failed');
                                                                                                                                                                                                  };

                                                                                                                                                                                                    const logout = () => {
                                                                                                                                                                                                        localStorage.removeItem('token');
                                                                                                                                                                                                            setUser(null);
                                                                                                                                                                                                              };

                                                                                                                                                                                                                return (
                                                                                                                                                                                                                    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated: !!user }}>
                                                                                                                                                                                                                          {children}
                                                                                                                                                                                                                              </AuthContext.Provider>
                                                                                                                                                                                                                                );
                                                                                                                                                                                                                                };

                                                                                                                                                                                                                                export const useAuth = () => {
                                                                                                                                                                                                                                  const context = useContext(AuthContext);
                                                                                                                                                                                                                                    if (!context) throw new Error('useAuth must be used within AuthProvider');
                                                                                                                                                                                                                                      return context;
                                                                                                                                                                                                                                      };