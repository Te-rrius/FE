import Header from '@/components/layout/Header';
import { hp, wp } from '@/utils/dimension';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { useState } from 'react';

import MainBanner from '@/assets/images/banner/mainBanner.svg';
import Divider from '@/components/common/Divider';
import SearchBar from '@/components/common/SearchBar';
import Dropdown from '@/components/common/Dropdown';
import useBannerSize from '@/utils/bannerSize';
import StadiumList from './components/CourtList';
import { useStadiumsQuery } from './services/useStadiumsQuery';

const tabs = [
  { key: 'GENERAL', label: '구장' },
  { key: 'ACADEMY', label: '아카데미' },
  { key: 'PRO', label: '프로구장' },
];

const MainScreen = () => {
  const [activeTab, setActiveTab] = useState('GENERAL');
  const [searchValue, setSearchValue] = useState('');
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [regionDropdownOpen, setRegionDropdownOpen] = useState(false);
  const [province, setProvince] = useState('도시');
  const [city, setCity] = useState('지역');

  const bannerSize = useBannerSize(350, 160);

  // '도시'/'지역' 기본값이면 파라미터 미전달
  const { data: stadiums = [] } = useStadiumsQuery({
    province: province !== '도시' ? province : undefined,
    city: city !== '지역' ? city : undefined,
    name: searchValue || undefined,
  });

  const switchTab = (key: string) => {
    setActiveTab(key);
    setSearchValue('');
    setProvince('도시');
    setCity('지역');
    setCityDropdownOpen(false);
    setRegionDropdownOpen(false);
  };

  // 도시 선택
  const selectProvince = (option: string) => {
    if (option === '전체 보기') {
      setProvince('도시');
    } else {
      setProvince(option);
    }
    setCity('지역');
    setCityDropdownOpen(false);
  };

  // 지역 선택
  const selectCity = (option: string) => {
    if (province === '도시') return;
    setCity(option);
    setRegionDropdownOpen(false);
  };

  const provinceDropdownList = ['전체 보기', ...new Set(stadiums.map((s) => s.province))];

  const cityDropdownList = stadiums
    .filter((s) => s.province === province)
    .reduce<string[]>((acc, s) => {
      if (!acc.includes(s.city)) acc.push(s.city);
      return acc;
    }, []);
  return (
    <>
      <Header />

      <View style={styles.navContainer}>
        {tabs.map((tab) => (
          <Pressable key={tab.key} style={styles.navBox} onPress={() => switchTab(tab.key)}>
            <Text style={[styles.navText, activeTab === tab.key && styles.activeText]}>{tab.label}</Text>

            {activeTab === tab.key && <View style={styles.boxLine} />}
          </Pressable>
        ))}
      </View>
      <Divider />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.contentWrapper}>
          <MainBanner width={bannerSize.width} height={bannerSize.height} />
          <View style={styles.searchWrapper}>
            <SearchBar value={searchValue} onChangeText={setSearchValue} />

            <View style={styles.placeWrapper}>
              <Dropdown
                selectedText={province}
                dropdownList={provinceDropdownList}
                isDropdownOpen={cityDropdownOpen}
                setIsDropdownOpen={setCityDropdownOpen}
                selectDropdownHandler={selectProvince}
              />
              <Dropdown
                selectedText={city}
                dropdownList={cityDropdownList}
                isDropdownOpen={regionDropdownOpen}
                setIsDropdownOpen={setRegionDropdownOpen}
                selectDropdownHandler={selectCity}
                disabled={province === '도시'}
              />
            </View>

            <View style={styles.stadiumListWrapper}>
              <StadiumList stadiumList={stadiums} />
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
    fontSize: wp(20),
    color: '#999999',
    lineHeight: hp(28),
    letterSpacing: -0.5,
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

  stadiumListWrapper: {
    paddingTop: hp(11),
    gap: hp(4),
  },
});
