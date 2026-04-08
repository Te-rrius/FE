import { StyleSheet, View } from 'react-native';
import { Pressable, ScrollView, Text } from 'react-native';
import { useState } from 'react';
import { hp, wp } from '@/utils/dimension';
import { DUMMY_REPORT_SCHEDULES, ReportScheduleDto } from '@/constants/reportSchedule';
import RequestReportInfo from './RequestReportInfo';

interface ReportScheduleListProps {
  selectedFieldId: number | null;
  selectedDate: Date;
  onPress: () => void;
}

const GAME_TYPE_LABEL = {
  SINGLE: '단식 경기',
  DOUBLE: '복식 경기',
} as const;

const ReportScheduleList = ({ selectedFieldId, selectedDate, onPress }: ReportScheduleListProps) => {
  // 선택된 스케줄 상태
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);

  const toDateString = (date: Date) => date.toISOString().split('T')[0];

  // 선택된 구역 + 날짜로 더미 데이터 필터링
  const scheduleList: ReportScheduleDto[] = selectedFieldId
    ? (DUMMY_REPORT_SCHEDULES[selectedFieldId] ?? []).filter((s) => s.date === toDateString(selectedDate))
    : [];

  // 리포트 존재 여부 판단
  const hasAnyReport = scheduleList.length > 0;

  return (
    <>
      {/* 리포트 있을 때만 카드 목록 렌더 */}
      {hasAnyReport && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.row}>
            {scheduleList.map((schedule) => (
              <Pressable
                key={schedule.scheduleId}
                style={[styles.scheduleCard, selectedScheduleId === schedule.scheduleId && styles.scheduleCardActive]}
                onPress={() => setSelectedScheduleId(schedule.scheduleId)}
              >
                <Text style={styles.scheduleHours}>{schedule.hours}</Text>
                <Text style={styles.scheduleCount}>{GAME_TYPE_LABEL[schedule.gameType]}</Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      )}
      <RequestReportInfo hasAnyReport={hasAnyReport} selectedDate={selectedDate} onPress={onPress} />
    </>
  );
};

export default ReportScheduleList;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  scheduleCard: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 6,
    paddingHorizontal: wp(14),
    paddingVertical: hp(10),
    gap: 2,
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
