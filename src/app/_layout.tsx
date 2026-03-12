import { Stack } from "expo-router";
import { useFonts } from "expo-font";

export default function Layout() {
  useFonts({
    "KBLJump-EB-Condensed": require("../assets/fonts/KBLJump_EB_Condensed.ttf"),
    "KBLJump-EB-Extended": require("../assets/fonts/KBLJump_EB_Extended.ttf"),
  });

  return <Stack screenOptions={{ headerShown: false }} />;
}
