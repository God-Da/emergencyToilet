// src/components/Layout.jsx
import React from "react";
import Header from "./Header";
import Footer from "./Footer";

// children은 Layout 태그 사이에 들어오는 내용물(페이지들)입니다.
const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. 헤더 */}
      <Header />

      {/* 2. 본문 (내용이 적어도 푸터를 바닥으로 밀어내기 위해 flex-grow 사용) */}
      <main className="flex-grow bg-gray-50">
        {/* 실제 페이지 내용이 여기에 들어갑니다 */}
        {children}
      </main>

      {/* 3. 푸터 */}
      <Footer />
    </div>
  );
};

export default Layout;
