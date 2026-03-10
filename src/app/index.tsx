import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <View>
        <Text style={styles.condensed}>condensed</Text>
        <Text style={styles.extended}>extended</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  condensed: {
    fontFamily: "KBLJump-EB-Condensed",
  },

  extended: {
    fontFamily: "KBLJump-EB-Extended",
  },
});
