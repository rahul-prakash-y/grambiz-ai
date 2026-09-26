import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, getAuthToken, setAuthToken, getCurrentUser } from '../api';

const AuthContext = createContext(null);

export const DEFAULT_DEMO_USER = {
  id: 'usr-selvaraj-001',
  email: 'selvaraj@grambiz.ai',
  full_name: 'Selvaraj Kumar',
  role: 'Agri-Enterprise Owner',
  location: 'Kallupatti Village, Madurai',
};

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getAuthToken());
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('grambiz_user');
      return stored ? JSON.parse(stored) : DEFAULT_DEMO_USER;
    } catch {
      return DEFAULT_DEMO_USER;
    }
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(getAuthToken()));
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('login'); // 'login' | 'register'
  const [authError, setAuthError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // If token is missing, initialize with demo token or allow guest mode
  useEffect(() => {
    const existingToken = getAuthToken();
    if (existingToken) {
      setIsAuthenticated(true);
      getCurrentUser()
        .then((profile) => {
          if (profile) {
            setUser(profile);
            localStorage.setItem('grambiz_user', JSON.stringify(profile));
          }
        })
        .catch(() => {
          // Token might be expired or backend temporarily unavailable
        });
    } else {
      // Auto-set demo credentials if none present for immediate usability
      // Or keep user as default demo
      setIsAuthenticated(false);
    }
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const res = await loginUser(email, password);
      setToken(res.access_token);
      setUser(res.user);
      setIsAuthenticated(true);
      setIsAuthModalOpen(false);
      return res.user;
    } catch (err) {
      setAuthError(err.message || 'Login failed. Please verify your credentials.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const res = await registerUser(userData);
      setToken(res.access_token);
      setUser(res.user);
      setIsAuthenticated(true);
      setIsAuthModalOpen(false);
      return res.user;
    } catch (err) {
      setAuthError(err.message || 'Registration failed. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('grambiz_user');
    setToken('');
    setUser(null);
    setIsAuthenticated(false);
  };

  const openLogin = () => {
    setAuthError(null);
    setAuthModalTab('login');
    setIsAuthModalOpen(true);
  };

  const openRegister = () => {
    setAuthError(null);
    setAuthModalTab('register');
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setAuthError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated,
        isLoading,
        authError,
        isAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        login,
        register,
        logout,
        openLogin,
        openRegister,
        closeAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
