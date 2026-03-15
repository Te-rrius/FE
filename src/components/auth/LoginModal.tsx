import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { hp, wp } from "@/utils/dimension";
import { login } from "@react-native-kakao/user";
import useAuthStore from "@/store/authStore";

import MainLogoIcon from "@/assets/images/mainLogoIcon.svg";
import LoginModalCloseIcon from "@/assets/images/modal/loginModalCloseIcon.svg";
import KakaoIcon from "@/assets/images/modal/kakaoIcon.svg";

const LoginModal = () => {
  const { closeLoginModal, login: authLogin, returnPath } = useAuthStore();
  const router = useRouter();

  const handleKakaoLogin = async () => {
    try {
      const { accessToken } = await login();
      authLogin();
      closeLoginModal();
      router.replace(returnPath);
    } catch (e) {
      console.error("카카오 로그인 실패", e);
    }
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.topWrapper}>
        <View style={styles.modalHeader}>
          <MainLogoIcon />
          <Pressable style={styles.closeIcon} onPress={closeLoginModal}>
            <LoginModalCloseIcon />
          </Pressable>
        </View>
        <Text style={styles.modalText}>
          <Text style={styles.textHighlight}>내 플레이</Text>
          <Text style={styles.textSub}>를 담는{"\n"}</Text>
          가장 확실한 방법
        </Text>
      </View>
      <View style={styles.bottomWrapper}>
        <Text style={styles.subText}>
          지금 로그인하고, 내 운동 영상을 확인해 보세요!
        </Text>
        <Pressable style={styles.loginButton} onPress={handleKakaoLogin}>
          <KakaoIcon />
          <Text style={styles.buttonText}>카카오톡으로 시작하기</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginModal;

const styles = StyleSheet.create({
  modalContainer: {
    position: "relative",
    width: wp(320),
    height: hp(273),
    padding: wp(20),
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: hp(20),
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
  },

  topWrapper: {
    gap: hp(20),
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  closeIcon: {
    position: "absolute",
    top: -hp(9),
    right: -wp(28),
  },

  modalText: {
    fontFamily: "KBLJump-EB-Condensed",
    fontSize: wp(40),
    textAlign: "center",
    color: "#303030",
  },

  textHighlight: {
    color: "#4048F7",
  },

  textSub: { color: "#767676" },

  bottomWrapper: {
    gap: hp(12),
  },

  subText: {
    color: "#767676",
    fontSize: wp(14),
    textAlign: "center",
    fontFamily: "Pretendard500",
  },

  loginButton: {
    paddingVertical: hp(11),
    paddingHorizontal: wp(60),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: wp(8),
    backgroundColor: "#FEE500",
    borderRadius: 6,
  },

  buttonText: {
    color: "rgba(0, 0, 0, 0.85)",
    fontSize: wp(15),
    fontFamily: "Pretendard600",
  },
});
