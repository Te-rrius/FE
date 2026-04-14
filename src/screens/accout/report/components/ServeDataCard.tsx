import { hp, wp } from '@/utils/dimension';
import { StyleSheet, Text, View } from 'react-native';

type CardStatus = 'default' | 'active';

interface ServeDataCardProps {
  title: string;
  icon?: React.ReactNode;
  value: number; // 퍼센트값 (너비 비율 + 표시값 동시에)
  unit?: string;
  status?: CardStatus;
}

const ServeDataCard = ({ title, icon, value, unit = '%', status = 'default' }: ServeDataCardProps) => {
  const isActive = status === 'active';

  return (
    <View style={[styles.container, isActive && styles.activeContainer, { flex: value }]}>
      <Text style={[styles.titleText, isActive && styles.activeText]}>{title}</Text>
      <View style={styles.bottom}>
        <View style={styles.iconWrapper}>{icon}</View>
        <View style={styles.textRow}>
          <Text style={[styles.valueText, isActive && styles.activeText]}>{value}</Text>
          <Text style={[styles.unitText, isActive && styles.activeUnitText]}>{unit}</Text>
        </View>
      </View>
    </View>
  );
};

export default ServeDataCard;

const styles = StyleSheet.create({
  container: {
    minWidth: wp(100),
    height: hp(111),
    paddingHorizontal: wp(14),
    paddingTop: hp(16),
    paddingBottom: hp(10),
    borderWidth: 2,
    backgroundColor: '#FFFFFF',
    borderColor: '#E0E0E0',
    borderRadius: 20,
    justifyContent: 'space-between',
  },

  activeContainer: {
    backgroundColor: '#111111',
  },

  titleText: {
    color: '#212121',
    fontSize: wp(13),
    fontFamily: 'Pretendard500',
    lineHeight: hp(19),
    letterSpacing: wp(-0.325),
  },

  activeText: {
    color: '#FFFFFF',
  },

  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  iconWrapper: {
    paddingBottom: hp(8),
  },

  textRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  valueText: {
    color: '#212121',
    fontSize: wp(28),
    fontFamily: 'Pretendard600',
    lineHeight: hp(39),
    letterSpacing: wp(-0.7),
  },

  unitText: {
    color: '#4048F7',
    fontSize: wp(16),
    fontFamily: 'Pretendard600',
    paddingBottom: hp(4),
  },

  activeUnitText: {
    color: '#757BFF',
  },
});
