import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { Modal, StyleSheet, View } from 'react-native';
import useAuthStore from '@/stores/authStore';
import LoginModal from '@/components/auth/LoginModal';
import { useEffect } from 'react';
import { initializeKakaoSDK } from '@react-native-kakao/core';
import AgreeModal from '@/components/auth/AgreeModal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const KAKAOKEY = process.env.EXPO_PUBLIC_KAKAO_NATIVE_APP_KEY;

const queryClient = new QueryClient();

const RootLayout = () => {
  useEffect(() => {
    initializeKakaoSDK(KAKAOKEY);
  }, []);

  const { showLoginModal, showAgreeModal } = useAuthStore();

  const [fontsLoaded] = useFonts({
    'KBLJump-B': require('@/assets/fonts/KBLJump_B.ttf'),
    'KBLJump-EB-Condensed': require('@/assets/fonts/KBLJump_EB_Condensed.ttf'),
    'KBLJump-EB-Extended': require('@/assets/fonts/KBLJump_EB_Extended.ttf'),
    Pretendard400: require('@/assets/fonts/Pretendard-Regular.ttf'),
    Pretendard500: require('@/assets/fonts/Pretendard-Medium.ttf'),
    Pretendard600: require('@/assets/fonts/Pretendard-SemiBold.ttf'),
    Pretendard700: require('@/assets/fonts/Pretendard-Bold.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#FCFCFC' },
        }}
      />

      <Modal visible={showLoginModal} transparent>
        <View style={[styles.overlay, styles.center]}>
          <LoginModal />
        </View>
      </Modal>

      <Modal visible={showAgreeModal} transparent>
        <View style={[styles.overlay, styles.bottom]}>
          <AgreeModal />
        </View>
      </Modal>
    </QueryClientProvider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },

  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  bottom: {
    justifyContent: 'flex-end',
  },
});
