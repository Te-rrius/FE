import { wp, hp } from '@/utils/dimension';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface DatePickerProps {
  type: 'download' | 'request';
  selectedDate: Date;
  onSelect: (date: Date) => void;
  highlightDates?: Date[];
}

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

// 타입별 날짜 개수
const DAY_COUNT: Record<DatePickerProps['type'], number> = {
  download: 8,
  request: 3,
};

// 너비 고정
const ITEM_WIDTH: Record<DatePickerProps['type'], number> = {
  download: wp(44),
  request: wp(117),
};

// 날짜를 과거 -> 오늘로 배열
const getDayList = (count: number): Date[] => {
  const today = new Date();
  return Array.from({ length: count }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    return date;
  }).reverse();
};

const isSameDate = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const DatePicker = ({ type, selectedDate, onSelect, highlightDates = [] }: DatePickerProps) => {
  const dayList = getDayList(DAY_COUNT[type]);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
      {dayList.map((date) => {
        const isSelected = isSameDate(selectedDate, date);
        const isHighlight = highlightDates.some((d) => isSameDate(d, date));
        const key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

        return (
          <TouchableOpacity
            key={key}
            onPress={() => onSelect(date)}
            style={[
              styles.dateItem,
              { width: ITEM_WIDTH[type] },
              type === 'download' && styles.dateItemDownload,
              isSelected && styles.dateItemSelected,
            ]}
          >
            <Text style={[styles.dayText, isSelected && styles.textSelected]}>{date.getDate()}</Text>
            <Text style={[styles.weekdayText, isSelected && styles.textSelected]}>{WEEKDAYS[date.getDay()]}</Text>
            {isHighlight && <View style={styles.dot} />}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: wp(20),
  },

  dateItem: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(66),
    borderRadius: 8,
    gap: hp(3),
  },

  dateItemDownload: {
    paddingTop: hp(10),
    paddingBottom: hp(14),
  },

  dateItemSelected: {
    borderWidth: 1,
    borderColor: '#4048F7',
  },

  dayText: {
    fontFamily: 'Pretendard600',
    fontSize: wp(16),
    color: '#767676',
    lineHeight: hp(22),
    letterSpacing: wp(-0.4),
  },

  weekdayText: {
    fontFamily: 'Pretendard600',
    fontSize: wp(12),
    color: '#999',
    lineHeight: hp(17),
    letterSpacing: wp(-0.3),
  },

  textSelected: {
    color: '#303030',
  },

  dot: {
    position: 'absolute',
    bottom: hp(6),
    width: wp(4),
    height: wp(4),
    borderRadius: wp(2),
    backgroundColor: '#4048F7',
  },
});
