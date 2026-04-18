import { StyleSheet, View } from 'react-native';
import { Pressable, ScrollView, Text } from 'react-native';
import { useState } from 'react';
import { hp, wp } from '@/utils/dimension';
import RequestReportInfo from './RequestReportInfo';

import TimeIcon from '@/assets/images/replay/timeIcon.svg';
import { DUMMY_SCHEDULES } from '@/constants/dummySchedule';
import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import useAuthStore from '@/store/authStore';

interface ReportScheduleListProps {
  selectedCourtId: number | null;
  selectedDate: Date;
  onPress: () => void;
}

const GAME_TYPE_LABEL = {
  SINGLE: '단식 경기',
  DOUBLE: '복식 경기',
} as const;

// 수정 예정
// ReportDownloadTab 중복 분리
const fetchDownloadSchedules = async (courtId: number) =>
  (DUMMY_SCHEDULES[courtId] ?? []).filter((s) => s.isRequested && s.reportId);

const ReportScheduleList = ({ selectedCourtId, selectedDate, onPress }: ReportScheduleListProps) => {
  const { token, openLoginModal } = useAuthStore();

  // 선택된 리포트
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);

  // 로컬 시간 기준 포맷팅
  const toDateString = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const { data: allSchedules = [] } = useQuery({
    queryKey: ['downloadSchedules', selectedCourtId],
    queryFn: () => fetchDownloadSchedules(selectedCourtId!),
    enabled: selectedCourtId !== null,
  });

  // 선택된 날짜에 해당하는 리포트만 필터링
  const scheduleList = allSchedules.filter((s) => s.date === toDateString(selectedDate));

  // 리포트 존재 시에만 목록 렌더링
  const hasAnyReport = scheduleList.length > 0;

  return (
    <View style={styles.wrapper}>
      <View style={styles.titleRow}>
        <TimeIcon />
        <Text style={styles.titleText}>시간대</Text>
      </View>
      {hasAnyReport && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.row}>
            {scheduleList.map((schedule) => (
              <Pressable
                key={schedule.scheduleId}
                style={[styles.scheduleCard, selectedScheduleId === schedule.scheduleId && styles.scheduleCardActive]}
                onPress={() => {
                  if (!token) {
                    router.replace('/');
                    openLoginModal();
                    return;
                  }
                  setSelectedScheduleId(schedule.scheduleId);
                  router.push({ pathname: '/report/[reportId]', params: { reportId: schedule.reportId } });
                }}
              >
                <Text style={styles.scheduleHours}>{schedule.hours}</Text>
                <Text style={styles.scheduleCount}>{GAME_TYPE_LABEL[schedule.gameType]}</Text>
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
  wrapper: {
    gap: hp(8),
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(6),
  },

  titleText: {
    color: '#5C5C5C',
    fontFamily: 'Pretendard600',
    fontSize: wp(14),
    lineHeight: hp(20),
    letterSpacing: wp(-0.35),
  },

  row: {
    flexDirection: 'row',
    gap: wp(10),
  },

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
  scheduleCardActive: {
    borderColor: '#4048F7',
  },
});
