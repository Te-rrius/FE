import { useEffect } from "react";
import { useRouter } from "expo-router";
import useAuthStore from "@/stores/authStore";

export default function AuthCheck({ children }: any) {
  const token = useAuthStore((state) => state.token);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/main");
    }
  }, [token]);

  if (!token) return null;

  return children;
}
