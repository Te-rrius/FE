import { StyleSheet, View } from 'react-native';
import { Pressable, ScrollView, Text } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import useAuthStore from '@/stores/authStore';
import { useReportTimes } from '../services/useReportTimes';
import RequestReportInfo from './RequestReportInfo';
import { hp, wp } from '@/utils/dimension';
import { formatTime, toDateString } from '@/utils/date';

import TimeIcon from '@/assets/images/replay/timeIcon.svg';

interface ReportScheduleListProps {
  stadiumId: number;
  selectedCourtId: number | null;
  selectedDate: Date;
  onPress: () => void;
}

const GAME_TYPE_LABEL = {
  SINGLES: '단식 경기',
  DOUBLES: '복식 경기',
} as const;

const ReportScheduleList = ({ stadiumId, selectedCourtId, selectedDate, onPress }: ReportScheduleListProps) => {
  const { token, openLoginModal } = useAuthStore();
  const [selectedVideoId, setSelectedVideoId] = useState<number | null>(null);

  const { data: times = [] } = useReportTimes(stadiumId, {
    date: toDateString(selectedDate),
    courtNumber: selectedCourtId ?? undefined,
  });

  const hasAnyReport = times.length > 0;

  return (
    <View style={styles.wrapper}>
      <View style={styles.titleRow}>
        <TimeIcon />
        <Text style={styles.titleText}>시간대</Text>
      </View>
      {hasAnyReport && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.row}>
            {times.map((item) => (
              <Pressable
                key={item.matchVideoId}
                style={styles.scheduleCard}
                onPress={() => {
                  if (!token) {
                    router.replace('/');
                    openLoginModal();
                    return;
                  }
                  setSelectedVideoId(item.matchVideoId);
                  router.push({
                    pathname: '/report/[matchVideoId]',
                    params: { matchVideoId: item.matchVideoId },
                  });
                }}
              >
                <Text style={styles.scheduleHours}>
                  {formatTime(item.startTime)} ~ {formatTime(item.endTime)}
                </Text>
                <Text style={styles.scheduleCount}>{GAME_TYPE_LABEL[item.matchType]}</Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      )}
      <RequestReportInfo hasAnyReport={hasAnyReport} selectedDate={selectedDate} onPress={onPress} />
    </View>
  );
};

export default ReportScheduleList;

const styles = StyleSheet.create({
  wrapper: { gap: hp(8) },

  titleRow: { flexDirection: 'row', alignItems: 'center', gap: wp(6) },

  titleText: {
    color: '#5C5C5C',
    fontFamily: 'Pretendard600',
    fontSize: wp(14),
    lineHeight: hp(20),
    letterSpacing: wp(-0.35),
  },

  row: { flexDirection: 'row', gap: wp(10) },

  scheduleCard: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 6,
    paddingHorizontal: wp(14),
    paddingVertical: hp(10),
    gap: hp(2),
  },

  scheduleHours: {
    color: '#212121',
    fontFamily: 'Pretendard600',
    fontSize: wp(14),
    lineHeight: hp(20),
    letterSpacing: wp(-0.35),
  },

  scheduleCount: {
    color: '#767676',
    fontFamily: 'Pretendard400',
    fontSize: wp(12),
    lineHeight: hp(18),
    letterSpacing: wp(-0.3),
  },
});
