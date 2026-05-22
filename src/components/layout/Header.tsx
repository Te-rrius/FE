import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import MainLogoIcon from '@/assets/images/mainLogoIcon.svg';
import TennisIcon from '@/assets/images/header/tennisIcon.svg';
import AuthIcon from '@/assets/images/header/authIcon.svg';
import { hp, wp } from '@/utils/dimension';
import useAuthStore from '@/stores/authStore';
import { router } from 'expo-router';
import { useUserQuery } from '@/screens/accout/services/useUserQuery';

const Header = () => {
  const { openLoginModal, token } = useAuthStore();
  const isLogin = !!token;
  const { data: user } = useUserQuery();

  return (
    <View style={styles.container}>
      <Pressable style={styles.logo} onPress={() => router.replace('/')}>
        <MainLogoIcon />
        <View style={styles.tennis}>
          <TennisIcon />
          <Text style={styles.tennisText}>테니스</Text>
        </View>
      </Pressable>

      {isLogin ? (
        <Pressable onPress={() => router.push('/account')}>
          {user?.profileImageUrl ? (
            <Image source={{ uri: user.profileImageUrl.replace('http://', 'https://') }} style={styles.profileIcon} />
          ) : (
            <AuthIcon />
          )}
        </Pressable>
      ) : (
        <Pressable style={styles.authButton} onPress={() => openLoginModal()}>
          <Text style={styles.authText}>로그인 / 회원가입</Text>
        </Pressable>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(20),
    paddingVertical: hp(12),
  },

  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(12),
  },

  tennis: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2BAE66',
    borderRadius: 4,
    paddingHorizontal: wp(6),
    paddingVertical: hp(4),
    gap: wp(6),
  },

  tennisText: {
    color: '#FCF6F5',
    fontFamily: 'Pretendard700',
    fontSize: wp(14),
    lineHeight: hp(20),
    letterSpacing: -0.35,
  },

  profileIcon: {
    width: wp(32),
    height: wp(32),
    borderRadius: 100,
  },

  authButton: {
    backgroundColor: '#F5F5F5',
    borderColor: '#E8E8E8',
    borderWidth: 1,
    paddingHorizontal: wp(14),
    paddingVertical: hp(6),
  },

  authText: {
    color: '#303030',
    fontSize: wp(14),
    fontFamily: 'Pretendard600',
    lineHeight: hp(20),
    letterSpacing: -0.35,
  },
});
