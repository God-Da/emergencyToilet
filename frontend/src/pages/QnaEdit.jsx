import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import api from "../api";

const QnaEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [qna, setQna] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const password = location.state?.password;
    if (!password) {
      alert("비밀번호가 필요합니다.");
      navigate(`/notice/qna/${id}`);
      return;
    }

    fetchQna(password);
  }, [id, location, navigate]);

  const fetchQna = async (password) => {
    setLoading(true);
    try {
      const response = await api.get(`/api/qna/${id}`);
      if (response.data.success) {
        const qnaData = response.data.data;
        setQna(qnaData);
        setFormData({
          title: qnaData.title,
          content: qnaData.content,
          author: qnaData.author,
          password: password,
        });
      }
    } catch (error) {
      console.error("Q&A 조회 실패:", error);
      setError("Q&A를 불러오는데 실패했습니다.");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.title || !formData.content || !formData.author) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    setSaving(true);
    try {
      const response = await api.put(`/api/qna/${id}`, formData);
      if (response.data.success) {
        alert("Q&A가 수정되었습니다!");
        navigate(`/notice/qna/${id}`);
      } else {
        setError(response.data.message || "Q&A 수정에 실패했습니다.");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Q&A 수정 중 오류가 발생했습니다."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full flex flex-col font-sans min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-xl text-gray-600">Q&A를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error && !qna) {
    return (
      <div className="w-full flex flex-col font-sans min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-xl text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate(`/notice/qna/${id}`)}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col font-sans min-h-screen bg-orange-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* 헤더 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Q&A 수정</h1>
            <p className="text-gray-600">Q&A 내용을 수정해주세요</p>
          </div>

          {/* 수정 폼 */}
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

              {/* 작성자 */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  작성자 *
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="작성자를 입력하세요"
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
                  onClick={() => navigate(`/notice/qna/${id}`)}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {saving ? "수정 중..." : "수정"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QnaEdit;

