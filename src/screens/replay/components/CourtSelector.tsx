import { StadiumSelectorDto } from '@/constants/reportTimeSchedule';
import { hp, wp } from '@/utils/dimension';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import LocationIcon from '@/assets/images/replay/locationIcon.svg';

interface CourtSelectorProps {
  stadiumList?: StadiumSelectorDto[];
  selectedCourtId?: number | null;
  onPress?: (stadiumId: number) => void;
}

const CourtSelector = ({ stadiumList = [], selectedCourtId, onPress }: CourtSelectorProps) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.titleRow}>
        <LocationIcon />
        <Text style={styles.titleText}>구역명</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.row}>
          {stadiumList.map((stadium) => (
            <Pressable
              key={stadium.stadiumId}
              style={[styles.locationCard, selectedCourtId === stadium.stadiumId && styles.locationCardActive]}
              onPress={() => onPress?.(stadium.stadiumId)}
            >
              <Text style={[styles.stadiumName, selectedCourtId === stadium.stadiumId && styles.stadiumNameActive]}>
                {stadium.name}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default CourtSelector;

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

  locationCard: {
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

  locationCardActive: {
    borderColor: '#4048F7',
  },

  stadiumNameActive: {
    color: '#212121',
  },
});
