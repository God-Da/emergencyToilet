import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";

const QnaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [qna, setQna] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 수정/삭제를 위한 비밀번호 입력 모달
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [action, setAction] = useState(null); // 'edit' or 'delete'
  const [passwordError, setPasswordError] = useState("");
  
  // 답변 작성/수정
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [answer, setAnswer] = useState("");
  const [isEditingAnswer, setIsEditingAnswer] = useState(false);

  useEffect(() => {
    fetchQna();
  }, [id]);

  const fetchQna = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/api/qna/${id}`);
      if (response.data.success) {
        setQna(response.data.data);
        setAnswer(response.data.data.answer || "");
      }
    } catch (error) {
      console.error("Q&A 조회 실패:", error);
      setError("Q&A를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async () => {
    setPasswordError("");
    
    if (!password) {
      setPasswordError("비밀번호를 입력해주세요.");
      return;
    }

    try {
      const response = await api.post(`/api/qna/${id}/verify-password`, { password });
      
      if (response.data.success && response.data.valid) {
        if (action === "edit") {
          navigate(`/notice/qna/${id}/edit`, { state: { password } });
        } else if (action === "delete") {
          handleDelete();
        }
        setShowPasswordModal(false);
        setPassword("");
      } else {
        setPasswordError("비밀번호가 일치하지 않습니다.");
      }
    } catch (error) {
      setPasswordError("비밀번호 확인 중 오류가 발생했습니다.");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await api.delete(`/api/qna/${id}`, {
        data: { password },
      });
      
      if (response.data.success) {
        alert("Q&A가 삭제되었습니다.");
        navigate("/notice/qna");
      } else {
        alert(response.data.message || "삭제에 실패했습니다.");
      }
    } catch (error) {
      alert(error.response?.data?.message || "삭제 중 오류가 발생했습니다.");
    }
  };

  const handleAdminDelete = async () => {
    if (!window.confirm("Q&A를 삭제하시겠습니까?")) {
      return;
    }

    try {
      const response = await api.delete(`/api/qna/${id}/admin`);
      
      if (response.data.success) {
        alert("Q&A가 삭제되었습니다.");
        navigate("/notice/qna");
      } else {
        alert(response.data.message || "삭제에 실패했습니다.");
      }
    } catch (error) {
      if (error.response?.status === 403) {
        alert("관리자만 Q&A를 삭제할 수 있습니다.");
      } else {
        alert(error.response?.data?.message || "삭제 중 오류가 발생했습니다.");
      }
    }
  };

  const handleAnswerSubmit = async () => {
    if (!answer.trim()) {
      alert("답변 내용을 입력해주세요.");
      return;
    }

    try {
      let response;
      if (isEditingAnswer) {
        response = await api.put(`/api/qna/${id}/answer`, { answer });
      } else {
        response = await api.post(`/api/qna/${id}/answer`, { answer });
      }

      if (response.data.success) {
        alert(isEditingAnswer ? "답변이 수정되었습니다." : "답변이 등록되었습니다.");
        setShowAnswerModal(false);
        setAnswer("");
        setIsEditingAnswer(false);
        fetchQna();
      } else {
        alert(response.data.message || "답변 등록에 실패했습니다.");
      }
    } catch (error) {
      if (error.response?.status === 403) {
        alert("관리자만 답변을 작성할 수 있습니다.");
      } else {
        alert(error.response?.data?.message || "답변 등록 중 오류가 발생했습니다.");
      }
    }
  };

  const handleDeleteAnswer = async () => {
    if (!window.confirm("답변을 삭제하시겠습니까?")) {
      return;
    }

    try {
      const response = await api.delete(`/api/qna/${id}/answer`);
      
      if (response.data.success) {
        alert("답변이 삭제되었습니다.");
        fetchQna();
      } else {
        alert(response.data.message || "답변 삭제에 실패했습니다.");
      }
    } catch (error) {
      if (error.response?.status === 403) {
        alert("관리자만 답변을 삭제할 수 있습니다.");
      } else {
        alert(error.response?.data?.message || "답변 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  const isAdmin = user && user.username === "admin";

  if (loading) {
    return (
      <div className="w-full flex flex-col font-sans min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-xl text-gray-600">Q&A를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error || !qna) {
    return (
      <div className="w-full flex flex-col font-sans min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-xl text-gray-600 mb-4">
            {error || "Q&A를 찾을 수 없습니다."}
          </p>
          <button
            onClick={() => navigate("/notice/qna")}
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
            onClick={() => navigate("/notice/qna")}
            className="mb-4 text-orange-600 hover:text-orange-700 flex items-center gap-2"
          >
            <span>←</span>
            <span>목록으로</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">자유게시판 Q&A</h1>
        </div>
      </div>

      {/* Q&A 내용 */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Q&A 헤더 */}
            <div className="border-b-2 border-gray-200 pb-6 mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{qna.title}</h2>
              <div className="flex items-center gap-4 text-gray-600">
                <span>작성자: {qna.author}</span>
                <span>작성일: {qna.createdDate}</span>
                <span>조회수: {qna.viewCount}</span>
                {qna.isAnswered && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                    답변완료
                  </span>
                )}
              </div>
            </div>

            {/* Q&A 본문 */}
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 mb-8">
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {qna.content}
              </div>
            </div>

            {/* 답변 섹션 */}
            {qna.isAnswered && qna.answer && (
              <div className="bg-green-50 rounded-xl p-8 border-2 border-green-200 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-green-700">✓ 답변</span>
                    <span className="text-sm text-gray-600">
                      {qna.answerAuthor} | {qna.answerDate}
                    </span>
                  </div>
                  {isAdmin && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setIsEditingAnswer(true);
                          setShowAnswerModal(true);
                        }}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
                      >
                        수정
                      </button>
                      <button
                        onClick={handleDeleteAnswer}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
                      >
                        삭제
                      </button>
                    </div>
                  )}
                </div>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {qna.answer}
                </div>
              </div>
            )}

            {/* 관리자 답변 작성 버튼 */}
            {isAdmin && !qna.isAnswered && (
              <div className="mb-8">
                <button
                  onClick={() => {
                    setIsEditingAnswer(false);
                    setShowAnswerModal(true);
                  }}
                  className="w-full py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-colors"
                >
                  답변 작성
                </button>
              </div>
            )}

            {/* 하단 버튼 */}
            <div className="mt-12 flex justify-between items-center pt-6 border-t border-gray-200">
              <button
                onClick={() => navigate("/notice/qna")}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                목록으로
              </button>
              <div className="flex gap-2">
                {isAdmin ? (
                  // Admin은 비밀번호 없이 삭제 가능
                  <button
                    onClick={handleAdminDelete}
                    className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    삭제 (관리자)
                  </button>
                ) : (
                  // 일반 사용자는 비밀번호 필요
                  <>
                    <button
                      onClick={() => {
                        setAction("edit");
                        setShowPasswordModal(true);
                      }}
                      className="px-6 py-3 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => {
                        setAction("delete");
                        setShowPasswordModal(true);
                      }}
                      className="px-6 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      삭제
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 비밀번호 입력 모달 */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {action === "edit" ? "수정" : "삭제"}을 위해 비밀번호를 입력해주세요
            </h3>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 mb-4"
              autoFocus
            />
            {passwordError && (
              <p className="text-red-600 text-sm mb-4">{passwordError}</p>
            )}
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  setPassword("");
                  setPasswordError("");
                }}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                취소
              </button>
              <button
                onClick={handlePasswordSubmit}
                className="flex-1 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 답변 작성/수정 모달 */}
      {showAnswerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {isEditingAnswer ? "답변 수정" : "답변 작성"}
            </h3>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="답변 내용을 입력하세요"
              rows="10"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 mb-4 resize-none"
              autoFocus
            />
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowAnswerModal(false);
                  setAnswer("");
                  setIsEditingAnswer(false);
                }}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                취소
              </button>
              <button
                onClick={handleAnswerSubmit}
                className="flex-1 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                {isEditingAnswer ? "수정" : "등록"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QnaDetail;

