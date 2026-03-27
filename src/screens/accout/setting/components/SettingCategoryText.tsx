import { hp, wp } from '@/utils/dimension';
import { Text, StyleSheet } from 'react-native';

interface SettingCategoryTextProps {
  title: string;
}

const SettingCategoryText = ({ title }: SettingCategoryTextProps) => {
  return <Text style={styles.titleText}>{title}</Text>;
};

export default SettingCategoryText;

const styles = StyleSheet.create({
  titleText: {
    color: '#767676',
    fontFamily: 'Pretendard600',
    fontSize: wp(13),
    lineHeight: hp(18),
    letterSpacing: wp(-0.325),
  },
});
