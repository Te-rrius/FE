import { hp, wp } from '@/utils/dimension';
import { StyleSheet, Text, View } from 'react-native';

interface ReportTitleProps {
  icon: React.ReactNode;
  title: string;
}

const ReportTitle = ({ title, icon }: ReportTitleProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
};

export default ReportTitle;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(16),
    paddingVertical: hp(14),
    gap: wp(10),
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 20,
  },

  iconContainer: {
    backgroundColor: '#4E4E4E',
    width: wp(44),
    height: hp(44),
    borderRadius: 110,
    justifyContent: 'center',
    alignItems: 'center',
  },

  titleText: {
    color: '#212121',
    fontFamily: 'Pretendard600',
    fontSize: wp(16),
    lineHeight: hp(22),
    letterSpacing: wp(-0.4),
  },
});
