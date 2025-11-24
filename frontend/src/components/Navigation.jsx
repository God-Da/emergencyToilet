import React, { useState } from "react";
import { Link } from "react-router-dom";
import { NAV_ITEMS } from "../constants/menuData";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 디자인 설정: 고정 너비 + 왼쪽 정렬
  const COLUMN_CLASS = "w-48 text-left";

  return (
    <nav
      // 🚨 핵심 변경 1: 여기서 'relative'를 뺐습니다!
      // 이제 하위의 absolute 요소는 상위 부모 중 relative인 'Header'를 기준으로 잡힙니다.
      className="hidden md:block"
      onMouseEnter={() => setIsMenuOpen(true)}
      onMouseLeave={() => setIsMenuOpen(false)}
    >
      {/* 1. 상단 메인 메뉴 */}
      <div className="border-t border-gray-100">
        <ul className="flex justify-start">
          {NAV_ITEMS.map((item) => (
            <li key={item.title} className={`${COLUMN_CLASS} py-3 group`}>
              <Link
                to={item.path}
                className="flex items-center justify-start text-base font-bold text-gray-800 hover:text-amber-700 transition-colors"
              >
                {item.title}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ml-2 text-gray-400 transition-transform duration-200 ${
                    isMenuOpen
                      ? "rotate-180 text-amber-700"
                      : "group-hover:rotate-180 group-hover:text-amber-700"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* 2. 메가 메뉴 (서브메뉴들) */}
      <div
        // 🚨 핵심 변경 2: left-0 w-full은 이제 'Header' 전체 너비를 의미합니다.
        // top-full은 Header의 높이(100%)만큼 내려온 곳에서 시작한다는 뜻입니다.
        className={`absolute left-0 top-full w-full bg-white border-t border-gray-200 shadow-xl z-50 overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "max-h-96 opacity-100 visible"
            : "max-h-0 opacity-0 invisible"
        }`}
      >
        {/* 포인트 선 */}
        <div className="w-full h-0.5 bg-amber-700"></div>

        {/* 내부 컨텐츠를 위한 container 칼각 정렬용*/}
        <div className="container mx-auto px-4">
          <div className="py-6">
            <ul className="flex justify-start">
              {NAV_ITEMS.map((item, index) => (
                <li
                  key={index}
                  className={`${COLUMN_CLASS} border-r border-gray-100 last:border-0 px-0`}
                >
                  <ul className="flex flex-col gap-3">
                    {item.subItems &&
                      item.subItems.map((subItem) => (
                        <li key={subItem.title}>
                          <Link
                            to={subItem.path}
                            className="text-sm text-gray-500 hover:text-amber-800 hover:font-bold hover:underline transition-all block py-1"
                          >
                            - {subItem.title}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 하단 여백 */}
        <div className="h-4 bg-gray-50"></div>
      </div>
    </nav>
  );
};

export default Navigation;
