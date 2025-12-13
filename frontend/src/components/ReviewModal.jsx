import React, { useState, useEffect } from "react";
import api from "../api";
import { useAuth } from "../context/AuthContext";

const ReviewModal = ({ toilet, onClose }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    content: "",
    rating: 5,
  });

  useEffect(() => {
    fetchReviews();
  }, [toilet.id]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/api/reviews/toilet/${toilet.id}`);
      if (response.data.success) {
        setReviews(response.data.data || []);
      }
    } catch (error) {
      console.error("리뷰 조회 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleWriteReview = async () => {
    if (!reviewForm.content.trim()) {
      alert("리뷰 내용을 입력해주세요.");
      return;
    }

    try {
      const response = await api.post(`/api/reviews/toilet/${toilet.id}`, reviewForm);
      if (response.data.success) {
        alert("리뷰가 등록되었습니다!");
        setShowWriteModal(false);
        setReviewForm({ content: "", rating: 5 });
        fetchReviews();
        // 부모 컴포넌트에 리뷰 업데이트 알림 (필요시)
        if (window.location.pathname.includes("/find")) {
          window.location.reload(); // 간단하게 새로고침
        }
      }
    } catch (error) {
      if (error.response?.status === 401) {
        alert("로그인이 필요합니다.");
      } else {
        alert(error.response?.data?.message || "리뷰 등록에 실패했습니다.");
      }
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* 헤더 */}
        <div className="bg-orange-50 px-6 py-4 border-b border-orange-100 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{toilet.name} 리뷰</h2>
            <p className="text-sm text-gray-600">
              평균 별점: {toilet.averageRating?.toFixed(1) || "0.0"} ({toilet.reviewCount || 0}개)
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* 리뷰 목록 */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {loading ? (
            <div className="text-center py-12 text-gray-500">로딩 중...</div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>아직 리뷰가 없습니다.</p>
              {user && (
                <button
                  onClick={() => setShowWriteModal(true)}
                  className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  첫 리뷰 작성하기
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-4 last:border-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-gray-800">{review.username}</span>
                        <span className="text-yellow-500">
                          {"⭐".repeat(review.rating)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">{review.createdDate}</p>
                    </div>
                    {user && user.id === review.userId && (
                      <button
                        onClick={() => handleDeleteReview(review.id)}
                        className="text-xs text-red-500 hover:text-red-700"
                      >
                        삭제
                      </button>
                    )}
                  </div>
                  <p className="text-gray-700 whitespace-pre-line">{review.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 하단 버튼 */}
        {user && (
          <div className="px-6 py-4 border-t border-gray-200">
            <button
              onClick={() => setShowWriteModal(true)}
              className="w-full py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-colors"
            >
              리뷰 작성
            </button>
          </div>
        )}
      </div>

      {/* 리뷰 작성 모달 */}
      {showWriteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">리뷰 작성</h3>
            
            {/* 별점 선택 */}
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700 mb-2">별점</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setReviewForm({ ...reviewForm, rating })}
                    className={`text-3xl ${
                      reviewForm.rating >= rating ? "text-yellow-500" : "text-gray-300"
                    } hover:scale-110 transition-transform`}
                  >
                    ⭐
                  </button>
                ))}
              </div>
            </div>

            {/* 리뷰 내용 */}
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700 mb-2">리뷰 내용</label>
              <textarea
                value={reviewForm.content}
                onChange={(e) => setReviewForm({ ...reviewForm, content: e.target.value })}
                placeholder="리뷰를 작성해주세요"
                rows="5"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 resize-none"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowWriteModal(false);
                  setReviewForm({ content: "", rating: 5 });
                }}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200"
              >
                취소
              </button>
              <button
                onClick={handleWriteReview}
                className="flex-1 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600"
              >
                등록
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewModal;

