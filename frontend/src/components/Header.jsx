// src/components/Header.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "./Navigation"; // 분리한 메뉴 불러오기
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { user, loading, logout } = useAuth();

  // 로그아웃 함수
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm font-sans">
      <div className="container mx-auto px-4">
        {/* [1단] 상단 로고 및 우측 유틸리티 영역 */}
        <div className="flex items-center justify-between py-4">
          {/* 왼쪽: 로고 */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/logo.svg"
              alt="급똥지도 로고"
              className="h-10 w-auto group-hover:rotate-12 transition-transform duration-300"
            />
          </Link>

          {/* 오른쪽: 검색 / 로그인 상태에 따른 버튼 */}
          <div className="flex items-center gap-6">
            <UtilityButton icon="search" label="통합검색" />
            
            {loading ? (
              <div className="text-sm text-gray-500">로딩 중...</div>
            ) : user ? (
              // 로그인된 경우: 사용자명, 마이페이지, 로그아웃
              <>
                <div className="flex items-center gap-4">
                  <Link to="/mypage" className="flex items-center gap-2 text-gray-700 hover:text-orange-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span className="text-sm font-medium">{user.name || user.username}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex flex-col items-center group cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-600 group-hover:text-amber-700 mb-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span className="text-xs font-medium text-gray-600 group-hover:text-amber-700">
                      로그아웃
                    </span>
                  </button>
                </div>
              </>
            ) : (
              // 로그인되지 않은 경우: 로그인, 회원가입
              <>
                <Link to="/login">
                  <UtilityButton icon="login" label="로그인" />
                </Link>
                <Link to="/signup">
                  <UtilityButton icon="user" label="회원가입" />
                </Link>
              </>
            )}
          </div>
        </div>

        {/* [2단] 하단 메뉴바 (컴포넌트로 교체!) */}
        <Navigation />
      </div>
    </header>
  );
};

// 우측 상단 버튼들이 반복되니 이것도 살짝 정리해두면 좋습니다 (같은 파일 하단에 작성)
const UtilityButton = ({ icon, label }) => {
  return (
    <div className="flex flex-col items-center group cursor-pointer">
      {icon === "search" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-600 group-hover:text-amber-700 mb-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      )}
      {icon === "login" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-600 group-hover:text-amber-700 mb-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
          />
        </svg>
      )}
      {icon === "user" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-600 group-hover:text-amber-700 mb-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
          />
        </svg>
      )}
      <span className="text-xs font-medium text-gray-600 group-hover:text-amber-700">
        {label}
      </span>
    </div>
  );
};

export default Header;
