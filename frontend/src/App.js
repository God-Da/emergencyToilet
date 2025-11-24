// src/App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout"; // 레이아웃 불러오기x
import Home from "./pages/Home";
import TestPage from "./pages/TestPage";

function App() {
  return (
    <BrowserRouter>
      {/* Layout으로 전체를 감싸면 모든 페이지에 헤더/푸터가 적용됨 */}
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
