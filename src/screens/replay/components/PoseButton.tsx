import { hp, wp } from '@/utils/dimension';
import { Pressable, StyleSheet, Text } from 'react-native';

interface PoseButtonProps {
  text: string;
  selected?: boolean;
  onPress?: () => void;
}

const PoseButton = ({ text, selected = false, onPress }: PoseButtonProps) => {
  return (
    <Pressable style={[styles.container, selected && styles.containerSelected]} onPress={onPress}>
      <Text style={[styles.buttonText, selected && styles.buttonTextSelected]}>{text}</Text>
    </Pressable>
  );
};

export default PoseButton;

const styles = StyleSheet.create({
  container: {
    width: wp(81.5),
    height: hp(42),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
  },

  containerSelected: {
    backgroundColor: '#2962FF',
  },

  buttonText: {
    color: '#767676',
    fontSize: wp(14),
    fontFamily: 'Pretendard500',
    lineHeight: hp(20),
    letterSpacing: wp(-0.35),
  },

  buttonTextSelected: {
    color: '#FFFFFF',
  },
});
