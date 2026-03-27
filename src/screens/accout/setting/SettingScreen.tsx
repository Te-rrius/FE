import PageHeader from '@/components/layout/PageHeader';
import SettingOptionContainer from '@/screens/accout/setting/components/SettingOptionContainer';
import SettingCategoryText from '@/screens/accout/setting/components/SettingCategoryText';
import SettingOption from '@/screens/accout/setting/components/SettingOption';
import Divider from '@/components/common/Divider';
import { StyleSheet, View } from 'react-native';
import { hp } from '@/utils/dimension';
import { router } from 'expo-router';

const SettingScreen = () => {
  return (
    <>
      <PageHeader title="설정" />

      <View style={styles.optionContainer}>
        <SettingOptionContainer>
          <SettingCategoryText title="약관 및 정책" />
          <SettingOption content="서비스 이용 동의" onClickHandler={() => router.push('/terms')} />
        </SettingOptionContainer>
        <Divider />
        <SettingOptionContainer>
          <SettingCategoryText title="서비스 이용" />
          <SettingOption content="로그아웃" />
        </SettingOptionContainer>
      </View>
    </>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  optionContainer: {
    gap: hp(24),
  },
});
