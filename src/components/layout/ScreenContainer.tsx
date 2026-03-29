import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ScreenContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>{children}</SafeAreaView>
    </View>
  );
};

export default ScreenContainer;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
