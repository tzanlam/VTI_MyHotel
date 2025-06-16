import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8082/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setupInterceptors = (store) => {
api.interceptors.request.use(
  (config) => {
    const state = store.getState(); // Lấy toàn bộ Redux state
    const token = state.auth?.token; // Lấy token từ Redux store
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
)}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response) {
      switch (response.status) {
        case 401:
          console.warn("Unauthorized - Vui lòng đăng nhập lại");
          break;
        case 403:
          console.warn("Forbidden - Không đủ quyền truy cập");
          break;
        default:
          console.error(`Lỗi: ${response.status} - ${response.data?.message}`);
      }
    } else {
      console.error("Lỗi mạng hoặc server không phản hồi");
    }
    return Promise.reject(error);
  }
);

export default api;
