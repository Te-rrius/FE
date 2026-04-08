import { StyleSheet, View } from 'react-native';
import { Pressable, ScrollView, Text } from 'react-native';
import { useState } from 'react';
import { hp, wp } from '@/utils/dimension';
import { DUMMY_REPORT_SCHEDULES, ReportScheduleDto } from '@/constants/reportSchedule';
import RequestReportInfo from './RequestReportInfo';

import TimeIcon from '@/assets/images/replay/timeIcon.svg';

interface ReportScheduleListProps {
  selectedCourtId: number | null;
  selectedDate: Date;
  onPress: () => void;
}

const GAME_TYPE_LABEL = {
  SINGLE: '단식 경기',
  DOUBLE: '복식 경기',
} as const;

const ReportScheduleList = ({ selectedCourtId, selectedDate, onPress }: ReportScheduleListProps) => {
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);

  const toDateString = (date: Date) => date.toISOString().split('T')[0];

  const scheduleList: ReportScheduleDto[] = selectedCourtId
    ? (DUMMY_REPORT_SCHEDULES[selectedCourtId] ?? []).filter((s) => s.date === toDateString(selectedDate))
    : [];

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
