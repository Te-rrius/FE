import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <View className="flex justify-center items-center">
        <Text className="text-5xl font-jumpCondensed">condensed</Text>
        <Text className="text-5xl font-jumpExtended">extended</Text>
      </View>
    </SafeAreaView>
  );
}
