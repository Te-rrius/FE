import PageHeader from '@/components/layout/PageHeader';
import SettingOptionContainer from '@/screens/accout/setting/components/SettingOptionContainer';
import SettingCategoryText from '@/screens/accout/setting/components/SettingCategoryText';
import SettingOption from '@/screens/accout/setting/components/SettingOption';
import Divider from '@/components/common/Divider';
import { StyleSheet, View } from 'react-native';
import { hp } from '@/utils/dimension';
import { useState } from 'react';
import { router } from 'expo-router';

const TermAgreeScreen = () => {
  const [isPersonalInfoAgreed, setIsPersonalInfoAgreed] = useState(false);
  const [isMarketingAgreed, setIsMarketingAgreed] = useState(false);

  return (
    <>
      <PageHeader title="서비스 이용 동의" />

      <View style={styles.optionContainer}>
        <SettingOptionContainer>
          <SettingCategoryText title="약관 및 정책" />
          <SettingOption content="스캡쳐 이용 약관" />
        </SettingOptionContainer>
        <Divider />
        <SettingOptionContainer>
          <SettingCategoryText title="개인정보 수집 및 마케팅 동의" />
          <SettingOption
            content="(선택) 개인 정보 수집 및 이용 동의"
            isCheckbox={true}
            isChecked={isPersonalInfoAgreed}
            onToggleCheckHandler={() => setIsPersonalInfoAgreed((prev) => !prev)}
            onClickHandler={() => router.push('/privacyDetail')}
          />
          <SettingOption
            content="(선택) 마케팅 정보 수집 동의"
            isCheckbox={true}
            isChecked={isMarketingAgreed}
            onToggleCheckHandler={() => setIsMarketingAgreed((prev) => !prev)}
            onClickHandler={() => router.push('/marketingDetail')}
          />
        </SettingOptionContainer>
      </View>
    </>
  );
};

export default TermAgreeScreen;

const styles = StyleSheet.create({
  optionContainer: {
    gap: hp(24),
  },
});
