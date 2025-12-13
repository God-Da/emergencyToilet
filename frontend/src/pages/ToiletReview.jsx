import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";

const ToiletReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [toilet, setToilet] = useState(null);
  const [formData, setFormData] = useState({
    content: "",
    rating: 5,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }
    fetchToilet();
  }, [id, user, navigate]);

  const fetchToilet = async () => {
    setLoading(true);
    try {
      // 화장실 정보는 검색 결과에서 가져오거나, 별도 API가 필요할 수 있습니다
      // 일단 간단하게 처리
      const response = await api.get(`/api/toilets/search?address=${id}`);
      if (response.data?.data && response.data.data.length > 0) {
        setToilet(response.data.data[0]);
      } else {
        setError("화장실 정보를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("화장실 조회 실패:", error);
      setError("화장실 정보를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleRatingChange = (rating) => {
    setFormData({
      ...formData,
      rating,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.content.trim()) {
      setError("리뷰 내용을 입력해주세요.");
      return;
    }

    setSaving(true);
    try {
      const response = await api.post(`/api/reviews/toilet/${id}`, formData);
      if (response.data.success) {
        alert("리뷰가 등록되었습니다!");
        navigate("/find");
      } else {
        setError(response.data.message || "리뷰 등록에 실패했습니다.");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setError("로그인이 필요합니다.");
      } else {
        setError(
          error.response?.data?.message || "리뷰 등록 중 오류가 발생했습니다."
        );
      }
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="w-full flex flex-col font-sans min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-xl text-gray-600">화장실 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col font-sans min-h-screen bg-orange-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* 헤더 */}
          <div className="mb-8">
            <button
              onClick={() => navigate("/find")}
              className="mb-4 text-orange-600 hover:text-orange-700 flex items-center gap-2"
            >
              <span>←</span>
              <span>돌아가기</span>
            </button>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">리뷰 작성</h1>
            {toilet && (
              <p className="text-gray-600">🚽 {toilet.name}</p>
            )}
          </div>

          {/* 리뷰 작성 폼 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-orange-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 별점 선택 */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  별점 *
                </label>
                <div className="flex gap-3">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => handleRatingChange(rating)}
                      className={`text-5xl transition-transform hover:scale-110 ${
                        formData.rating >= rating ? "text-yellow-500" : "text-gray-300"
                      }`}
                    >
                      ⭐
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  선택한 별점: {formData.rating}점
                </p>
              </div>

              {/* 리뷰 내용 */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  리뷰 내용 *
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="화장실에 대한 리뷰를 작성해주세요"
                  rows="10"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all resize-none"
                  required
                />
              </div>

              {/* 에러 메시지 */}
              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {/* 버튼 */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => navigate("/find")}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {saving ? "등록 중..." : "등록"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToiletReview;

