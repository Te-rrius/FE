import { DUMMY_REPORT_SCHEDULES } from '@/constants/reportSchedule';
import { hp, wp } from '@/utils/dimension';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ReportScheduleDto } from '@/constants/reportSchedule';

interface ReportScheduleListProps {
  scheduleList?: ReportScheduleDto[];
  onPress?: (scheduleId: number) => void;
}

const GAME_TYPE_LABEL = {
  SINGLE: '단식 경기',
  DOUBLE: '복식 경기',
} as const;

const ReportScheduleList = ({ scheduleList = [], onPress }: ReportScheduleListProps) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.row}>
        {scheduleList.map((schedule) => (
          <Pressable
            key={schedule.scheduleId}
            style={styles.scheduleCard}
            onPress={() => onPress?.(schedule.scheduleId)}
          >
            <Text style={styles.scheduleHours}>{schedule.hours}</Text>
            <Text style={styles.scheduleCount}>{GAME_TYPE_LABEL[schedule.gameType]}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
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
    fontSize: wp(14),
    fontWeight: '600',
    lineHeight: hp(20),
  },

  scheduleCount: {
    color: '#767676',
    fontSize: wp(12),
    fontWeight: '400',
    lineHeight: hp(18),
  },
});
