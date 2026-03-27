import SettingScreen from '@/screens/accout/setting/SettingScreen';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Setting() {
  return (
    <View style={styles.mypageContainer}>
      <SafeAreaView>
        <SettingScreen />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  mypageContainer: {
    height: '100%',
    backgroundColor: '#FCFCFC',
  },
});
