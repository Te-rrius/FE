import PrivacyAgreeScreen from '@/screens/accout/setting/terms-agreement/PrivacyAgreeScreen';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PrivacyDetail() {
  return (
    <View style={styles.mypageContainer}>
      <SafeAreaView>
        <PrivacyAgreeScreen />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  mypageContainer: {
    height: '100%',
  },
});
