import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

const StoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allStories, setAllStories] = useState([]);

  useEffect(() => {
    fetchStory();
    fetchAllStories();
  }, [id]);

  const fetchStory = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/api/stories/${id}`);
      setStory(response.data);
    } catch (error) {
      console.error("이야기 조회 실패:", error);
      setError("이야기를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllStories = async () => {
    try {
      const response = await api.get("/api/stories");
      setAllStories(response.data || []);
    } catch (error) {
      console.error("이야기 목록 조회 실패:", error);
    }
  };

  // 이전글/다음글 찾기
  const currentIndex = allStories.findIndex((s) => s.id === parseInt(id));
  const prevStory = currentIndex > 0 ? allStories[currentIndex - 1] : null;
  const nextStory = currentIndex < allStories.length - 1 ? allStories[currentIndex + 1] : null;

  if (loading) {
    return (
      <div className="w-full flex flex-col font-sans min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-xl text-gray-600">이야기를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="w-full flex flex-col font-sans min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-xl text-gray-600 mb-4">
            {error || "이야기를 찾을 수 없습니다."}
          </p>
          <button
            onClick={() => navigate("/best/story")}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col font-sans min-h-screen bg-white">
      {/* 헤더 섹션 */}
      <div className="bg-orange-50 py-12 border-b border-orange-100">
        <div className="container mx-auto px-4">
          <button
            onClick={() => navigate("/best/story")}
            className="mb-4 text-orange-600 hover:text-orange-700 flex items-center gap-2"
          >
            <span>←</span>
            <span>목록으로</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">재미있는 화장실 이야기</h1>
        </div>
      </div>

      {/* 게시글 내용 */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* 게시글 헤더 */}
            <div className="border-b-2 border-gray-200 pb-6 mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{story.title}</h2>
              <div className="flex items-center gap-4 text-gray-600">
                <span>작성자: {story.author}</span>
                <span>작성일: {story.createdDate}</span>
                {story.viewCount !== undefined && (
                  <span>조회수: {story.viewCount}</span>
                )}
              </div>
            </div>

            {/* 게시글 본문 */}
            <div className="prose max-w-none">
              <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {story.content || "내용이 없습니다."}
                </div>
              </div>
            </div>

            {/* 하단 버튼 */}
            <div className="mt-12 flex justify-between items-center pt-6 border-t border-gray-200">
              <button
                onClick={() => navigate("/best/story")}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                목록으로
              </button>
              <div className="flex gap-2">
                {prevStory && (
                  <button
                    onClick={() => navigate(`/best/story/${prevStory.id}`)}
                    className="px-6 py-3 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors"
                  >
                    이전글
                  </button>
                )}
                {nextStory && (
                  <button
                    onClick={() => navigate(`/best/story/${nextStory.id}`)}
                    className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    다음글
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StoryDetail;

