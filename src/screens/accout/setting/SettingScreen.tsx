import PageHeader from '@/components/layout/PageHeader';
import SettingOptionContainer from '@/screens/accout/setting/components/SettingOptionContainer';
import SettingCategoryText from '@/screens/accout/setting/components/SettingCategoryText';
import SettingOption from '@/screens/accout/setting/components/SettingOption';
import Divider from '@/components/common/Divider';
import { StyleSheet, View } from 'react-native';
import { hp } from '@/utils/dimension';

const SettingScreen = () => {
  return (
    <>
      <PageHeader title="설정" />

      <View style={styles.optionContainer}>
        <SettingOptionContainer>
          <SettingCategoryText title="약관 및 정책" />
          <SettingOption content="스캡쳐 이용약관" />
        </SettingOptionContainer>
        <Divider />
        <SettingOptionContainer>
          <SettingCategoryText title="개인정보 수집 및 마케팅 동의" />
          <SettingOption content="(선택) 개인 정보 수집 및 이용 동의" isCheckbox={true} />
          <SettingOption content="(선택) 마케팅 정보 수집 동의" isCheckbox={true} />
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
