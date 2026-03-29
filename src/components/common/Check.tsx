import { Pressable } from 'react-native';
import InactiveCheckIcon from '@/assets/images/modal/inactiveCheckIcon.svg';
import ActiveCheckIcon from '@/assets/images/modal/activeCheckIcon.svg';

interface CheckProps {
  isChecked?: boolean;
  onToggleCheckHandler?: () => void;
}

const Check = ({ isChecked, onToggleCheckHandler }: CheckProps) => {
  return (
    <Pressable onPress={onToggleCheckHandler}>{isChecked ? <ActiveCheckIcon /> : <InactiveCheckIcon />}</Pressable>
  );
};

export default Check;
