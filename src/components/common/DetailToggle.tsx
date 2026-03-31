import { hp, wp } from '@/utils/dimension';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import DetailToggleArrowIcon from '@/assets/images/common/detailToggleArrowIcon.svg';
import { useState } from 'react';

type DetailToggleProps = {
  title: string;
  children?: React.ReactNode;
};

const DetailToggle = ({ title, children }: DetailToggleProps) => {
  const [detailInfoOpen, setDetailInfoOpen] = useState(false);

  return (
    <>
      <View style={styles.toggleRow}>
        <Text style={styles.toggleLabel}>
          {title}
          <Text style={styles.highlightLabel}> Tip!</Text>
        </Text>
        <Pressable onPress={() => setDetailInfoOpen((prev) => !prev)}>
          <DetailToggleArrowIcon style={{ transform: [{ rotate: detailInfoOpen ? '180deg' : '0deg' }] }} />
        </Pressable>
      </View>
      {detailInfoOpen && children}
    </>
  );
};

export default DetailToggle;

const styles = StyleSheet.create({
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(13),
    paddingHorizontal: wp(20),
  },

  toggleLabel: {
    color: '#5C5C5C',
    fontFamily: 'Pretendard600',
    fontSize: wp(16),
    lineHeight: hp(24),
    letterSpacing: wp(-0.4),
  },

  highlightLabel: {
    color: '#4048F7',
  },
});
