import { hp, wp } from '@/utils/dimension';
import { StyleSheet, Text, View } from 'react-native';

type CardStatus = 'default' | 'active';

interface PoseAnalysisCardProps {
  title: string;
  icon?: React.ReactNode;
  analysisText: string;
  unit?: string;
  status?: CardStatus;
}

const STATUS_CONFIG: Record<CardStatus, { bg: string; textColor: string; unitColor: string; titleColor: string }> = {
  default: { bg: '#FFFFFF', textColor: '#212121', unitColor: '#4048F7', titleColor: '#5C5C5C' },
  active: { bg: '#4048F7', textColor: '#FFFFFF', unitColor: '#FFFFFF', titleColor: '#E4E5EF' },
};

const PoseAnalysisCard = ({ title, icon, analysisText, unit, status = 'default' }: PoseAnalysisCardProps) => {
  const config = STATUS_CONFIG[status];

  return (
    <View style={[styles.container, { backgroundColor: config.bg }]}>
      <View style={styles.analysisTitle}>
        <Text style={[styles.titleText, { color: config.titleColor }]}>{title}</Text>
        {icon}
      </View>
      <View style={styles.textRow}>
        <Text style={[styles.analysisText, { color: config.textColor }]}>{analysisText}</Text>
        <Text style={[styles.unitText, { color: config.unitColor }]}>{unit}</Text>
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
    backgroundColor: '#FFFFFF',
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
