import { hp, wp } from '@/utils/dimension';
import { getStatus } from '@/utils/postAnalysisComment';
import { StyleSheet, Text, View } from 'react-native';

type Status = '양호' | '보통' | '개선 필요';

interface AnalysisStateCardProps {
  title: string;
  value: number | null;
  recommended: number | null;
  barReference: number | null; // 바 세로선 위치
  barMax: number | null; // 바 최대값
  comment: string;
}

const STATUS_CONFIG: Record<Status, { label: string; color: string; bg: string; barColor: string }> = {
  양호: { label: '양호', color: '#43A047', bg: '#E2F3EC', barColor: '#43A047' },
  보통: { label: '보통', color: '#D97706', bg: '#FEF3C7', barColor: '#FBBF24' },
  '개선 필요': { label: '개선 필요', color: '#DC2626', bg: '#FEE2E2', barColor: '#EF4444' },
};

const AnalysisStateCard = ({ title, value, recommended, barReference, barMax, comment }: AnalysisStateCardProps) => {
  const status = value !== null && recommended !== null ? getStatus({ value, recommended }) : null;
  const config = status ? STATUS_CONFIG[status] : null;

  const max = barMax ?? 100;
  const fillRatio = value !== null ? Math.min(Math.max(value / max, 0), 1) : 0;
  const thumbRatio = recommended !== null ? Math.min(Math.max(recommended / max, 0), 1) : null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titleText}>{title}</Text>
        {config && (
          <View style={[styles.badge, { backgroundColor: config.bg }]}>
            <Text style={[styles.badgeText, { color: config.color }]}>{config.label}</Text>
          </View>
        )}
      </View>

      <View style={styles.stateContent}>
        <View style={styles.barRow}>
          <View style={styles.barTrack}>
            <View style={[styles.barFill, { flex: fillRatio, backgroundColor: config?.barColor ?? '#E5E7EB' }]} />
            <View style={[styles.barFill, { flex: 1 - fillRatio, backgroundColor: '#E5E7EB' }]} />
            {thumbRatio !== null && <View style={[styles.thumb, { left: `${thumbRatio * 100 - 10}%` as any }]} />}
            {' '}
          </View>
          <Text style={styles.valueText}>
            <Text style={styles.valueBold}>{value !== null ? `${value.toFixed(1)}°` : ''}</Text>
            {value !== null && recommended !== null && (
              <Text style={styles.recommendedText}>{`/권장 ${recommended.toFixed(1)}°`}</Text>
            )}
          </Text>
        </View>
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
