import React, { useState, useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useSearchParams } from "react-router-dom";
import api from "../api";

const Find = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const [searchAddress, setSearchAddress] = useState(initialSearch);
  const [state, setState] = useState({
    center: { lat: 37.554678, lng: 126.970606 }, // 기본값: 서울역
    isLoading: true,
  });

  const [toilets, setToilets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedToilet, setSelectedToilet] = useState(null);
  const [error, setError] = useState(null);

  // toilets가 항상 배열임을 보장하는 헬퍼
  const safeToilets = Array.isArray(toilets) ? toilets : [];

  // 주소 기반 화장실 검색
  const searchToilets = async (address) => {
    if (!address || address.trim() === "") {
      setToilets([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/api/toilets/search", {
        params: {
          address: address.trim(),
        },
      });
      
      // 응답 데이터가 배열인지 확인
      let results = response?.data;
      if (!results) {
        console.warn("응답 데이터가 없습니다");
        results = [];
      } else if (!Array.isArray(results)) {
        console.warn("응답 데이터가 배열이 아닙니다:", results);
        results = [];
      }
      
      console.log("검색 결과:", results);
      // 항상 배열로 설정
      const safeResults = Array.isArray(results) ? results : [];
      setToilets(safeResults);

      // 검색 결과가 있으면 첫 번째 결과의 위치로 지도 중심 이동
      if (results.length > 0 && results[0].latitude && results[0].longitude) {
        setState((prev) => ({
          ...prev,
          center: { lat: results[0].latitude, lng: results[0].longitude },
        }));
      }
    } catch (error) {
      console.error("화장실 검색 실패:", error);
      setError(error.response?.data?.message || error.message || "검색 중 오류가 발생했습니다.");
      setToilets([]);
    } finally {
      setLoading(false);
    }
  };

  // URL 파라미터에서 검색어 가져오기
  useEffect(() => {
    const searchParam = searchParams.get("search");
    if (searchParam) {
      setSearchAddress(searchParam);
      // URL 파라미터가 있으면 자동으로 검색 실행
      searchToilets(searchParam);
    }
  }, [searchParams]);

  // 현재 위치 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            isLoading: false,
          }));
        },
        (err) => {
          console.log("위치 가져오기 실패:", err);
          setState((prev) => ({
            ...prev,
            isLoading: false,
          }));
        }
      );
    } else {
      setState((prev) => ({
        ...prev,
        isLoading: false,
      }));
    }
  }, []);

  // 검색 버튼 클릭
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchAddress.trim()) {
      // URL 파라미터 업데이트
      setSearchParams({ search: searchAddress.trim() });
      searchToilets(searchAddress);
    }
  };

  // 화장실 목록 아이템 클릭 시 지도 중심 이동
  const handleToiletClick = (toilet) => {
    setSelectedToilet(toilet.id);
    setState((prev) => ({
      ...prev,
      center: { lat: toilet.latitude, lng: toilet.longitude },
    }));
  };

  return (
    <div className="w-full flex flex-col font-sans min-h-screen">
      {/* 헤더 및 검색창 */}
      <div className="bg-orange-50 py-6 border-b border-orange-100">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">화장실 찾기</h1>
          <p className="text-sm text-gray-600 mb-2">도로명 주소 또는 지번 주소로 검색하세요</p>
          
          {/* 검색창 */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchAddress}
              onChange={(e) => setSearchAddress(e.target.value)}
              placeholder="예: 강남구, 송파구, 한강대로 등"
              className="w-full h-12 pl-6 pr-20 rounded-xl border-2 border-amber-900/10 focus:border-amber-600 focus:ring-2 focus:ring-amber-200 text-lg shadow-sm transition-all"
            />
            <button
              type="submit"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-700 p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* 지도 영역 */}
      <div className="w-full h-[500px] bg-gray-100 relative">
        {!state.isLoading && (
          <Map center={state.center} style={{ width: "100%", height: "100%" }} level={3}>
            {/* 화장실 마커들 */}
            {safeToilets.map((toilet) => (
            <MapMarker
              key={toilet.id}
              position={{ lat: toilet.latitude, lng: toilet.longitude }}
              onClick={() => {
                setSelectedToilet(toilet.id);
                setState((prev) => ({
                  ...prev,
                  center: { lat: toilet.latitude, lng: toilet.longitude },
                }));
              }}
            >
              <div
                style={{
                  padding: "5px",
                  color: "#000",
                  fontSize: "12px",
                  textAlign: "center",
                  backgroundColor: selectedToilet === toilet.id ? "#FFE4B5" : "white",
                  borderRadius: "4px",
                  minWidth: "80px",
                }}
              >
                🚽 {toilet.name}
              </div>
            </MapMarker>
            ))}
          </Map>
        )}
        {state.isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <p className="text-gray-500">위치를 불러오는 중...</p>
          </div>
        )}
      </div>

      {/* 검색 결과 목록 */}
      <div className="flex-1 bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              검색 결과 <span className="text-orange-600">({safeToilets.length}개)</span>
            </h2>
            {loading && <p className="text-sm text-gray-500">검색 중...</p>}
          </div>

          {error && (
            <div className="text-center py-12 text-red-500">
              <p className="font-bold">오류가 발생했습니다</p>
              <p className="text-sm mt-2">{error}</p>
            </div>
          )}

          {safeToilets.length === 0 && !loading && !error && searchAddress && (
            <div className="text-center py-12 text-gray-500">
              <p>검색 결과가 없습니다.</p>
              <p className="text-sm mt-2">다른 주소로 검색해보세요.</p>
            </div>
          )}

          {!searchAddress && (
            <div className="text-center py-12 text-gray-500">
              <p>위 검색창에 주소를 입력하여 화장실을 찾아보세요.</p>
              <p className="text-sm mt-2">도로명 주소 또는 지번 주소 모두 검색 가능합니다.</p>
            </div>
          )}

          <div className="space-y-3">
            {safeToilets.map((toilet) => (
              <div
                key={toilet.id}
                onClick={() => handleToiletClick(toilet)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedToilet === toilet.id
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200 hover:border-orange-300 hover:bg-orange-50/50"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-lg mb-1 flex items-center gap-2">
                      <span>🚽</span>
                      {toilet.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">
                      {toilet.roadAddress && (
                        <span className="block">📍 도로명: {toilet.roadAddress}</span>
                      )}
                      {toilet.lotAddress && (
                        <span className="block">📍 지번: {toilet.lotAddress}</span>
                      )}
                    </p>
                    {toilet.openTime && (
                      <p className="text-xs text-gray-500 mt-1">개방시간: {toilet.openTime}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Find;

