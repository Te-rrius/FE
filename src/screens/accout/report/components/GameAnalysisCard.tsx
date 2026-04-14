import { hp, wp } from '@/utils/dimension';
import { StyleSheet, Text, View } from 'react-native';

interface PoseAnalysisCardProps {
  title: string;
  icon?: React.ReactNode;
  analysisText: string;
  unit?: string;
}

const PoseAnalysisCard = ({ title, icon, analysisText, unit }: PoseAnalysisCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.analysisTitle}>
        <Text style={styles.titleText}>{title}</Text>
        {icon}
      </View>
      <View style={styles.textRow}>
        <Text style={styles.analysisText}>{analysisText}</Text>
        <Text style={styles.unitText}>{unit}</Text>
      </View>
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
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    gap: wp(2),
  },

  analysisText: {
    color: '#212121',
    fontSize: wp(48),
    fontFamily: 'Pretendard600',
    lineHeight: hp(62.5),
    letterSpacing: wp(-1.2),
  },

  unitText: {
    color: '#4048F7',
    fontSize: wp(16),
    fontFamily: 'Pretendard600',
    lineHeight: hp(22.4),
    letterSpacing: wp(-0.4),
    paddingBottom: hp(10),
  },
});
