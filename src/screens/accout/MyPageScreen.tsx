import { StyleSheet } from 'react-native';

import SettingIcon from '@/assets/images/header/settingIcon.svg';
import PageHeader from '@/components/layout/PageHeader';

const MyPageScreen = () => {
  return (
    <>
      <PageHeader title="내 정보" rightContent={<SettingIcon />} />
    </>
  );
};

export default MyPageScreen;

const styles = StyleSheet.create({});
