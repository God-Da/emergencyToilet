import React, { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [tipIndex, setTipIndex] = useState(0);

  const nextTip = () => {
    setTipIndex((prev) => (prev + 1) % TIPS.length);
  };

  const prevTip = () => {
    setTipIndex((prev) => (prev - 1 + TIPS.length) % TIPS.length);
  };

  return (
    <div className="w-full flex flex-col font-sans">
      {/* -----------------------------------------------------
            SECTION 1: 히어로 영역 (배경색  + 검색 + 오늘의 팁 + 지도)
      ----------------------------------------------------- */}
      <section className="bg-orange-50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            {/* 왼쪽: 검색 및 캠페인 영역 */}
            <div className="flex-1 flex flex-col justify-center">
              {/* 1. 대형 검색창 */}
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="검색어를 입력해주세요. (예: 강남역, 시민공원)"
                  className="w-full h-16 pl-6 pr-16 rounded-xl border-2 border-amber-900/10 focus:border-amber-600 focus:ring-2 focus:ring-amber-200 text-lg shadow-sm transition-all"
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-700 p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
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
                </button>
              </div>

              {/* 인기 검색어 */}
              <div className="flex gap-4 text-sm text-gray-600 mb-10 px-2">
                <span className="font-bold text-gray-800">인기 검색어</span>
                <span className="cursor-pointer hover:text-amber-700 hover:underline">1. 송파구 공공화장실</span>
                <span className="cursor-pointer hover:text-amber-700 hover:underline">2. 한강공원</span>
              </div>

              {/* 2. 생활 속 캠페인 (카드) */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100 flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1">
                  <span className="text-orange-600 font-bold text-sm mb-1 block">생활 속 탄소줄이기!</span>
                  <h3 className="text-2xl font-extrabold text-gray-800 mb-2">
                    <span className="text-4xl text-gray-300 mr-2">01</span>물 절약하기!
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    수도꼭지는 적당한 수압(절반이하)으로 조절해서 사용하고,
                    <br />물 일 보기 전 물 내리는 행위는 금지해주세요!
                  </p>
                </div>
                {/* 일러스트 자리 (임시 박스) */}
                <div className="w-full md:w-48 h-32 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-100">
                  <span className="text-blue-300 text-xs">💧 절약 캠페인 이미지</span>
                </div>
              </div>
            </div>

            {/* 오른쪽: 내 위치 지도 (플레이스홀더) */}
            <div className="w-full lg:w-[400px] bg-gray-200 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center min-h-[300px] relative group cursor-pointer">
              <div className="absolute inset-0 bg-gray-300/50 group-hover:bg-gray-300/30 transition-colors"></div>
              <div className="text-center z-10">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <span className="text-3xl">📍</span>
                </div>
                <p className="text-gray-600 font-bold">내 주변 화장실 찾기</p>
                <p className="text-xs text-gray-500 mt-1">지도를 클릭하여 위치를 허용해주세요</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -----------------------------------------------------
          SECTION 2: 자주 찾는 메뉴
      ----------------------------------------------------- */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-2xl font-bold text-gray-800">자주 찾는 메뉴</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {QUICK_MENUS.map((menu, idx) => (
              <Link
                to={menu.path}
                key={idx}
                className="flex items-center gap-4 p-5 rounded-xl bg-orange-50/50 hover:bg-orange-100 transition-colors border border-transparent hover:border-orange-200 group"
              >
                <div
                  className={`w-19 h-19 rounded-full bg-white flex items-center justify-center text-2xl ${menu.iconBg}`}
                >
                  {menu.icon}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 group-hover:text-amber-700">{menu.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{menu.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* -----------------------------------------------------
          SECTION 3: 공지사항 & 팁 (2단 분할)
      ----------------------------------------------------- */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 왼쪽: 공지사항 리스트 */}
            <div className="lg:col-span-2 border border-gray-200 rounded-2xl p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">공지사항</h2>
                <Link to="/notice" className="text-sm text-gray-500 hover:text-amber-700 flex items-center">
                  더보기 <span className="text-lg ml-1">+</span>
                </Link>
              </div>
              <ul className="flex flex-col divide-y divide-gray-100">
                {NOTICES.map((notice, idx) => (
                  <li
                    key={idx}
                    className="py-4 flex justify-between items-center hover:bg-gray-50 px-2 rounded transition-colors cursor-pointer"
                  >
                    <span className="text-gray-700 truncate pr-4">{notice.title}</span>
                    <span className="text-sm text-gray-400 whitespace-nowrap">{notice.date}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 오른쪽: 팁 */}
            <div className="bg-orange-50 rounded-2xl p-8 flex flex-col justify-between items-center text-center border border-orange-100">
              <div>
                <span className="text-xs font-bold text-amber-600 bg-white px-2 py-1 rounded-full mb-3 inline-block">
                  알아두면 좋은 Tip!
                </span>

                <h3 className="text-xl font-bold text-gray-800 mb-2">{TIPS[tipIndex].title}</h3>

                <p className="text-sm text-gray-500">{TIPS[tipIndex].subtitle}</p>
              </div>

              {/* 일러스트 */}
              <div className="my-6 w-32 h-32 relative">
                <img src={TIPS[tipIndex].img} alt="Tip Image" />
              </div>

              {/* 슬라이드 컨트롤러 */}
              <div className="flex items-center gap-2 bg-white rounded-full px-3 py-1 shadow-sm">
                <span className="text-xs font-bold">
                  {tipIndex + 1} / {TIPS.length}
                </span>

                <div className="flex gap-1">
                  <button onClick={prevTip} className="w-5 h-5 rounded-full hover:bg-gray-100 text-gray-400 text-xs">
                    {"<"}
                  </button>

                  <button onClick={nextTip} className="w-5 h-5 rounded-full hover:bg-gray-100 text-gray-400 text-xs">
                    {">"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -----------------------------------------------------
          SECTION 4: 급똥지도 소개 (하단 카드 3개)
      ----------------------------------------------------- */}
      <section className="py-12 bg-white mb-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-bold text-gray-800">급똥지도 소개</h2>
            <Link to="/about" className="text-sm text-gray-500 hover:text-amber-700 flex items-center">
              더보기 <span className="text-lg ml-1">+</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BOTTOM_CARDS.map((card, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="h-48 bg-gray-50 flex items-center justify-center relative overflow-hidden">
                  {/* 배경 장식 */}
                  <div className="absolute w-64 h-64 bg-white/50 rounded-full -top-10 -right-10 blur-xl"></div>
                  <div className="text-6xl drop-shadow-md z-10 transform group-hover:scale-110 transition-transform duration-300">
                    {card.emoji}
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded mb-3 inline-block border border-amber-100">
                    {card.tag}
                  </span>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">{card.desc}</p>
                  <Link
                    to={card.link}
                    className="text-sm font-bold text-gray-400 group-hover:text-amber-700 flex items-center gap-1 transition-colors"
                  >
                    자세히보기 →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// ----------------------------------------------------------------------
// DATA
// ----------------------------------------------------------------------

const QUICK_MENUS = [
  {
    title: "공지사항",
    desc: "대한민국의 공공화장실을 세계적인 명품으로",
    icon: "🏆",
    path: "/notice",
  },
  {
    title: "재미있는 화장실 이야기",
    desc: "화장실에 대한 이모저모",
    icon: "📝",
    path: "/story",
  },
  {
    title: "배움터",
    desc: "깨끗하고 안전한 화장실 문화 정착",
    icon: "📄",
    path: "/learn",
  },
  {
    title: "FAQ",
    desc: "궁금한 사항들은 이곳에 남겨주세요",
    icon: "🎧",
    path: "/faq",
  },
];

const NOTICES = [
  {
    title: "제20회 공중화장실 혁신 아이디어 공모전 신청 안내",
    date: "2025-08-09",
  },
  {
    title: "공중화장실 관리인 온라인 위생교육을 새롭게 오픈 하였습니다.",
    date: "2025-08-13",
  },
  {
    title: "주한 몽골대사관 오르길도르즈 참사관 협회 / 이동식 화장실 견학",
    date: "2025-05-16",
  },
  {
    title: "전국 지자체별 공중화장실 현황(2024년 12월 31일 기준)",
    date: "2025-02-10",
  },
  {
    title: "인공지능(AI) 기술을 활용해 공중 화장실을 효율적으로 관리할 수 있는 방안",
    date: "2025-02-07",
  },
];

const TIPS = [
  {
    title: "한국 화장실 협회",
    subtitle: "깨끗하고 아름다운 화장실 문화",
    img: "/building.svg",
  },
  {
    title: "공중화장실 관리 TIP",
    subtitle: "누구나 지켜야 할 기본 매너",
    img: "/clean.svg",
  },
  {
    title: "화장실 안전수칙",
    subtitle: "위급 상황 대비 안내",
    img: "/safe.svg",
  },
];

const BOTTOM_CARDS = [
  {
    tag: "사업",
    emoji: <img src="/ptrms.svg" alt="세팅" />,
    title: "공중화장실 원격관리시스템(PTRMS)",
    desc: "IT 기술을 활용해 공중화장실을 보다 효율적이고 안전하게 관리하기 위한 스마트 시스템으로 단순한 시설 관리 수준을 넘어서는 혁신 기술입니다.",
    link: "/about/system",
  },
  {
    tag: "설문",
    emoji: <img src="/reserch.svg" alt="검색" />,
    title: "전국 공중화장실 실태조사",
    desc: "전국 공중화장실 관리실태 조사와 비교평가를 통해 공중화장실 미비점 개선 및 선진화장실문화 정착과 기본정책 자료로 활용하고자 합니다.",
    link: "/about/survey",
  },
  {
    tag: "행사",
    emoji: <img src="/toilet.svg" alt="화장실" />,
    title: "사랑의 화장실 지어주기",
    desc: "우리 주변을 둘러보면 아직까지도 더럽고 불결한 화장실을 그대로 사용하거나 이마저도 없어 불편한 생활을 하는 이웃들이 너무나도 많이 있습니다.",
    link: "/about/campaign",
  },
];

export default Home;
