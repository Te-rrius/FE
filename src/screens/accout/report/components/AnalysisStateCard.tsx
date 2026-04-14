import { hp, wp } from '@/utils/dimension';
import { StyleSheet, Text, View } from 'react-native';

type Status = '양호' | '보통' | '개선 필요';

interface AnalysisStateCardProps {
  title: string;
  value: number;
  recommended: number;
  maxValue?: number;
  comment: string;
}

function getStatus(value: number): Status {
  if (value >= 80) return '양호';
  if (value >= 50) return '보통';
  return '개선 필요';
}

const STATUS_CONFIG: Record<Status, { label: string; color: string; bg: string; barColor: string }> = {
  양호: { label: '양호', color: '#43A047', bg: '#E2F3EC', barColor: '#43A047' },
  보통: { label: '보통', color: '#D97706', bg: '#FEF3C7', barColor: '#FBBF24' },
  '개선 필요': { label: '개선 필요', color: '#DC2626', bg: '#FEE2E2', barColor: '#EF4444' },
};

const AnalysisStateCard = ({ title, value, recommended, maxValue = 100, comment }: AnalysisStateCardProps) => {
  const status = getStatus(value);
  const { label, color, bg, barColor } = STATUS_CONFIG[status];

  const fillRatio = Math.min(Math.max(value / maxValue, 0), 1);
  const recommendedRatio = Math.min(Math.max(recommended / maxValue, 0), 1);

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.titleText}>{title}</Text>
        <View style={[styles.badge, { backgroundColor: bg }]}>
          <Text style={[styles.badgeText, { color }]}>{label}</Text>
        </View>
      </View>

      <View style={styles.stateContent}>
        {/* 바 + 수치 */}
        <View style={styles.barRow}>
          <View style={styles.barTrack}>
            <View style={[styles.barFill, { flex: fillRatio, backgroundColor: barColor }]} />
            <View style={[styles.barFill, { flex: 1 - fillRatio, backgroundColor: '#E5E7EB' }]} />
            {/* 권장 위치 마커 */}
            <View style={[styles.thumb, { left: `${recommendedRatio * 100}%` as any }]} />
          </View>
          <Text style={styles.valueText}>
            <Text style={styles.valueBold}>{value}°</Text>
            <Text style={styles.recommendedText}>{` / 권장 ${recommended}°`}</Text>
          </Text>
        </View>

        {/* 코멘트 */}
        <Text style={styles.comment}>{comment}</Text>
      </View>
    </View>
  );
};

export default AnalysisStateCard;

const styles = StyleSheet.create({
  container: {
    padding: wp(16),
    borderWidth: 1,
    borderColor: '#E8E8E8',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    gap: hp(12),
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  titleText: {
    color: '#000000',
    fontSize: wp(18),
    fontFamily: 'Pretendard500',
    lineHeight: hp(25),
    letterSpacing: wp(-0.45),
  },

  badge: {
    paddingHorizontal: wp(10),
    paddingVertical: hp(4),
    borderRadius: 36,
  },

  badgeText: {
    fontSize: wp(13),
    fontFamily: 'Pretendard500',
    lineHeight: hp(20),
    letterSpacing: wp(-0.35),
  },

  stateContent: {
    gap: hp(3),
  },

  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  barTrack: {
    width: wp(220),
    height: hp(4),
    borderRadius: 10,
    flexDirection: 'row',
    overflow: 'visible',
  },

  barFill: {
    height: '100%',
    borderRadius: 4,
  },

  thumb: {
    position: 'absolute',
    width: wp(3),
    height: hp(20),
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#212121',
    borderRadius: 100,
    top: -(hp(20) - hp(3)) / 2,
    marginLeft: -wp(1.5),
    zIndex: 1,
  },

  valueText: {
    fontSize: wp(14),
    lineHeight: hp(20),
    letterSpacing: wp(-0.35),
  },

  valueBold: {
    fontFamily: 'Pretendard600',
    color: '#212121',
  },

  recommendedText: {
    color: '#4048F7',
    fontFamily: 'Pretendard500',
  },

  comment: {
    color: '#505050',
    fontSize: wp(14),
    fontFamily: 'Pretendard400',
    lineHeight: hp(20),
    letterSpacing: wp(-0.35),
  },
});
