import { hp, wp } from '@/utils/dimension';
import { StyleSheet, Text, View } from 'react-native';

interface PoseAnalysisCardProps {
  title: string;
  icon?: React.ReactNode;
  analysisText: string;
}

const PoseAnalysisCard = ({ title, icon, analysisText }: PoseAnalysisCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.analysisTitle}>
        <Text style={styles.titleText}>{title}</Text>
        {icon}
      </View>
      <Text style={styles.analysisText}>{analysisText}</Text>
    </View>
  );
};

export default PoseAnalysisCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(14),
    paddingTop: hp(18),
    paddingBottom: hp(20),
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    borderColor: '#EAEAEA',
    borderRadius: 20,
    gap: hp(25),
  },

  analysisTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  titleText: {
    color: '#5C5C5C',
    fontSize: wp(13),
    fontFamily: 'Pretendard500',
    lineHeight: hp(19),
    letterSpacing: wp(-0.325),
  },

  textRow: {
    flexDirection: 'row',
    gap: wp(2),
  },

  analysisText: {
    textAlign: 'right',
    color: '#212121',
    fontSize: wp(32),
    fontFamily: 'Pretendard600',
    lineHeight: hp(42),
    letterSpacing: wp(-0.8),
  },
});
