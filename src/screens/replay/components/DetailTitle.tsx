import { hp, wp } from '@/utils/dimension';
import { StyleSheet, Text, View } from 'react-native';
import { SvgProps } from 'react-native-svg';

type DetailTitleProps = {
  icon: React.ComponentType<SvgProps>;
  title: string;
};

const DetailTitle = ({ icon: Icon, title }: DetailTitleProps) => {
  return (
    <View style={styles.container}>
      <Icon />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default DetailTitle;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(6),
  },

  title: {
    color: '#5C5C5C',
    fontFamily: 'Pretendard600',
    fontSize: wp(14),
    lineHeight: hp(20),
    letterSpacing: wp(-0.35),
  },
});
