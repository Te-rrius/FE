import { Pressable, StyleSheet, Text, View } from 'react-native';
import Checkbox from '@/components/common/Checkbox';
import GrayArrowIcon from '@/assets/images/common/grayArrowIcon.svg';
import { hp, wp } from '@/utils/dimension';

interface SettingOptionProps {
  content: string;
  isCheckbox?: boolean;
  onClickHandler?: () => void;
  isChecked?: boolean;
  onToggleCheckHandler?: () => void;
}

const SettingOption = ({
  content,
  isCheckbox,
  onClickHandler,
  isChecked,
  onToggleCheckHandler,
}: SettingOptionProps) => {
  return (
    <View style={styles.container}>
      {isCheckbox && <Checkbox isChecked={isChecked} onToggleCheckHandler={onToggleCheckHandler} />}
      <Pressable style={styles.layout} onPress={onClickHandler}>
        <Text style={isCheckbox ? styles.checkboxText : styles.defaultText}>{content}</Text>
        <GrayArrowIcon />
      </Pressable>
    </View>
  );
};

export default SettingOption;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(8),
    paddingVertical: hp(16),
  },

  layout: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  checkboxText: {
    color: '#212121',
    fontFamily: 'Pretendard500',
    fontSize: wp(16),
    lineHeight: hp(24),
    letterSpacing: wp(-0.4),
  },

  defaultText: {
    color: '#212121',
    fontFamily: 'Pretendard500',
    fontSize: wp(18),
    lineHeight: hp(28),
    letterSpacing: wp(-0.45),
  },
});
