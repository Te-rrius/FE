import AuthCheck from "@/components/auth/AuthCheck";
import { Stack } from "expo-router";

export default function PrivateCheck() {
  return (
    <AuthCheck>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthCheck>
  );
}
