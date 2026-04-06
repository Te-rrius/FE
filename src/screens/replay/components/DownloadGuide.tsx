import { Pressable, StyleSheet, Text, View } from 'react-native';
import { hp, wp } from '@/utils/dimension';
import WhiteArrowIcon from '@/assets/images/replay/whiteArrowIcon.svg';

interface ReportRequestCardProps {
  icon?: React.ReactNode;
  mainText: string;
  subText: string;
  onPress?: () => void;
}

const DownloadGuide = ({ icon, mainText, subText, onPress }: ReportRequestCardProps) => {
  return (
    <View style={styles.wrapper}>
      {icon}
      <View style={styles.textWrapper}>
        <Text style={styles.mainText}>{mainText}</Text>
        <Text style={styles.subText}>{subText}</Text>
      </View>
      <Pressable style={styles.requestButton} onPress={onPress}>
        <Text style={styles.requestText}>리포트 신청하러 가기</Text>
        <WhiteArrowIcon />
      </Pressable>
    </View>
  );
};

export default DownloadGuide;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    gap: hp(28),
    paddingVertical: hp(28),
  },

  textWrapper: {
    gap: hp(8),
    textAlign: 'center',
  },

  mainText: {
    color: '#434343',
    fontFamily: 'Pretendard600',
    fontSize: wp(18),
    textAlign: 'center',
    lineHeight: hp(26),
    letterSpacing: wp(-0.45),
  },

  subText: {
    color: '#767676',
    fontFamily: 'Pretendard400',
    fontSize: wp(13),
    textAlign: 'center',
    lineHeight: hp(18),
    letterSpacing: wp(-0.325),
  },

  requestButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#4048F7',
    paddingHorizontal: wp(37.5),
    paddingVertical: hp(9),
    borderRadius: 6,
  },

  requestText: {
    color: '#FFFFFF',
    fontFamily: 'Pretendard600',
    fontSize: wp(13),
    textAlign: 'center',
    lineHeight: hp(18),
    letterSpacing: wp(-0.325),
  },

  noWrapper: {
    alignItems: 'center',
    gap: hp(18),
    paddingVertical: hp(28),
  },
});
