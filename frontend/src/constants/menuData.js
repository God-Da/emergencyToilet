// src/constants/menuData.js
export const NAV_ITEMS = [
  {
    title: "급똥지도란",
    path: "/about",
    subItems: [
      { title: "서비스 소개", path: "/about/intro" },
      { title: "이용 가이드", path: "/about/guide" },
      { title: "개발팀 소개", path: "/about/team" },
    ],
  },
  {
    title: "공지/소식",
    path: "/notice",
    subItems: [
      { title: "공지사항", path: "/notice/list" },
      { title: "업데이트 로그", path: "/notice/updates" },
      { title: "이벤트", path: "/notice/events" },
    ],
  },
  {
    title: "아름다운화장실",
    path: "/best",
    subItems: [
      { title: "베스트 리뷰", path: "/best/reviews" },
      { title: "이달의 화장실", path: "/best/monthly" },
    ],
  },
  {
    title: "마이페이지",
    path: "/mypage",
    subItems: [
      { title: "내 정보 수정", path: "/mypage/info" },
      { title: "내가 쓴 리뷰", path: "/mypage/reviews" },
      { title: "찜한 화장실", path: "/mypage/bookmarks" },
    ],
  },
];
