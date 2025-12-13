import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // 백엔드 기본 주소
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 세션 쿠키를 위해 필요
});

export default api;
