import { Pressable, StyleSheet, Text, View } from 'react-native';
import { hp, wp } from '@/utils/dimension';
import { DUMMY_SCHEDULES, ScheduleDto } from '@/constants/dummySchedule';
import { useState } from 'react';
import RequestModal from '@/components/modal/RequestModal';
import useAuthStore from '@/store/authStore';
import useRequestStore from '@/store/requestStore';
import { useQuery } from '@tanstack/react-query';

interface RequestScheduleListProps {
  selectedCourtId: number | null;
  courtName: string;
  selectedDate: Date;
}

// 시작 시간 기준 오전/오후
const formatToKoreanTime = (hours: string) => {
  const startHour = parseInt(hours.split('~')[0].split(':')[0]);
  return startHour < 12 ? '오전' : '오후';
};

// 수정 예정
const fetchRequestSchedules = async (courtId: number) => (DUMMY_SCHEDULES[courtId] ?? []).filter((s) => !s.isRequested);

const RequestScheduleList = ({ selectedCourtId, courtName, selectedDate }: RequestScheduleListProps) => {
  const { token, openLoginModal } = useAuthStore();
  const { requestedIds, addRequestedId } = useRequestStore();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleDto | null>(null);

  const toDateString = (date: Date) => date.toISOString().split('T')[0];

  // 선택된 코트의 경기 시간 목록 조회
  const { data: allSchedules = [] } = useQuery({
    queryKey: ['requestSchedules', selectedCourtId],
    queryFn: () => fetchRequestSchedules(selectedCourtId!),
    enabled: selectedCourtId !== null,
  });

  // 선택된 날짜에 해당하는 일정만 필터링
  const scheduleList = allSchedules.filter((s) => s.date === toDateString(selectedDate));

  const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
  const day = String(selectedDate.getDate()).padStart(2, '0');

  return (
    <View>
      {scheduleList.map((schedule) => {
        const [startTime, endTime] = schedule.hours.split('~');
        const isRequested = schedule.isRequested || requestedIds.has(schedule.scheduleId);

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
              style={[styles.button, isRequested && styles.buttonDisabled]}
              disabled={isRequested}
              onPress={() => {
                if (!token) {
                  openLoginModal();
                  return;
                }
                setSelectedSchedule(schedule);
                setIsModalVisible(true);
              }}
            >
              <Text style={[styles.buttonText, isRequested && styles.buttonTextDisabled]}>
                {isRequested ? '신청완료' : '신청하기'}
              </Text>
            </Pressable>
          </View>
        );
      })}

      {isModalVisible && selectedSchedule && (
        <RequestModal
          schedule={selectedSchedule}
          courtName={courtName}
          onClose={() => setIsModalVisible(false)}
          onConfirm={(scheduleId) => {
            addRequestedId(scheduleId);
            setIsModalVisible(false);
          }}
        />
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
