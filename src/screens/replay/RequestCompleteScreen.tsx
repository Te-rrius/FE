import Header from '@/components/layout/Header';
import ButtonGroup from '@/components/common/ButtonGroup';
import { StyleSheet, Text, View } from 'react-native';

import CompleteIcon from '@/assets/images/replay/completeIcon.svg';
import { hp, wp } from '@/utils/dimension';
import { router } from 'expo-router';

const RequestCompleteScreen = () => {
  return (
    <>
      <Header />
      <View style={styles.container}>
        <View style={styles.contentWrapper}>
          <CompleteIcon />
          <View style={styles.textWrapper}>
            <Text style={styles.titleText}>분석 리포트 신청 완료</Text>
            <Text style={styles.descriptionText}>
              분석 리포트는 신청 후 <Text style={styles.descriptionText}>24시간 이내</Text>로 제작 완료되며,{`\n`}
              제작 완료 시 <Text style={styles.blueText}>알림톡</Text>을 보내드립니다!
            </Text>
          </View>
        </View>
        <View style={styles.buttonWrapper}>
          <ButtonGroup
            leftText="마이페이지"
            rightText="확인"
            onLeftPress={() => router.replace('/account')}
            onRightPress={() => router.replace('/')}
          />
        </View>
      </View>
    </>
  );
};

export default RequestCompleteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    paddingHorizontal: wp(20),
  },

  contentWrapper: {
    paddingTop: hp(119),
    alignItems: 'center',
    gap: hp(23),
  },

  buttonWrapper: {
    position: 'absolute',
    bottom: hp(20),
    left: wp(20),
    right: wp(20),
  },

  textWrapper: {
    gap: hp(8),
  },

  titleText: {
    textAlign: 'center',
    color: '#212121',
    fontFamily: 'Pretendard600',
    fontSize: wp(18),
    lineHeight: hp(26),
    letterSpacing: wp(-0.45),
  },

  descriptionText: {
    textAlign: 'center',
    color: '#767676',
    fontFamily: 'Pretendard400',
    fontSize: wp(14),
    lineHeight: hp(20),
    letterSpacing: wp(-0.35),
  },

  blueText: {
    color: '#4048F7',
    fontFamily: 'Pretendard600',
  },

  strongText: {
    color: '#434343',
    fontFamily: 'Pretendard600',
  },
});
