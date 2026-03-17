import Header from '@/components/layout/Header';
import { hp, wp } from '@/utils/dimension';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useState } from 'react';

import MainBanner from '@/assets/images/banner/mainBanner.svg';

const tabs = [
  { key: 'GENERAL', label: '구장' },
  { key: 'ACADEMY', label: '아카데미' },
  { key: 'PRO', label: '프로구장' },
];

const MainScreen = () => {
  const [activeTab, setActiveTab] = useState('GENERAL');

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
      <View style={styles.navLine} />

      <View style={styles.contentWrapper}>
        <MainBanner />
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

  navLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#E8E8E8',
  },

  contentWrapper: {
    alignItems: 'center',
    paddingTop: hp(16),
    paddingHorizontal: wp(20),
    gap: hp(20),
  },
});
