import { Modal } from "react-native";
import { WebView, WebViewNavigation } from "react-native-webview";
import { useRouter } from "expo-router";
import useAuthStore from "@/store/authStore";

const KAKAO_CLIENT_ID = process.env.EXPO_PUBLIC_KAKAO_CLIENT_ID!;
const KAKAO_REDIRECT_URI = process.env.EXPO_PUBLIC_KAKAO_REDIRECT_URI!;

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

const LoginWebView = () => {
  const { showLoginWebView, login, returnPath } = useAuthStore();
  const router = useRouter();

  const handleLoginBack = (navState: WebViewNavigation) => {
    if (navState.url.startsWith(KAKAO_REDIRECT_URI)) {
      const code = new URL(navState.url).searchParams.get("code");
      if (code) {
        login(); // 임시 로그인 처리
        router.replace(returnPath); // 로그인 후 경로
      }
    }
  };

  return (
    <Modal visible={showLoginWebView}>
      <WebView
        source={{ uri: KAKAO_AUTH_URL }}
        onNavigationStateChange={handleLoginBack}
      />
    </Modal>
  );
};

export default LoginWebView;
