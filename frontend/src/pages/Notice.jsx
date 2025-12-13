import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";

const Notice = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const isAdmin = user && user.username === "admin";

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/api/notices");
      setNotices(response.data || []);
    } catch (error) {
      console.error("공지사항 조회 실패:", error);
      setError("공지사항을 불러오는데 실패했습니다.");
      // 에러 발생 시 빈 배열로 설정
      setNotices([]);
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
              <h1 className="text-3xl font-bold text-gray-800 mb-2">공지사항</h1>
              <p className="text-gray-600">급똥지도의 최신 소식과 공지사항을 확인하세요</p>
            </div>
            {isAdmin && (
              <button
                onClick={() => navigate("/notice/write")}
                className="px-6 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-colors"
              >
                글쓰기
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 공지사항 목록 */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* 공지사항 헤더 */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-orange-200">
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-orange-600">전체</span>
                <span className="text-sm text-gray-500">({notices.length}개)</span>
              </div>
            </div>

            {/* 로딩 상태 */}
            {loading && (
              <div className="text-center py-12 text-gray-500">
                <p>공지사항을 불러오는 중...</p>
              </div>
            )}

            {/* 에러 상태 */}
            {error && (
              <div className="text-center py-12 text-red-500">
                <p>{error}</p>
              </div>
            )}

            {/* 공지사항 리스트 */}
            {!loading && !error && (
              <div className="space-y-2">
                {notices.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <p>등록된 공지사항이 없습니다.</p>
                  </div>
                ) : (
                  notices.map((notice, idx) => (
                    <div
                      key={notice.id}
                      onClick={() => navigate(`/notice/${notice.id}`)}
                      className="flex items-center justify-between p-5 rounded-xl bg-white border-2 border-gray-100 hover:border-orange-300 hover:bg-orange-50/50 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-sm group-hover:bg-orange-200 transition-colors">
                          {idx + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-800 group-hover:text-orange-700 transition-colors truncate">
                            {notice.title}
                          </h3>
                        </div>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        <span className="text-sm text-gray-500 whitespace-nowrap">
                          {notice.createdDate}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* 페이지네이션 (추후 구현 가능) */}
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default Notice;

