import { hp, wp } from '@/utils/dimension';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import CardGradient from './CardGradient';
import TennisCardIcon from '@/assets/images/account/tennisCardIcon.svg';

type ReportListProps = {
  date: string;
  onPress: () => void;
};

const ReportList = ({ date, onPress }: ReportListProps) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.cardHeader}>
        <View style={styles.gradientWrapper}>
          <CardGradient />
          <CardGradient width={wp(53)} />
          <CardGradient width={wp(70)} />
        </View>
        <View style={styles.tennisIcon}>
          <TennisCardIcon />
        </View>
      </View>
      <View style={styles.reportText}>
        <Text style={styles.dateText}>{date}</Text>
        <Text style={styles.titleText}>{`테니스\n분석 리포트`}</Text>
      </View>
    </Pressable>
  );
};

export default ReportList;

const styles = StyleSheet.create({
  container: {
    width: '49%',
    aspectRatio: 1,
    paddingHorizontal: wp(12),
    paddingVertical: hp(12),
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 18,
    gap: hp(4),
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  gradientWrapper: {
    gap: hp(6),
  },

  tennisIcon: {
    width: wp(44),
    height: hp(44),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4048F7',
    borderRadius: 18,
  },

  reportText: {
    gap: hp(4),
  },

  dateText: {
    color: '#666666',
    fontFamily: 'Pretendard400',
    fontSize: wp(12),
    lineHeight: hp(17),
    letterSpacing: wp(-0.3),
  },

  titleText: {
    color: '#333333',
    fontFamily: 'KBLJump-EB-Extended',
    fontSize: wp(16),
    lineHeight: hp(23),
    letterSpacing: wp(0.32),
  },
});
