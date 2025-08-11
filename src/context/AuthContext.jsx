import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/axios";
import { useQueryClient } from "@tanstack/react-query";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const queryClient = useQueryClient();

  // Helper function untuk clear auth state
  const clearAuthState = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  // interceptor to auto set aurh bearer
  useEffect(() => {
    //
    const reqInterceptor = API.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    const resInterceptor = API.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          clearAuthState();
          queryClient.clear();
        }
        return Promise.reject(error);
      }
    );
    return () => {
      API.interceptors.request.eject(reqInterceptor);
      API.interceptors.response.eject(resInterceptor);
    };
  }, []);

  // Initial auth check - hanya sekali saat app load
  useEffect(() => {
    const initializeAuth = async () => {
      const savedToken = localStorage.getItem("token");

      if (savedToken) {
        try {
          const response = await API.get("/api/user");
          setUser(response.data);
          setToken(savedToken);
        } catch (error) {
          clearAuthState();
        }
      }

      setLoading(false);
      setInitialized(true);
    };

    if (!initialized) {
      initializeAuth();
    }
  }, []);

  // Login, Register, Logout functions
  const login = async (email, password) => {
    try {
      const res = await API.post("/api/auth/login", { email, password });
      const newToken = res.data.token;

      localStorage.setItem("token", newToken);
      setToken(newToken);

      const userRes = await API.get("/api/user");

      setUser(userRes.data);

      return userRes.data;
    } catch (error) {
      clearAuthState();
      throw error;
    }
  };

  const register = async (name, email, password, password_confirmation) => {
    try {
      const res = await API.post("/api/auth/register", {
        name,
        email,
        password,
        password_confirmation,
      });
      const newToken = res.data.token;

      localStorage.setItem("token", newToken);
      setToken(newToken);

      const userRes = await API.get("/api/user");

      setUser(userRes.data);

      return userRes.data;
    } catch (error) {
      clearAuthState();
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (token) {
        await API.post("/api/auth/logout");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      clearAuthState();
    }
  };

  const refreshUser = async () => {
    if (!token) {
      return;
    }

    try {
      const response = await API.get("/api/user");
      setUser(response.data);
    } catch (error) {
      clearAuthState();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        register,
        loading,
        initialized,
        refreshUser,
        isAuthenticated: !!user && !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
