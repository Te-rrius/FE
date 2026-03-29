import { Pressable, StyleSheet, Text, View } from 'react-native';
import GrayArrowIcon from '@/assets/images/common/grayArrowIcon.svg';
import { hp, wp } from '@/utils/dimension';
import Check from './Check';

interface AgreeModalOptionProps {
  content: string;
  isCheck?: boolean;
  onClickHandler?: () => void;
  isChecked?: boolean;
  onToggleCheckHandler?: () => void;
}

const AgreeModalOption = ({ content, onClickHandler, isChecked, onToggleCheckHandler }: AgreeModalOptionProps) => {
  return (
    <View style={styles.container}>
      <Check isChecked={isChecked} onToggleCheckHandler={onToggleCheckHandler} />
      <Pressable style={styles.layout} onPress={onClickHandler}>
        <Text style={styles.checkText}>{content}</Text>
        <GrayArrowIcon />
      </Pressable>
    </View>
  );
};

export default AgreeModalOption;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(16),
    paddingVertical: hp(14),
  },

  layout: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  checkText: {
    color: '#505050',
    fontFamily: 'Pretendard400',
    fontSize: wp(14),
    lineHeight: hp(20),
    letterSpacing: wp(-0.35),
  },
});
