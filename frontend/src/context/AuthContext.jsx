import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 로그인 상태 확인
  const checkLoginStatus = async () => {
    try {
      const response = await api.get("/api/auth/me");
      if (response.data.success) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      // 401 (Unauthorized)는 로그인되지 않은 상태이므로 정상 처리
      if (error.response?.status === 401) {
        setUser(null);
      } else {
        console.error("로그인 상태 확인 실패:", error);
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  // 로그인
  const login = async (username, password) => {
    try {
      const response = await api.post(
        "/api/auth/login",
        { username, password },
        { withCredentials: true }
      );
      if (response.data.success) {
        setUser(response.data.user);
        return { success: true };
      }
      return { success: false, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "로그인 중 오류가 발생했습니다.",
      };
    }
  };

  // 로그아웃
  const logout = async () => {
    try {
      await api.post("/api/auth/logout");
      setUser(null);
      return { success: true };
    } catch (error) {
      console.error("로그아웃 실패:", error);
      // 에러가 발생해도 로컬 상태는 초기화
      setUser(null);
      return { success: true };
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const value = {
    user,
    loading,
    login,
    logout,
    checkLoginStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

