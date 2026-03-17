import { Pressable, StyleSheet, Text, View } from "react-native"

import MainLogoIcon from "@/assets/images/mainLogoIcon.svg";
import TennisIcon from "@/assets/images/header/tennisIcon.svg";
import { hp, wp } from "@/utils/dimension";
import useAuthStore from "@/store/authStore";

const Header = () => {
  const { openLoginModal } = useAuthStore();

    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <MainLogoIcon />
                <View style={styles.tennis}>
                    <TennisIcon />
                    <Text style={styles.tennisText}>테니스</Text>
                </View>
            </View>
            <Pressable style={styles.authButton} onPress ={() => openLoginModal()}>
                <Text style={styles.authText}>로그인 / 회원가입</Text>
            </Pressable>
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: wp(20),
        backgroundColor: "#FCFCFC"
    },

    logo: {
        flexDirection: "row",
        alignItems: "center",
        gap: wp(12)
    },

    tennis: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#2BAE66",
        borderRadius: 4,
        paddingHorizontal: wp(6),
        paddingVertical: hp(4),
        gap: wp(6),
    },

    tennisText: {
        color: "#FCF6F5",
        fontFamily: "Pretendard700"
    },

    authButton: {
        backgroundColor: "#F5F5F5",
        borderColor: "#E8E8E8",
        borderWidth: 1,
        paddingHorizontal: wp(14),
        paddingVertical: hp(6)
    },

    authText: {
        color: "#303030",
        fontSize: 14,
        fontFamily: "Pretendard600"
    }
})