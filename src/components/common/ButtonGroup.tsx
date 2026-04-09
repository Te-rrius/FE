import { Pressable, StyleSheet, Text, View } from 'react-native';
import { hp, wp } from '@/utils/dimension';

interface ButtonGroupProps {
  leftText: string;
  rightText: string;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  leftWidth?: number;
  rightWidth?: number;
}

const ButtonGroup = ({ leftText, rightText, onLeftPress, onRightPress, leftWidth, rightWidth }: ButtonGroupProps) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.button, styles.leftButton, { width: leftWidth, flex: leftWidth ? undefined : 1 }]}
        onPress={onLeftPress}
      >
        <Text style={[styles.buttonText, styles.leftButtonText]}>{leftText}</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.rightButton, { width: rightWidth, flex: rightWidth ? undefined : 1 }]}
        onPress={onRightPress}
      >
        <Text style={[styles.buttonText, styles.rightButtonText]}>{rightText}</Text>
      </Pressable>
    </View>
  );
};

export default ButtonGroup;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: wp(8),
  },

  button: {
    borderRadius: 8,
    paddingVertical: hp(12),
    alignItems: 'center',
    justifyContent: 'center',
  },

  leftButton: {
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },

  rightButton: {
    backgroundColor: '#4048F7',
  },

  buttonText: {
    fontFamily: 'Pretendard600',
    fontSize: wp(16),
    lineHeight: hp(24),
    letterSpacing: wp(-0.4),
  },

  leftButtonText: {
    color: '#303030',
  },

  rightButtonText: {
    color: '#FFFFFF',
  },
});
