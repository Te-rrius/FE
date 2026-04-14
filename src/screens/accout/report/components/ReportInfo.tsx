import { StyleSheet, Text, View } from 'react-native';

import GrayCalendarIcon from '@/assets/images/report/grayCalendarIcon.svg';
import GrayLocationIcon from '@/assets/images/report/grayLocationIcon.svg';
import LineIcon from '@/assets/images/modal/lineIcon.svg';
import DefaultProfileIcon from '@/assets/images/report/defaultProfileIcon.svg';

import { hp, wp } from '@/utils/dimension';
import { CourtDto, ReportScheduleDto } from '@/constants/dummySchedule';
import { StadiumDto } from '@/constants/dummyStadium';
import { LinearGradient } from 'expo-linear-gradient';

interface ReportInfoProps {
  date: string;
  schedule: ReportScheduleDto | undefined;
  courts: CourtDto[] | undefined;
  stadium: StadiumDto | undefined;
  selectedPlayer: 1 | 2 | null;
}

const ReportInfo = ({ date, schedule, courts, stadium, selectedPlayer }: ReportInfoProps) => {
  const courtName = courts?.[0]?.name ?? '구역명';

  const content = (
    <>
      <Text style={styles.infoText}>{selectedPlayer === null ? '분석할 대상이 필요합니다.' : '분석 리포트'}</Text>
      <View style={styles.infoWrapper}>
        <View style={styles.infoRow}>
          <GrayCalendarIcon />
          <View style={styles.infoDetailWrapper}>
            <Text style={styles.infoDetailText}>{date}</Text>
            <LineIcon />
            <Text style={styles.infoDetailText}>{schedule?.hours ?? '00:00~00:00'}</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <GrayLocationIcon />
          <View style={styles.infoDetailWrapper}>
            <Text style={styles.infoDetailText}>{stadium?.name ?? '구장명'}</Text>
            <LineIcon />
            <Text style={styles.infoDetailText}>{courtName}</Text>
          </View>
        </View>
      </View>
    </>
  );

  return (
    <View style={styles.boxWrapper}>
      {selectedPlayer === null ? (
        <View style={styles.boxContainer}>{content}</View>
      ) : (
        <LinearGradient
          colors={['#4048F7', '#656CFF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.boxContainer}
        >
          {content}
        </LinearGradient>
      )}
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
