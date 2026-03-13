import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Pressable } from "react-native";
import useAuthStore from "@/stores/authStore";

export default function PublicRoute() {
  const { openLoginModal } = useAuthStore();

  return (
    <SafeAreaView>
      <View>
        <Pressable onPress={() => openLoginModal("/main")}>
          <Text>로그인</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
