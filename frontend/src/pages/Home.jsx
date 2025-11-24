import React from "react";
import { Link } from "react-router-dom"; // 이동 태그

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
      <h1 className="text-5xl font-bold text-blue-600 mb-6">🚽 급똥 구조대</h1>
      <p className="text-xl text-gray-700 mb-8">
        지금 당장 화장실이 급하신가요?
      </p>
      <Link
        to="/test"
        className="px-6 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition"
      >
        🚨 백엔드 통신 테스트하러 가기
      </Link>
    </div>
  );
};

export default Home;
