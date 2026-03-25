import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { hp, wp } from '@/utils/dimension';

import BackIcon from '@/assets/images/common/backIcon.svg';

type PageHeaderProps = {
  title?: string;
  rightContent?: React.ReactNode;
};

const PageHeader = ({ title, rightContent }: PageHeaderProps) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()}>
        <BackIcon />
      </Pressable>
      <View>{title && <Text style={styles.titleText}>{title}</Text>}</View>
      {rightContent ? <View>{rightContent}</View> : <View style={styles.fakeRight} />}
    </View>
  );
};

export default PageHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp(14),
    paddingHorizontal: wp(20),
  },

  titleText: {
    fontSize: wp(20),
    fontFamily: 'Pretendard600',
    lineHeight: hp(28),
    letterSpacing: wp(-0.5),
  },

  centerArea: {},

  fakeRight: {
    width: wp(24),
  },
});
