import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";

const MyReviews = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }
    fetchReviews();
  }, [user, navigate]);

  const fetchReviews = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/api/reviews/my");
      console.log("리뷰 응답:", response.data);
      if (response.data.success) {
        const reviewsData = response.data.data || [];
        console.log("리뷰 데이터:", reviewsData);
        setReviews(reviewsData);
      } else {
        setError("리뷰를 불러오는데 실패했습니다.");
        setReviews([]);
      }
    } catch (error) {
      console.error("리뷰 조회 실패:", error);
      console.error("에러 상세:", error.response?.data);
      if (error.response?.status === 401) {
        setError("로그인이 필요합니다.");
      } else {
        setError("리뷰를 불러오는데 실패했습니다.");
      }
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("리뷰를 삭제하시겠습니까?")) {
      return;
    }

    try {
      const response = await api.delete(`/api/reviews/${reviewId}`);
      if (response.data.success) {
        alert("리뷰가 삭제되었습니다.");
        fetchReviews();
      }
    } catch (error) {
      alert(error.response?.data?.message || "리뷰 삭제에 실패했습니다.");
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">내가 쓴 리뷰</h1>
          <p className="text-gray-600">작성하신 리뷰를 확인하고 관리하세요</p>
        </div>
      </div>

      {/* 리뷰 목록 */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {loading ? (
              <div className="text-center py-12 text-gray-500">
                <p>리뷰를 불러오는 중...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12 text-red-500">
                <p>{error}</p>
              </div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p>작성한 리뷰가 없습니다.</p>
                <button
                  onClick={() => navigate("/find")}
                  className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  화장실 찾기
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-6 rounded-xl border-2 border-gray-200 hover:border-orange-300 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-yellow-500">
                            {"⭐".repeat(review.rating)}
                          </span>
                          <span className="text-sm text-gray-500">{review.createdDate}</span>
                        </div>
                        <p className="text-gray-700 whitespace-pre-line">{review.content}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteReview(review.id)}
                        className="ml-4 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm"
                      >
                        삭제
                      </button>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="text-sm text-gray-600 mb-2">
                        <p className="font-medium">🚽 {review.toiletName || "화장실 정보 없음"}</p>
                        {review.toiletRoadAddress && (
                          <p className="text-xs">📍 {review.toiletRoadAddress}</p>
                        )}
                      </div>
                      <button
                        onClick={() => navigate(`/find`)}
                        className="text-sm text-orange-600 hover:text-orange-700"
                      >
                        화장실 찾기 →
                      </button>
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

export default MyReviews;

