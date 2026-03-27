import { useEffect } from 'react';
import { usePathname } from 'expo-router';
import useAuthStore from '@/store/authStore';

const AuthCheck = ({ children }: any) => {
  const { token, openLoginModal, isLoggingOut } = useAuthStore();

  const pathname = usePathname(); // 현재 경로 자동으로 가져옴

  useEffect(() => {
    if (!token && !isLoggingOut) {
      openLoginModal(pathname); // 경로 자동 전달
    }
  }, [token, pathname]);

  if (!token) return null;

  return children;
};

export default AuthCheck;
