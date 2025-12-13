import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";

const MyBookmarks = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }
    fetchBookmarks();
  }, [user, navigate]);

  const fetchBookmarks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/api/bookmarks/my");
      if (response.data.success) {
        setBookmarks(response.data.data || []);
      }
    } catch (error) {
      console.error("찜 목록 조회 실패:", error);
      if (error.response?.status === 401) {
        setError("로그인이 필요합니다.");
      } else {
        setError("찜 목록을 불러오는데 실패했습니다.");
      }
      setBookmarks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveBookmark = async (toiletId) => {
    if (!window.confirm("찜 목록에서 제거하시겠습니까?")) {
      return;
    }

    try {
      const response = await api.delete(`/api/bookmarks/${toiletId}`);
      if (response.data.success) {
        alert("찜 목록에서 제거되었습니다.");
        fetchBookmarks();
      }
    } catch (error) {
      alert(error.response?.data?.message || "찜 제거에 실패했습니다.");
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="w-full flex flex-col font-sans min-h-screen bg-white">
      {/* 헤더 섹션 */}
      <div className="bg-orange-50 py-12 border-b border-orange-100">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">찜한 화장실</h1>
          <p className="text-gray-600">찜한 화장실 목록을 확인하세요</p>
        </div>
      </div>

      {/* 찜 목록 */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {loading ? (
              <div className="text-center py-12 text-gray-500">
                <p>찜 목록을 불러오는 중...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12 text-red-500">
                <p>{error}</p>
              </div>
            ) : bookmarks.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p>찜한 화장실이 없습니다.</p>
                <button
                  onClick={() => navigate("/find")}
                  className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  화장실 찾기
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {bookmarks.map((bookmark) => (
                  <div
                    key={bookmark.id}
                    className="p-5 rounded-xl border-2 border-gray-200 hover:border-orange-300 hover:bg-orange-50/50 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 text-lg mb-2 flex items-center gap-2">
                          <span>🚽</span>
                          {bookmark.toiletName}
                        </h3>
                        <p className="text-sm text-gray-600 mb-1">
                          {bookmark.roadAddress && (
                            <span className="block">📍 도로명: {bookmark.roadAddress}</span>
                          )}
                          {bookmark.lotAddress && (
                            <span className="block">📍 지번: {bookmark.lotAddress}</span>
                          )}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">찜한 날짜: {bookmark.createdDate}</p>
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                        <button
                          onClick={() => navigate(`/find?search=${encodeURIComponent(bookmark.toiletName)}`)}
                          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 text-sm"
                        >
                          보기
                        </button>
                        <button
                          onClick={() => handleRemoveBookmark(bookmark.toiletId)}
                          className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm"
                        >
                          찜 해제
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyBookmarks;

