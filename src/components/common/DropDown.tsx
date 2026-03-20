import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import DropdownIcon from '@/assets/images/common/dropdownIcon.svg';
import DropupIcon from '@/assets/images/common/dropupIcon.svg';
import { hp, wp } from '@/utils/dimension';

interface DropdownProps {
  selectedText: string;
  dropdownList: string[];
  isDropdownOpen: boolean;
  setIsDropdownOpen: (value: boolean) => void;
  selectDropdownHandler: (option: string) => void;
  disabled?: boolean;
}

const Dropdown = ({
  selectedText,
  dropdownList,
  isDropdownOpen,
  setIsDropdownOpen,
  selectDropdownHandler,
  disabled,
}: DropdownProps) => {
  const toggleDropdownHandler = () => {
    if (disabled) {
      return;
    }
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <View style={styles.wrapper}>
      <Pressable style={styles.container} onPress={toggleDropdownHandler}>
        <Text style={styles.dropdownText}>{selectedText}</Text>

        {isDropdownOpen ? <DropupIcon /> : <DropdownIcon />}
      </Pressable>

      {isDropdownOpen && (
        <ScrollView style={styles.optionList}>
          {dropdownList.map((option) => (
            <Pressable
              key={option}
              style={styles.optionItem}
              onPress={() => selectDropdownHandler(option)}
            >
              <Text>{option}</Text>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    zIndex: 1,
  },

  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: wp(12),
    paddingRight: wp(10),
    paddingVertical: hp(10),
    borderWidth: 1,
    borderColor: '#E8E8E8',
    backgroundColor: '#FFFFFF',
  },

  optionList: {
    position: 'absolute',
    top: '120%',
    left: 0,
    right: 0,
    maxHeight: hp(200),
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    zIndex: 999,
  },

  optionItem: {
    paddingVertical: hp(10),
    paddingHorizontal: wp(12),
  },

  dropdownText: {
    fontFamily: 'Pretendard600',
  },
});
