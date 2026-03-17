import { SafeAreaView } from 'react-native-safe-area-context';
import useAuthStore from '@/store/authStore';
import Header from '@/components/layout/Header';

export default function PublicRoute() {
  const { openLoginModal } = useAuthStore();

  return (
    <SafeAreaView>
      <Header />
    </SafeAreaView>
  );
}
