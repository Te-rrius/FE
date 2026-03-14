import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { Modal, StyleSheet, View } from "react-native";
import useAuthStore from "@/store/authStore";
import LoginModal from "@/components/auth/LoginModal";

const Layout = () => {
  const { showLoginModal } = useAuthStore();

  const [fontsLoaded] = useFonts({
    "KBLJump-EB-Condensed": require("../assets/fonts/KBLJump_EB_Condensed.ttf"),
    "KBLJump-EB-Extended": require("../assets/fonts/KBLJump_EB_Extended.ttf"),
    Pretendard400: require("../assets/fonts/Pretendard-Regular.ttf"),
    Pretendard500: require("../assets/fonts/Pretendard-Medium.ttf"),
    Pretendard600: require("../assets/fonts/Pretendard-SemiBold.ttf"),
    Pretendard700: require("../assets/fonts/Pretendard-Bold.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />

      <Modal visible={showLoginModal} transparent animationType="fade">
        <View style={styles.overlay}>
          <LoginModal />
        </View>
      </Modal>
    </>
  );
};

export default Layout;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
});
