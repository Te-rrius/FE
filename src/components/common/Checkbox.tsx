import { Pressable } from 'react-native';
import InactiveCheckboxIcon from '@/assets/images/common/inactiveCheckboxIcon.svg';
import ActiveCheckboxIcon from '@/assets/images/common/activeCheckboxIcon.svg';

interface CheckboxProps {
  isChecked?: boolean;
  onToggleCheckHandler?: () => void;
}

const Checkbox = ({ isChecked, onToggleCheckHandler }: CheckboxProps) => {
  return (
    <Pressable onPress={onToggleCheckHandler}>
      {isChecked ? <ActiveCheckboxIcon /> : <InactiveCheckboxIcon />}
    </Pressable>
  );
};

export default Checkbox;
