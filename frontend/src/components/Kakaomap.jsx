import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const KakaoMap = () => {
  // 1. 초기 위치 상태 (기본값: 서울역)
  // isLoading: 위치를 불러오는 중인지 체크
  const [state, setState] = useState({
    center: { lat: 37.554678, lng: 126.970606 },
    errMsg: null,
    isLoading: true,
  });

  // 2. 내 위치 가져오기 (useEffect)
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
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        },
      );
    } else {
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할 수 없어요..",
        isLoading: false,
      }));
    }
  }, []);

  return (
    <Map
      center={state.center}
      style={{ width: "100%", height: "100%" }} // 부모 박스 크기에 꽉 차게
      level={3} // 확대 레벨 (클수록 멀리 보임)
    >
      {/* 내 위치 마커 표시 */}
      {!state.isLoading && (
        <MapMarker position={state.center}>
          <div style={{ padding: "3px", color: "#000", fontSize: "12px", textAlign: "center" }}>
            🚩 내 위치 <br />
            <span style={{ color: "gray", fontSize: "10px" }}>급하다 급해!</span>
          </div>
        </MapMarker>
      )}
    </Map>
  );
};

export default KakaoMap;
