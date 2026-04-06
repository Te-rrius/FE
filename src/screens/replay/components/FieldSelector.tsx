import { CourtSelectorDto } from '@/constants/reportTimeSchedule';
import { hp, wp } from '@/utils/dimension';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

interface CourtSelectorProps {
  courtList?: CourtSelectorDto[];
  selectedFieldId?: number | null;
  onPress?: (courtId: number) => void;
}

const FieldSelector = ({ courtList = [], selectedFieldId, onPress }: CourtSelectorProps) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.row}>
        {courtList.map((court) => (
          <Pressable
            key={court.courtId}
            style={[styles.locationcard, selectedFieldId === court.courtId && styles.locationcardActive]}
            onPress={() => onPress?.(court.courtId)}
          >
            <Text style={[styles.courtName, selectedFieldId === court.courtId && styles.courtNameActive]}>
              {court.name}
            </Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

export default FieldSelector;

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

  courtName: {
    color: '#767676',
    fontSize: wp(14),
    fontFamily: 'Pretendard500',
    lineHeight: hp(20),
    letterSpacing: wp(-0.35),
  },

  locationcardActive: {
    borderColor: '#4048F7',
  },

  courtNameActive: {
    color: '#212121',
  },
});
