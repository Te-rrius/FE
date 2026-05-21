import { hp, wp } from '@/utils/dimension';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import LocationIcon from '@/assets/images/replay/locationIcon.svg';

interface Court {
  courtId: number;
  name: string;
}

interface CourtSelectorProps {
  courtList?: Court[];
  selectedCourtId?: number | null;
  onPress?: (courtId: number) => void;
}

const CourtSelector = ({ courtList = [], selectedCourtId, onPress }: CourtSelectorProps) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.titleRow}>
        <LocationIcon />
        <Text style={styles.titleText}>구역명</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.row}>
          {courtList.map((court) => (
            <Pressable
              key={court.courtId}
              style={[styles.locationCard, selectedCourtId === court.courtId && styles.locationCardActive]}
              onPress={() => onPress?.(court.courtId)}
            >
              <Text style={[styles.courtName, selectedCourtId === court.courtId && styles.courtNameActive]}>
                {court.name}
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

  courtName: {
    color: '#767676',
    fontSize: wp(14),
    fontFamily: 'Pretendard500',
    lineHeight: hp(20),
    letterSpacing: wp(-0.35),
  },

  locationCardActive: {
    borderColor: '#4048F7',
  },

  courtNameActive: {
    color: '#212121',
  },
});
