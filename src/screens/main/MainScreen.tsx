import Header from '@/components/layout/Header';
import { hp, wp } from '@/utils/dimension';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useState } from 'react';

import MainBanner from '@/assets/images/banner/mainBanner.svg';
import Divider from '@/components/common/Divider';
import SearchBar from '@/components/common/SearchBar';
import Dropdown from '@/components/common/Dropdown';
import { cityList, regionList } from '@/constants/dropdownList';

const tabs = [
  { key: 'GENERAL', label: '구장' },
  { key: 'ACADEMY', label: '아카데미' },
  { key: 'PRO', label: '프로구장' },
];

const MainScreen = () => {
  const [activeTab, setActiveTab] = useState('GENERAL');
  const [searchValue, setSearchValue] = useState('');
  const [cityDropdownOpen, setCityDropdownOpen] = useState<boolean>(false);
  const [regionDropdownOpen, setRegionDropdownOpen] = useState<boolean>(false);
  const [selectedCityDropdown, setSelectedCityDropdown] = useState<string>('도시');
  const [selectedRegionDropdown, setSelectedRegionDropdown] = useState<string>('지역');

  return (
    <>
      <Header />

      <View style={styles.navContainer}>
        {tabs.map((tab) => (
          <Pressable key={tab.key} style={styles.navBox} onPress={() => setActiveTab(tab.key)}>
            <Text style={[styles.navText, activeTab === tab.key && styles.activeText]}>
              {tab.label}
            </Text>

            {activeTab === tab.key && <View style={styles.boxLine} />}
          </Pressable>
        ))}
      </View>
      <Divider />

      <View style={styles.contentWrapper}>
        <MainBanner />

        <View style={styles.searchWrapper}>
          <SearchBar value={searchValue} onChangeText={setSearchValue} />

          <View style={styles.placeWrapper}>
            <Dropdown
              selectedText={selectedCityDropdown}
              dropdownList={['전체 보기', ...cityList]}
              isDropdownOpen={cityDropdownOpen}
              setIsDropdownOpen={setCityDropdownOpen}
              selectDropdownHandler={(option) => {
                setSelectedCityDropdown(option === '전체 보기' ? '도시' : option);
                setCityDropdownOpen(false);
                setSelectedRegionDropdown('지역');
                setSearchValue('');
              }}
            />
            <Dropdown
              selectedText={selectedRegionDropdown}
              dropdownList={selectedCityDropdown ? regionList[selectedCityDropdown] : []}
              isDropdownOpen={regionDropdownOpen}
              setIsDropdownOpen={setRegionDropdownOpen}
              selectDropdownHandler={(option) => {
                setSelectedRegionDropdown(option);
                setRegionDropdownOpen(false);
                setSearchValue('');
              }}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    paddingHorizontal: wp(20),
    paddingTop: hp(12),
    gap: wp(18),
  },

  navBox: {
    gap: hp(4),
  },

  navText: {
    fontFamily: 'KBLJump-B',
    fontSize: 20,
    color: '#999999',
  },

  activeText: {
    color: '#212121',
  },

  boxLine: {
    width: '100%',
    height: 2,
    backgroundColor: '#212121',
  },

  contentWrapper: {
    alignItems: 'center',
    paddingTop: hp(16),
    paddingHorizontal: wp(20),
    gap: hp(20),
  },

  searchWrapper: {
    gap: hp(9),
  },

  placeWrapper: {
    flexDirection: 'row',
    gap: wp(8),
  },
});
