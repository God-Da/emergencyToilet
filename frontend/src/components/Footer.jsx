// src/components/Footer.jsx

import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 border-t border-gray-200 mt-auto font-sans">
      {/* 1. 상단 메인 영역 */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* [왼쪽] 회사 정보 및 로고 */}
          <div className="space-y-4">
            {/* 로고 */}
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <img src="/logo.svg" alt="급똥지도 로고" className="h-8 w-auto" />
            </Link>

            {/* 주소 및 연락처 정보 */}
            <div className="text-sm leading-6">
              <p>(13174) 성남시 중원구 광명로 377</p>
              <p>
                <span className="font-bold text-gray-800">대표전화</span>{" "}
                031-740-1114
                <span className="mx-2 text-gray-300">|</span>
                (평일 09시-18시)
              </p>
              <p className="mt-2 font-bold text-gray-800">
                © 2025 Emergency Toilet Project ALL RIGHTS RESERVED.
              </p>
              <p className="mt-2 font-bold text-gray-800">
                급할 땐 언제나 우리를 찾으세요. 급똥지도
              </p>
            </div>
          </div>

          {/* [오른쪽] 바로가기 링크 및 소셜 아이콘 */}
          <div className="flex flex-col items-start md:items-end gap-6">
            {/* 텍스트 링크들 */}
            <div className="flex flex-col gap-2 items-start md:items-end">
              <Link
                to="/about/guide"
                className="flex items-center gap-1 hover:text-amber-700 hover:font-bold transition-all text-sm font-medium"
              >
                이용안내
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
              <Link
                to="/about/location"
                className="flex items-center gap-1 hover:text-amber-700 hover:font-bold transition-all text-sm font-medium"
              >
                찾아오시는 길
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>

            {/* 소셜 미디어 아이콘 */}
            <div className="flex gap-3">
              {/* 인스타그램 */}
              <SocialIcon href="#" label="Instagram">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.36-.201 6.78-2.617 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </SocialIcon>

              {/* 유튜브 */}
              <SocialIcon href="#" label="YouTube">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </SocialIcon>

              {/* 페이스북 */}
              <SocialIcon href="#" label="Facebook">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.641c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.513c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.737-.9 10.125-5.864 10.125-11.854z" />
              </SocialIcon>

              {/* 블로그 (말풍선 모양) */}
              <SocialIcon href="#" label="Blog">
                <path d="M12 2c5.514 0 10 3.592 10 8.007 0 4.917-5.145 8.261-9.981 8.034-2.285.952-4.467 1.838-6.021 2.067.147-1.161.464-2.88.924-4.043-2.795-1.583-4.922-3.805-4.922-6.058 0-4.415 4.486-8.007 10-8.007z" />
              </SocialIcon>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 하단 고지 영역 */}
      <div className="border-t border-gray-200 bg-gray-100">
        <div className="container mx-auto px-4 py-5 flex flex-col md:flex-row justify-end items-center gap-4 text-xs text-gray-500">
          <div className="text-center md:text-right">
            <p>© GodDa. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// 소셜 아이콘 재사용 컴포넌트 (원형 버튼 스타일)
const SocialIcon = ({ href, label, children }) => {
  return (
    <a
      href={href}
      aria-label={label}
      className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-amber-700 hover:text-white hover:border-amber-700 transition-all duration-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        {children}
      </svg>
    </a>
  );
};

export default Footer;
