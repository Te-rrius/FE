import MarketingAgreeScreen from '@/screens/accout/setting/terms-agreement/MarketingAgreeScreen';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TermDetail() {
  return (
    <View style={styles.mypageContainer}>
      <SafeAreaView>
        <MarketingAgreeScreen />
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
