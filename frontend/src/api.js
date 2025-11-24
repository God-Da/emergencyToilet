import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // 백엔드 기본 주소
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
