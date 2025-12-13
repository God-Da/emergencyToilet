import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";

const NoticeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allNotices, setAllNotices] = useState([]);
  
  const isAdmin = user && user.username === "admin";

  useEffect(() => {
    fetchNotice();
    fetchAllNotices();
  }, [id]);

  const fetchNotice = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/api/notices/${id}`);
      setNotice(response.data);
    } catch (error) {
      console.error("공지사항 조회 실패:", error);
      setError("공지사항을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllNotices = async () => {
    try {
      const response = await api.get("/api/notices");
      setAllNotices(response.data || []);
    } catch (error) {
      console.error("공지사항 목록 조회 실패:", error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("공지사항을 삭제하시겠습니까?")) {
      return;
    }

    try {
      const response = await api.delete(`/api/notices/${id}`);
      
      if (response.data.success) {
        alert("공지사항이 삭제되었습니다.");
        navigate("/notice");
      } else {
        alert(response.data.message || "삭제에 실패했습니다.");
      }
    } catch (error) {
      if (error.response?.status === 403) {
        alert("관리자만 공지사항을 삭제할 수 있습니다.");
      } else {
        alert(error.response?.data?.message || "삭제 중 오류가 발생했습니다.");
      }
    }
  };

  // 이전글/다음글 찾기
  const currentIndex = allNotices.findIndex((n) => n.id === parseInt(id));
  const prevNotice = currentIndex > 0 ? allNotices[currentIndex - 1] : null;
  const nextNotice = currentIndex < allNotices.length - 1 ? allNotices[currentIndex + 1] : null;

  if (loading) {
    return (
      <div className="w-full flex flex-col font-sans min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-xl text-gray-600">공지사항을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error || !notice) {
    return (
      <div className="w-full flex flex-col font-sans min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-xl text-gray-600 mb-4">
            {error || "공지사항을 찾을 수 없습니다."}
          </p>
          <button
            onClick={() => navigate("/notice")}
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
            onClick={() => navigate("/notice")}
            className="mb-4 text-orange-600 hover:text-orange-700 flex items-center gap-2"
          >
            <span>←</span>
            <span>목록으로</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">공지사항</h1>
        </div>
      </div>

      {/* 게시글 내용 */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* 게시글 헤더 */}
            <div className="border-b-2 border-gray-200 pb-6 mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{notice.title}</h2>
              <div className="flex items-center gap-4 text-gray-600">
                <span>작성일: {notice.createdDate}</span>
                {notice.viewCount !== undefined && (
                  <span>조회수: {notice.viewCount}</span>
                )}
              </div>
            </div>

            {/* 게시글 본문 */}
            <div className="prose max-w-none">
              <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {notice.content || "내용이 없습니다."}
                </div>
              </div>
            </div>

            {/* 하단 버튼 */}
            <div className="mt-12 flex justify-between items-center pt-6 border-t border-gray-200">
              <button
                onClick={() => navigate("/notice")}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                목록으로
              </button>
              <div className="flex gap-2">
                {isAdmin && (
                  <button
                    onClick={handleDelete}
                    className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    삭제
                  </button>
                )}
                {prevNotice && (
                  <button
                    onClick={() => navigate(`/notice/${prevNotice.id}`)}
                    className="px-6 py-3 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors"
                  >
                    이전글
                  </button>
                )}
                {nextNotice && (
                  <button
                    onClick={() => navigate(`/notice/${nextNotice.id}`)}
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

export default NoticeDetail;
