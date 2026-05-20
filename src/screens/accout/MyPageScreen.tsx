import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { hp, wp } from '@/utils/dimension';
import PageHeader from '@/components/layout/PageHeader';
import { useUserQuery } from './services/useUserQuery';

import SettingIcon from '@/assets/images/header/settingIcon.svg';
import ReportIcon from '@/assets/images/account/reportIcon.svg';

const MyPageScreen = () => {
  const { data: user } = useUserQuery();

  return (
    <>
      <PageHeader title="내 정보" rightContent={<SettingIcon />} onRightPress={() => router.push('/account/setting')} />
      {user && (
        <>
          <View style={styles.profileContainer}>
            <View style={styles.userInfo}>
              {/* <Image source={{ uri: user.profileImageUrl }} style={styles.profileIcon} /> 빌드 시 교체 */}
              <Image source={{ uri: user.profileImageUrl.replace('http://', 'https://') }} style={styles.profileIcon} />
              <Text style={styles.nameText}>{user.nickname}</Text>
            </View>
            <View style={styles.userTag}>
              <Text style={styles.tagText}>{user.userGrade}</Text>
            </View>
          </View>
          <View style={styles.menuContainer}>
            <Text style={styles.nameText}>내 활동</Text>
            <Pressable style={styles.reportSection} onPress={() => router.push('/account/myreport')}>
              <ReportIcon />
              <Text style={styles.reportText}>내 리포트</Text>
            </Pressable>
          </View>
        </>
      )}
    </>
  );
};

export default MyPageScreen;

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(20),
    paddingVertical: hp(20),
    gap: wp(6),
  },

  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(12),
  },

  profileIcon: {
    width: wp(66),
    height: hp(66),
    borderRadius: 100,
  },

  nameText: {
    fontSize: wp(20),
    fontFamily: 'Pretendard600',
    lineHeight: hp(28),
    letterSpacing: wp(-0.5),
    color: '#171717',
  },

  userTag: {
    backgroundColor: '#EDEEEF',
    paddingHorizontal: wp(6),
    paddingVertical: hp(4),
    borderRadius: 4,
  },

  tagText: {
    fontSize: wp(10),
    fontFamily: 'Pretendard600',
    lineHeight: hp(14),
    letterSpacing: wp(-0.25),
    color: '#171717',
  },

  menuContainer: {
    paddingTop: hp(20),
    paddingHorizontal: wp(20),
    gap: hp(20),
  },

  reportSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(6),
  },

  reportText: {
    fontSize: wp(18),
    fontFamily: 'Pretendard500',
    lineHeight: hp(28),
    letterSpacing: wp(-0.45),
    color: '#212121',
  },
});
