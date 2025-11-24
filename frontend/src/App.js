import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // 백엔드 API 호출
    fetch("http://localhost:8080/api/test")
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch((err) => console.error("에러 발생:", err));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        프론트엔드 - 백엔드 연결 테스트
      </h1>
      <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
        <p className="text-xl text-gray-800">
          백엔드 응답:{" "}
          <span className="font-bold text-green-600">
            {message || "로딩 중..."}
          </span>
        </p>
      </div>
    </div>
  );
}

export default App;
