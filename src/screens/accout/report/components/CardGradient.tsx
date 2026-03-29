import { hp, wp } from '@/utils/dimension';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

type CardGradientProps = {
  width?: number;
};

const CardGradient = ({ width }: CardGradientProps) => {
  return (
    <LinearGradient
      colors={['#E8E8E8', '#FAFAFA']}
      locations={[0.3, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[styles.container, width ? { width } : { width: wp(85) }]}
    />
  );
};

export default CardGradient;

const styles = StyleSheet.create({
  container: {
    height: hp(4),
    borderRadius: 2,
  },
});
