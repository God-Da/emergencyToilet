import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const NoticeWrite = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.title || !formData.content) {
      setError("제목과 내용을 입력해주세요.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/api/notices", formData);
      if (response.data.success) {
        alert("공지사항이 등록되었습니다!");
        navigate("/notice");
      } else {
        setError(response.data.message || "공지사항 등록에 실패했습니다.");
      }
    } catch (error) {
      if (error.response?.status === 403) {
        setError("관리자만 공지사항을 작성할 수 있습니다.");
      } else {
        setError(
          error.response?.data?.message || "공지사항 등록 중 오류가 발생했습니다."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col font-sans min-h-screen bg-orange-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* 헤더 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">공지사항 작성</h1>
            <p className="text-gray-600">새로운 공지사항을 작성해주세요</p>
          </div>

          {/* 작성 폼 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-orange-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 제목 */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  제목 *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="제목을 입력하세요"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                  required
                />
              </div>

              {/* 내용 */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  내용 *
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="내용을 입력하세요"
                  rows="15"
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
                  onClick={() => navigate("/notice")}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? "등록 중..." : "등록"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeWrite;

