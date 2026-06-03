import axios from 'axios';
import { router } from 'expo-router';
import useAuthStore from '@/stores/authStore';

// 공통 인스턴스
export const instance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_SERVER_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 토큰 자동 첨부
instance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 토큰 만료 처리
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      router.replace('/');
    }

    return Promise.reject(error);
  },
);
