import axios from 'axios';
import { useUserStoreHook } from '../store/modules/user';
import { ElMessage, ElMessageBox } from 'element-plus';

// 创建 axios 实例
const service = axios.create({
  baseURL: "http://localhost:8099",
  timeout: 50000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' }
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const userStore = useUserStoreHook();
    if (userStore.token) {
      config.headers.Authorization = userStore.token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { code, msg } = response.data;
    if (code == 200 || code == 201 || code == 202 || code == 203) {
      return response.data;
    } else if (code == 405) {
      ElMessage.error(msg || 'Token无效');
      localStorage.clear();
      window.location.href = '/login';
      return Promise.reject(new Error(msg || 'Token无效'));
    }
    ElMessage.error(msg || '系统出错');
    return Promise.reject(new Error(msg || 'Error'));
  },
  (error) => {
    if (error.response.data) {
      const { code, msg } = error.response.data;
      ElMessage.error(msg || '系统出错');
    }
    return Promise.reject(error.message);
  }
);

export default service;