import { hp, wp } from '@/utils/dimension';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type ButtonProps = {
  text: string;
  onPress?: () => void;
  disabled?: boolean;
};

const Button = ({ text, onPress, disabled }: ButtonProps) => {
  return (
    <View style={styles.buttonWrapper}>
      <Pressable style={styles.container} disabled={disabled} onPress={onPress}>
        <Text style={styles.buttonText}>{text}</Text>
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonWrapper: {
    paddingHorizontal: wp(20),
    paddingVertical: hp(20),
  },

  container: {
    width: '100%',
    paddingVertical: hp(16),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4048F7',
    borderRadius: 6,
  },

  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'Pretendard600',
    fontSize: wp(16),
    lineHeight: hp(24),
  },
});
