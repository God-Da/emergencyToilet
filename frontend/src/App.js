// src/App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout"; // 레이아웃 불러오기x
import Home from "./pages/Home";
import TestPage from "./pages/TestPage";
import Find from "./pages/Find";
import Business1 from "./pages/Business1";
import Business2 from "./pages/Business2";
import Business3 from "./pages/Business3";
import Notice from "./pages/Notice";
import NoticeDetail from "./pages/NoticeDetail";
import Story from "./pages/Story";
import StoryDetail from "./pages/StoryDetail";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Qna from "./pages/Qna";
import QnaDetail from "./pages/QnaDetail";
import QnaWrite from "./pages/QnaWrite";
import QnaEdit from "./pages/QnaEdit";
import NoticeWrite from "./pages/NoticeWrite";
import MyReviews from "./pages/MyReviews";
import MyBookmarks from "./pages/MyBookmarks";
import ToiletReview from "./pages/ToiletReview";
import MyPageEdit from "./pages/MyPageEdit";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Layout으로 전체를 감싸면 모든 페이지에 헤더/푸터가 적용됨 */}
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/find" element={<Find />} />
            <Route path="/find/business1" element={<Business1 />} />
            <Route path="/find/business2" element={<Business2 />} />
            <Route path="/find/business3" element={<Business3 />} />
            <Route path="/notice" element={<Notice />} />
            <Route path="/notice/write" element={<NoticeWrite />} />
            <Route path="/notice/:id" element={<NoticeDetail />} />
            <Route path="/notice/qna" element={<Qna />} />
            <Route path="/notice/qna/write" element={<QnaWrite />} />
            <Route path="/notice/qna/:id" element={<QnaDetail />} />
            <Route path="/notice/qna/:id/edit" element={<QnaEdit />} />
            <Route path="/best/story" element={<Story />} />
            <Route path="/best/story/:id" element={<StoryDetail />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/mypage" element={<MyPageEdit />} />
            <Route path="/mypage/reviews" element={<MyReviews />} />
            <Route path="/mypage/bookmarks" element={<MyBookmarks />} />
            <Route path="/toilet/:id/review" element={<ToiletReview />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
