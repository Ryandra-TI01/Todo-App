import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/axios";
import { useQueryClient } from "@tanstack/react-query";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false); // Track if auth is initialized
  const queryClient = useQueryClient();
  // Helper function untuk clear auth state
  const clearAuthState = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  // Initial auth check - hanya sekali saat app load
  useEffect(() => {
    const initializeAuth = async () => {
      const savedToken = localStorage.getItem("token");
      
      if (savedToken) {
        try {
          const response = await API.get("/api/user", {
            headers: { Authorization: `Bearer ${savedToken}` },
          });
          setUser(response.data);
          setToken(savedToken);
        } catch (error) {
          console.error("Token validation failed:", error);
          clearAuthState();
        }
      }
      
      setLoading(false);
      setInitialized(true);
    };

    if (!initialized) {
      initializeAuth();
    }
  }, []); // Empty dependency - hanya run sekali

  // Setup axios interceptor untuk handle token expiry
  useEffect(() => {
    const interceptor = API.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 && token) {
          console.log("Token expired, clearing auth state");
          clearAuthState();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      API.interceptors.response.eject(interceptor);
    };
  }, [token]);

  const login = async (email, password) => {
    try {
      await API.get("/sanctum/csrf-cookie");
      const res = await API.post("/api/auth/login", { email, password });
      const newToken = res.data.token;
      
      localStorage.setItem("token", newToken);
      setToken(newToken);

      // Ambil user data
      const userRes = await API.get("/api/user", {
        headers: { Authorization: `Bearer ${newToken}` },
      });
      setUser(userRes.data);
    } catch (error) {
      clearAuthState();
      throw error;
    }
  };

  const register = async (name, email, password, password_confirmation) => {
    try {
      await API.get("/sanctum/csrf-cookie");
      const res = await API.post("/api/auth/register", { 
        name, 
        email, 
        password, 
        password_confirmation 
      });
      const newToken = res.data.token;
      
      localStorage.setItem("token", newToken);
      setToken(newToken);

      const userRes = await API.get("/api/user", {
        headers: { Authorization: `Bearer ${newToken}` },
      });
      setUser(userRes.data);
    } catch (error) {
      clearAuthState();
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (token) {
        await API.post("/api/auth/logout", null, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      clearAuthState();
      queryClient.clear(); // Clear all queries on logout
    }
  };

  // Method untuk refresh user data (jika diperlukan)
  const refreshUser = async () => {
    if (!token) return;
    
    try {
      const response = await API.get("/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Failed to refresh user:", error);
      clearAuthState();
    }
  };

  // useEffect(() => {
  //   console.log("Token from localStorage:", localStorage.getItem("token"));
  //   console.log("Token state:", token);
  //   console.log("User state:", user);
  // }, [token, user]);

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      login, 
      logout, 
      register, 
      loading,
      initialized,
      refreshUser, // Untuk manual refresh jika diperlukan
      isAuthenticated: !!user && !!token 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);