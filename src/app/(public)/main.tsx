import { SafeAreaView } from 'react-native-safe-area-context';
import MainScreen from '@/screens/main/MainScreen';

export default function PublicRoute() {
  return (
    <SafeAreaView>
      <MainScreen />
    </SafeAreaView>
  );
}
