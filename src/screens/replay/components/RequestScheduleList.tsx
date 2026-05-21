import { Pressable, StyleSheet, Text, View } from 'react-native';
import { hp, wp } from '@/utils/dimension';
import { useState } from 'react';
import RequestModal from '@/components/modal/RequestModal';
import useAuthStore from '@/stores/authStore';
import { ScheduleTimeResponse } from '@/types/stadium/stadiumDetail';

interface RequestScheduleListProps {
  times: ScheduleTimeResponse[];
  stadiumId: number;
  stadiumName: string;
  selectedDate: Date;
  selectedCourtId: number | null;
}

const formatAmPm = (time: string): string => {
  const hour = parseInt(time.split(':')[0]);
  return hour < 12 ? '오전' : '오후';
};

const formatTime = (time: string): string => time.slice(0, 5);

const RequestScheduleList = ({ times, stadiumName, selectedDate, selectedCourtId }: RequestScheduleListProps) => {
  const { token, openLoginModal } = useAuthStore();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ScheduleTimeResponse | null>(null);

  const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
  const day = String(selectedDate.getDate()).padStart(2, '0');

  return (
    <View>
      {times.map((item) => (
        <View key={item.matchVideoId} style={styles.row}>
          <View style={styles.timeInfo}>
            <Text style={styles.dateText}>
              {month}.{day}
            </Text>
            <View style={styles.timeRow}>
              <Text style={styles.startTimeText}>{formatAmPm(item.startTime)}</Text>
              <View style={styles.timeRange}>
                <Text style={styles.startTimeText}>{formatTime(item.startTime)}</Text>
                <Text style={styles.separatorText}>~</Text>
                <Text style={styles.endTimeText}>{formatTime(item.endTime)}</Text>
              </View>
            </View>
          </View>
          <Pressable
            style={[styles.button, item.reportRequested && styles.buttonDisabled]}
            disabled={item.reportRequested}
            onPress={() => {
              if (!token) {
                openLoginModal();
                return;
              }
              setSelectedItem(item);
              setIsModalVisible(true);
            }}
          >
            <Text style={[styles.buttonText, item.reportRequested && styles.buttonTextDisabled]}>
              {item.reportRequested ? '신청완료' : '신청하기'}
            </Text>
          </Pressable>
        </View>
      ))}

      {isModalVisible && selectedItem && (
        <RequestModal
          item={selectedItem}
          selectedDate={selectedDate}
          stadiumName={stadiumName}
          onClose={() => setIsModalVisible(false)}
          onConfirm={() => setIsModalVisible(false)}
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
