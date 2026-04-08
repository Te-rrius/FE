import { Pressable, StyleSheet, Text, View } from 'react-native';
import { hp, wp } from '@/utils/dimension';
import { DUMMY_MATCH_SCHEDULES, MatchScheduleDto } from '@/constants/dummySchedule';
import { useState } from 'react';
import RequestModal from '@/components/modal/RequestModal';

interface RequestScheduleListProps {
  selectedCourtId: number | null;
  courtName: string;
  selectedDate: Date;
}

const formatToKoreanTime = (hours: string) => {
  const startHour = parseInt(hours.split('~')[0].split(':')[0]);
  return startHour < 12 ? '오전' : '오후';
};

const RequestScheduleList = ({ selectedCourtId, courtName, selectedDate }: RequestScheduleListProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<MatchScheduleDto | null>(null);

  const toDateString = (date: Date) => date.toISOString().split('T')[0];

  const scheduleList: MatchScheduleDto[] = selectedCourtId
    ? (DUMMY_MATCH_SCHEDULES[selectedCourtId] ?? []).filter((s) => s.date === toDateString(selectedDate))
    : [];

  const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
  const day = String(selectedDate.getDate()).padStart(2, '0');

  return (
    <View>
      {scheduleList.map((schedule) => {
        const [startTime, endTime] = schedule.hours.split('~');
        return (
          <View key={schedule.scheduleId} style={styles.row}>
            <View style={styles.timeInfo}>
              <Text style={styles.dateText}>
                {month}.{day}
              </Text>
              <View style={styles.timeRow}>
                <Text style={styles.startTimeText}>{formatToKoreanTime(schedule.hours)}</Text>
                <View style={styles.timeRange}>
                  <Text style={styles.startTimeText}>{startTime}</Text>
                  <Text style={styles.separatorText}>~</Text>
                  <Text style={styles.endTimeText}>{endTime}</Text>
                </View>
              </View>
            </View>
            <Pressable
              style={[styles.button, schedule.isRequested && styles.buttonDisabled]}
              disabled={schedule.isRequested}
              onPress={() => {
                setSelectedSchedule(schedule);
                setIsModalVisible(true);
              }}
            >
              <Text style={[styles.buttonText, schedule.isRequested && styles.buttonTextDisabled]}>
                {schedule.isRequested ? '신청완료' : '신청하기'}
              </Text>
            </Pressable>
          </View>
        );
      })}

      {isModalVisible && selectedSchedule && (
        <RequestModal schedule={selectedSchedule} courtName={courtName} onClose={() => setIsModalVisible(false)} />
      )}
    </View>
  );
};

export default RequestScheduleList;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(10),
    paddingVertical: hp(16),
  },

  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(20),
  },

  dateText: {
    color: '#999999',
    fontFamily: 'Pretendard400',
    fontSize: wp(14),
    lineHeight: hp(20),
    letterSpacing: wp(-0.35),
  },

  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(8),
  },

  timeRange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4),
  },

  startTimeText: {
    color: '#212121',
    fontFamily: 'Pretendard600',
    fontSize: wp(20),
    lineHeight: hp(28),
    letterSpacing: wp(-0.5),
  },

  separatorText: {
    color: '#767676',
    fontFamily: 'Pretendard600',
    fontSize: wp(14),
    lineHeight: hp(20),
    letterSpacing: wp(-0.35),
  },

  endTimeText: {
    color: '#767676',
    fontFamily: 'Pretendard600',
    fontSize: wp(14),
    lineHeight: hp(20),
  },

  button: {
    backgroundColor: '#4048F7',
    paddingHorizontal: wp(12),
    paddingVertical: hp(6),
    borderRadius: 4,
  },

  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'Pretendard600',
    fontSize: wp(13),
    lineHeight: hp(18),
    letterSpacing: wp(-0.325),
  },

  buttonDisabled: {
    backgroundColor: '#EAEAEA',
  },

  buttonTextDisabled: {
    color: '#999999',
  },
});
