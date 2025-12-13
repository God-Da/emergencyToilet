import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";

const MyPageEdit = () => {
  const navigate = useNavigate();
  const { user, checkLoginStatus } = useAuth();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // 유효성 검사
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    if (formData.newPassword.length < 4) {
      setError("새 비밀번호는 최소 4자 이상이어야 합니다.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
      return;
    }

    if (formData.currentPassword === formData.newPassword) {
      setError("현재 비밀번호와 새 비밀번호가 같습니다.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.put("/api/auth/password", {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      if (response.data.success) {
        setSuccess("비밀번호가 성공적으로 변경되었습니다.");
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        // 로그인 상태 재확인
        setTimeout(() => {
          checkLoginStatus();
        }, 1000);
      } else {
        setError(response.data.message || "비밀번호 변경에 실패했습니다.");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setError("로그인이 필요합니다.");
      } else {
        setError(
          error.response?.data?.message || "비밀번호 변경 중 오류가 발생했습니다."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="w-full flex flex-col font-sans min-h-screen bg-orange-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* 헤더 */}
          <div className="mb-8">
            <button
              onClick={() => navigate(-1)}
              className="mb-4 text-orange-600 hover:text-orange-700 flex items-center gap-2"
            >
              <span>←</span>
              <span>돌아가기</span>
            </button>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">내 정보 수정</h1>
            <p className="text-gray-600">계정 정보를 확인하고 비밀번호를 변경할 수 있습니다</p>
          </div>

          {/* 마이페이지 메뉴 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">마이페이지</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link
                to="/mypage/reviews"
                className="p-4 rounded-xl border-2 border-gray-200 hover:border-orange-300 hover:bg-orange-50/50 transition-all text-center"
              >
                <div className="text-2xl mb-2">📝</div>
                <div className="text-sm font-medium text-gray-700">내가 쓴 리뷰</div>
              </Link>
              <Link
                to="/mypage/bookmarks"
                className="p-4 rounded-xl border-2 border-gray-200 hover:border-orange-300 hover:bg-orange-50/50 transition-all text-center"
              >
                <div className="text-2xl mb-2">❤️</div>
                <div className="text-sm font-medium text-gray-700">찜한 화장실</div>
              </Link>
            </div>
          </div>

          {/* 계정 정보 표시 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-orange-100 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">계정 정보</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-600">사용자명</span>
                <span className="text-gray-800 font-medium">{user.username}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-600">이름</span>
                <span className="text-gray-800 font-medium">{user.name || "-"}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-600">이메일</span>
                <span className="text-gray-800 font-medium">{user.email || "-"}</span>
              </div>
            </div>
          </div>

          {/* 비밀번호 변경 폼 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-orange-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6">비밀번호 변경</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 현재 비밀번호 */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  현재 비밀번호 *
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  placeholder="현재 비밀번호를 입력하세요"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                  required
                />
              </div>

              {/* 새 비밀번호 */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  새 비밀번호 *
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="새 비밀번호를 입력하세요 (최소 4자)"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                  required
                  minLength={4}
                />
              </div>

              {/* 비밀번호 확인 */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  새 비밀번호 확인 *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="새 비밀번호를 다시 입력하세요"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                  required
                  minLength={4}
                />
              </div>

              {/* 성공 메시지 */}
              {success && (
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                  <p className="text-green-600 text-sm">{success}</p>
                </div>
              )}

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
                  onClick={() => navigate(-1)}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? "변경 중..." : "비밀번호 변경"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPageEdit;

