import { Stack } from "expo-router";
import { useFonts } from "expo-font";

export default function Layout() {
  useFonts({
    "KBLJump-EB-Condensed": require("../assets/fonts/KBLJump_EB_Condensed.ttf"),
    "KBLJump-EB-Extended": require("../assets/fonts/KBLJump_EB_Extended.ttf"),
    Pretendard400: require("../assets/fonts/Pretendard-Regular.ttf"),
    Pretendard500: require("../assets/fonts/Pretendard-Medium.ttf"),
    Pretendard600: require("../assets/fonts/Pretendard-SemiBold.ttf"),
    Pretendard700: require("../assets/fonts/Pretendard-Bold.ttf"),
  });

  return <Stack screenOptions={{ headerShown: false }} />;
}
