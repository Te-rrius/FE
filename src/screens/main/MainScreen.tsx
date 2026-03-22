import Header from '@/components/layout/Header';
import { hp, wp } from '@/utils/dimension';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { useState } from 'react';

import MainBanner from '@/assets/images/banner/mainBanner.svg';
import Divider from '@/components/common/Divider';
import SearchBar from '@/components/common/SearchBar';
import Dropdown from '@/components/common/Dropdown';
import CourtList from './components/CourtList';
import { DUMMY_COURTS } from '@/constants/dummyCourt';

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
  const [city, setCity] = useState('도시');
  const [region, setRegion] = useState('지역');

  const switchTab = (key: string) => {
    setActiveTab(key);
    setSearchValue('');
    setCity('도시');
    setRegion('지역');
    setCityDropdownOpen(false);
    setRegionDropdownOpen(false);
  };

  const filteredType = DUMMY_COURTS.filter((court) => court.type === activeTab);

  const cityDropdownList = [
    '전체 보기',
    ...new Set(filteredType.map((court) => court.location.split(' ')[0])),
  ];

  const regionDropdownList = filteredType.reduce<Record<string, string[]>>((acc, court) => {
    const parts = court.location.split(' ');
    const city = parts[0];
    const region = parts[1];
    if (!acc[city]) acc[city] = [];
    if (!acc[city].includes(region)) acc[city].push(region);
    return acc;
  }, {});

  return (
    <>
      <Header />

      <View style={styles.navContainer}>
        {tabs.map((tab) => (
          <Pressable key={tab.key} style={styles.navBox} onPress={() => switchTab(tab.key)}>
            <Text style={[styles.navText, activeTab === tab.key && styles.activeText]}>
              {tab.label}
            </Text>

            {activeTab === tab.key && <View style={styles.boxLine} />}
          </Pressable>
        ))}
      </View>
      <Divider />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.contentWrapper}>
          <MainBanner />

          <View style={styles.searchWrapper}>
            <SearchBar value={searchValue} onChangeText={setSearchValue} />

            <View style={styles.placeWrapper}>
              <Dropdown
                selectedText={city}
                dropdownList={cityDropdownList}
                isDropdownOpen={cityDropdownOpen}
                setIsDropdownOpen={setCityDropdownOpen}
                selectDropdownHandler={(option) => {
                  setCity(option === '전체 보기' ? '도시' : option);
                  setCityDropdownOpen(false);
                  setRegion('지역');
                  setSearchValue('');
                }}
              />
              <Dropdown
                selectedText={region}
                dropdownList={regionDropdownList[city] ?? []}
                isDropdownOpen={regionDropdownOpen}
                setIsDropdownOpen={setRegionDropdownOpen}
                selectDropdownHandler={(option) => {
                  setRegion(option);
                  setRegionDropdownOpen(false);
                }}
                disabled={city === '도시'}
              />
            </View>

            <View style={styles.courtListWrapper}>
              <CourtList
                courtList={filteredType}
                searchValue={searchValue}
                selectedCity={city}
                selectedRegion={region}
              />
            </View>
          </View>
        </View>
      </ScrollView>
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

  scrollContent: {
    paddingBottom: hp(100),
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

  courtListWrapper: {
    paddingTop: hp(11),
    gap: hp(4),
  },
});
