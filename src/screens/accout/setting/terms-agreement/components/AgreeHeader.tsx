import { hp, wp } from '@/utils/dimension';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import CloseIcon from '@/assets/images/header/closeIcon.svg';
import { router } from 'expo-router';
import Divider from '@/components/common/Divider';

type AgreeHeaderProps = {
  title?: string;
};

const AgreeHeader = ({ title }: AgreeHeaderProps) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.titleText}>{title}</Text>
        <Pressable onPress={() => router.back()}>
          <CloseIcon />
        </Pressable>
      </View>
      <Divider />
    </>
  );
};

export default AgreeHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(20),
    paddingVertical: hp(14),
  },

  titleText: {
    color: '#111111',
    fontFamily: 'Pretendard600',
    fontSize: wp(20),
    lineHeight: hp(28),
    letterSpacing: wp(-0.5),
  },
});
