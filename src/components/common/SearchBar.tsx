import { hp, wp } from '@/utils/dimension';
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import SearchIcon from '@/assets/images/common/searchIcon.svg';
import SearchingIcon from '@/assets/images/common/searchingIcon.svg';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

const SearchBar = ({ value, onChangeText }: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    onChangeText('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="구장명을 검색해 보세요"
        placeholderTextColor="#999999"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={styles.textInput}
      />
      <Pressable onPress={isFocused ? handleClear : undefined}>
        {isFocused ? <SearchingIcon /> : <SearchIcon />}
      </Pressable>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    paddingVertical: hp(14),
    paddingHorizontal: wp(20),
    gap: wp(6),
  },

  textInput: {
    flex: 1,
    fontSize: wp(14),
  },
});
