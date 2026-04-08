import { StadiumSelectorDto } from '@/constants/reportTimeSchedule';
import { hp, wp } from '@/utils/dimension';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

interface StadiumSelectorProps {
  stadiumList?: StadiumSelectorDto[];
  selectedCourtId?: number | null;
  onPress?: (stadiumId: number) => void;
}

const CourtSelector = ({ stadiumList = [], selectedCourtId, onPress }: StadiumSelectorProps) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.row}>
        {stadiumList.map((stadium) => (
          <Pressable
            key={stadium.stadiumId}
            style={[styles.locationcard, selectedCourtId === stadium.stadiumId && styles.locationcardActive]}
            onPress={() => onPress?.(stadium.stadiumId)}
          >
            <Text style={[styles.stadiumName, selectedCourtId === stadium.stadiumId && styles.stadiumNameActive]}>
              {stadium.name}
            </Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

export default CourtSelector;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: wp(10),
  },

  locationcard: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 100,
    paddingHorizontal: wp(16),
    paddingVertical: hp(11),
  },

  stadiumName: {
    color: '#767676',
    fontSize: wp(14),
    fontFamily: 'Pretendard500',
    lineHeight: hp(20),
    letterSpacing: wp(-0.35),
  },

  locationcardActive: {
    borderColor: '#4048F7',
  },

  stadiumNameActive: {
    color: '#212121',
  },
});
