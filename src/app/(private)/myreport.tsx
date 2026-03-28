import MyReportScreen from '@/screens/accout/report/MyReportScreen';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MyPage() {
  return (
    <View style={styles.mypageContainer}>
      <SafeAreaView>
        <MyReportScreen />
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
