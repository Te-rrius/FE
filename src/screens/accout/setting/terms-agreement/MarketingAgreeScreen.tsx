import { StyleSheet, Text, View } from 'react-native';
import AgreeHeader from './components/AgreeHeader';

import CircleIcon from '@/assets/images/account/circleIcon.svg';
import { hp, wp } from '@/utils/dimension';

const MarketingAgreeScreen = () => {
  return (
    <View>
      <AgreeHeader title="마케팅 정보 수신 동의" />
      <View style={styles.contentWrapper}>
        <Text style={styles.mainAgreeText}>
          스캡쳐는 회원님이 동의하신 개인 정보를 이용하여 푸시 알림, SMS(MMS), 이메일을 통해 서비스 이벤트 및 업데이트,
          마케팅 정보, 고객 맞춤 서비스 정보를 전송할 수 있습니다.
        </Text>
        <View style={styles.agreeContent}>
          <View style={styles.optionRow}>
            <CircleIcon style={styles.circleIcon} />
            <Text style={styles.subAgreeText}>
              본 동의는 거부하실 수 있으나, 거부 시 이벤트 및 프로모션 안내, 유용한 정보를 받아보실 수 없습니다.
            </Text>
          </View>
          <View style={styles.optionRow}>
            <CircleIcon style={styles.circleIcon} />
            <Text style={styles.subAgreeText}>광고성정보수신의 변경은 "마이페이지 > 설정 (서비스 이용 동의) > 개인정보 수집 및 마케팅 수신 동의"에서 언제든지 변경할 수 있습니다.</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MarketingAgreeScreen;

const styles = StyleSheet.create({
  contentWrapper: {
    paddingTop: hp(23),
    paddingHorizontal: wp(20),
    gap: hp(8),
  },

  mainAgreeText: {
    color: '#505050',
    fontFamily: 'Pretendard400',
    fontSize: wp(14),
    lineHeight: hp(20),
    letterSpacing: wp(-0.35)
  },

  agreeContent: {
    gap: hp(8)
  },

  optionRow: {
    flexDirection: 'row',
    gap: wp(4),
  },

  circleIcon: {
    marginTop: hp(9),
  },

  subAgreeText: {
        color: '#767676',
    fontFamily: 'Pretendard400',
    fontSize: wp(13),
    lineHeight: hp(18),
    letterSpacing: wp(-0.325)
  }
});
