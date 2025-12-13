import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Qna = () => {
  const navigate = useNavigate();
  const [qnas, setQnas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQnas();
  }, []);

  const fetchQnas = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/api/qna");
      if (response.data.success) {
        setQnas(response.data.data || []);
      }
    } catch (error) {
      console.error("Q&A 조회 실패:", error);
      setError("Q&A를 불러오는데 실패했습니다.");
      setQnas([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col font-sans min-h-screen bg-white">
      {/* 헤더 섹션 */}
      <div className="bg-orange-50 py-12 border-b border-orange-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">자유게시판 Q&A</h1>
              <p className="text-gray-600">궁금한 사항을 자유롭게 질문해주세요</p>
            </div>
            <button
              onClick={() => navigate("/notice/qna/write")}
              className="px-6 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-colors"
            >
              글쓰기
            </button>
          </div>
        </div>
      </div>

      {/* Q&A 목록 */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* 테이블 헤더 */}
            <div className="border-2 border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 w-20">번호</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">제목</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 w-32">답변여부</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 w-32">작성자</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 w-40">작성일</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                        로딩 중...
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center text-red-500">
                        {error}
                      </td>
                    </tr>
                  ) : qnas.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                        등록된 Q&A가 없습니다.
                      </td>
                    </tr>
                  ) : (
                    qnas.map((qna, idx) => (
                      <tr
                        key={qna.id}
                        onClick={() => navigate(`/notice/qna/${qna.id}`)}
                        className="border-t border-gray-100 hover:bg-orange-50 cursor-pointer transition-colors"
                      >
                        <td className="px-6 py-4 text-sm text-gray-600">{qnas.length - idx}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-800">{qna.title}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          {qna.isAnswered ? (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                              답변완료
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700">
                              답변대기
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center text-sm text-gray-600">{qna.author}</td>
                        <td className="px-6 py-4 text-center text-sm text-gray-500">{qna.createdDate}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* 페이지네이션 */}
            {!loading && !error && qnas.length > 0 && (
              <div className="mt-8 flex justify-center">
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 font-bold">
                    1
                  </button>
                  <button className="px-4 py-2 bg-white text-gray-600 rounded-lg hover:bg-gray-50">
                    2
                  </button>
                  <button className="px-4 py-2 bg-white text-gray-600 rounded-lg hover:bg-gray-50">
                    3
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Qna;

