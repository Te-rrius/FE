import { StyleSheet, Text, View } from 'react-native';

import GrayCalendarIcon from '@/assets/images/report/grayCalendarIcon.svg';
import GrayLocationIcon from '@/assets/images/report/grayLocationIcon.svg';
import LineIcon from '@/assets/images/modal/lineIcon.svg';
import DefaultProfileIcon from '@/assets/images/report/defaultProfileIcon.svg';

import { hp, wp } from '@/utils/dimension';

const ReportInfo = () => {
  return (
    <View style={styles.boxWrapper}>
      <View style={styles.boxContainer}>
        <Text style={styles.infoText}>분석할 대상이 필요합니다.</Text>
        <View style={styles.infoWrapper}>
          <View style={styles.infoRow}>
            <GrayCalendarIcon />
            <View style={styles.infoDetailWrapper}>
              <Text style={styles.infoDetailText}>0000년 0월 0일 월요일</Text>
              <LineIcon />
              <Text style={styles.infoDetailText}>00:00 - 00:00</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <GrayLocationIcon />
            <View style={styles.infoDetailWrapper}>
              <Text style={styles.infoDetailText}>구장명</Text>
              <LineIcon />
              <Text style={styles.infoDetailText}>구역명</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.profileIcon}>
        <DefaultProfileIcon />
        <View style={styles.profileBorder} />
      </View>
    </View>
  );
};

export default ReportInfo;

const styles = StyleSheet.create({
  boxWrapper: {
    position: 'relative',
    paddingHorizontal: wp(20),
  },

  boxContainer: {
    paddingHorizontal: wp(16),
    paddingVertical: hp(20),
    backgroundColor: '#555555',
    borderRadius: 20,
    gap: hp(12),
  },

  infoText: {
    color: '#FFFFFF',
    fontFamily: 'Pretendard600',
    fontSize: wp(20),
    lineHeight: hp(28),
    letterSpacing: wp(-0.5),
  },

  infoWrapper: {
    gap: hp(8),
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(6),
  },

  infoDetailWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4),
  },

  infoDetailText: {
    color: '#F5F5F5',
  },

  profileIcon: {
    position: 'absolute',
    alignSelf: 'flex-start',
    width: wp(80),
    height: wp(80),
    borderRadius: 45.5,
    overflow: 'hidden',
    right: wp(40),
    top: hp(-42),
  },

  profileBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 45.5,
    borderWidth: 6,
    borderColor: '#FEFEFE',
  },
});
