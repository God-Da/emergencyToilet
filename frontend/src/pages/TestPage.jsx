import React, { useEffect, useState } from "react";
import api from "../api"; // 아까 만든 api.js 불러오기
import { Link } from "react-router-dom";

const TestPage = () => {
  const [message, setMessage] = useState("불러오는 중...");
  console.log("불러온 api 객체:", api);

  useEffect(() => {
    // [변경 전] fetch 사용
    // fetch("http://localhost:8080/api/test")
    //   .then((res) => res.text())
    //   .then((data) => setMessage(data));

    // [변경 후] axios(api) 사용
    // 주소 앞에 http://... 생략 가능!
    // Axios(api)를 통해 백엔드 통신
    api
      .get("/api/test")
      .then((response) => setMessage(response.data))
      .catch((error) => setMessage("에러 발생: 백엔드가 켜져 있나요?"));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-4">백엔드 연결 테스트</h2>
      <div className="p-6 bg-white rounded shadow-md text-center">
        <p className="text-lg text-gray-800">
          서버 응답: <span className="font-bold text-blue-600">{message}</span>
        </p>
      </div>
      <br />
      <Link to="/" className="text-blue-500 underline">
        🏠 홈으로 돌아가기
      </Link>
    </div>
  );
};

export default TestPage;
