import AuthCheck from '@/components/auth/AuthCheck';
import { Stack } from 'expo-router';

const PrivateRoute = () => {
  return (
    <AuthCheck>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthCheck>
  );
};

export default PrivateRoute;
