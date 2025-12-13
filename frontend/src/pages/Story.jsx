import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Story = () => {
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/api/stories");
      setStories(response.data || []);
    } catch (error) {
      console.error("이야기 조회 실패:", error);
      setError("이야기를 불러오는데 실패했습니다.");
      setStories([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col font-sans min-h-screen bg-white">
      {/* 헤더 섹션 */}
      <div className="bg-orange-50 py-12 border-b border-orange-100">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">재미있는 화장실 이야기</h1>
          <p className="text-gray-600">화장실에 대한 재미있고 흥미로운 이야기들을 만나보세요</p>
        </div>
      </div>

      {/* 이야기 목록 */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* 헤더 */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-orange-200">
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-orange-600">전체</span>
                <span className="text-sm text-gray-500">({stories.length}건)</span>
              </div>
            </div>

            {/* 로딩 상태 */}
            {loading && (
              <div className="text-center py-12 text-gray-500">
                <p>이야기를 불러오는 중...</p>
              </div>
            )}

            {/* 에러 상태 */}
            {error && (
              <div className="text-center py-12 text-red-500">
                <p>{error}</p>
              </div>
            )}

            {/* 이야기 리스트 */}
            {!loading && !error && (
              <div className="space-y-2">
                {stories.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <p>등록된 이야기가 없습니다.</p>
                  </div>
                ) : (
                  stories.map((story, idx) => (
                    <div
                      key={story.id}
                      onClick={() => navigate(`/best/story/${story.id}`)}
                      className="flex items-center justify-between p-5 rounded-xl bg-white border-2 border-gray-100 hover:border-orange-300 hover:bg-orange-50/50 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-sm group-hover:bg-orange-200 transition-colors">
                          {idx + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-800 group-hover:text-orange-700 transition-colors truncate">
                            {story.title}
                          </h3>
                        </div>
                      </div>
                      <div className="flex-shrink-0 ml-4 flex items-center gap-4">
                        <span className="text-sm text-gray-500">{story.author}</span>
                        <span className="text-sm text-gray-500 whitespace-nowrap">
                          {story.createdDate}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* 페이지네이션 */}
            {!loading && !error && stories.length > 0 && (
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

export default Story;

