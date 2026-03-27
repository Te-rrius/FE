import { hp, wp } from '@/utils/dimension';
import { StyleSheet, View } from 'react-native';

export interface ChildrenProps {
  children: React.ReactNode;
}

const SettingOptionContainer = ({ children }: ChildrenProps) => {
  return <View style={styles.container}>{children}</View>;
};

export default SettingOptionContainer;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(20),
    gap: hp(8),
  },
});
