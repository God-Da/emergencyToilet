// src/constants/menuData.js
export const NAV_ITEMS = [
  {
    title: "급똥지도란",
    path: "/find",
    subItems: [
      { title: "화장실 찾기", path: "/find" },
      { title: "주요/협력업무", path: "/find/business1" },      
    ],
  },
  {
    title: "공지/소식",
    path: "/notice",
    subItems: [
      { title: "공지사항", path: "/notice" },
      { title: "자유게시판 Q&A", path: "/notice/qna" },
    ],
  },
  {
    title: "아름다운화장실",
    path: "/best",
    subItems: [
      { title: "재미있는 화장실 이야기", path: "/best/story" },
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
