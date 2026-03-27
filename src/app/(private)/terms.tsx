import TermAgreeScreen from '@/screens/accout/setting/terms-agreement/TermAgreeScreen';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Terms() {
  return (
    <View style={styles.mypageContainer}>
      <SafeAreaView>
        <TermAgreeScreen />
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
