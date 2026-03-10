import { Stack } from "expo-router";
import "./global.css";
import { useFonts } from "expo-font";

export default function Layout() {
  const [loaded] = useFonts({
    "KBLJump-EB-Condensed": require("../assets/fonts/KBLJump_EB_Condensed.ttf"),
    "KBLJump-EB-Extended": require("../assets/fonts/KBLJump_EB_Extended.ttf"),
  });

  if (!loaded) return null;

  return <Stack />;
}
