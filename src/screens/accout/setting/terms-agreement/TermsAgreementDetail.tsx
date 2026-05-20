import { StyleSheet, View, Text } from 'react-native';
import AgreeHeader from './components/AgreeHeader';
import CircleIcon from '@/assets/images/account/circleIcon.svg';
import { hp, wp } from '@/utils/dimension';
import Button from '@/components/common/Button';
import Divider from '@/components/common/Divider';
import { useTermAgreeStore } from '@/stores/termAgreeStore';
import { router } from 'expo-router';

type TermsAgreementDetailType = 'privacy' | 'marketing';

interface TermsAgreementDetailProps {
  category: TermsAgreementDetailType;
}

const PRIVACY_TABLE_HEADERS = ['수집/이용 목적', '수집 항목', '보유 및 이용 기간'];
const PRIVACY_TABLE_DATA = [
  '서비스/업데이트 정보 제공, 맞춤형 서비스/광고 제공, 이벤트/마케팅/광고 활용',
  '회원 번호, 이름, ID, 이메일 주소, 휴대폰 번호, 디바이스 토큰, 서비스 이용 기록, 성별, 생년월일, ADID, 국가',
  '동의 철회 또는 회원 탈퇴 시까지',
];

const TermsAgreementDetail = ({ category }: TermsAgreementDetailProps) => {
  const { setPrivacyAgreed, setMarketingAgreed } = useTermAgreeStore();

  const isPrivacy = category === 'privacy';

  const handleConfirm = () => {
    if (isPrivacy) setPrivacyAgreed(true);
    else setMarketingAgreed(true);
    router.back();
  };

  return (
    <View style={styles.container}>
      <View>
        <AgreeHeader title={isPrivacy ? '개인 정보 수집 및 이용 동의' : '마케팅 정보 수신 동의'} />

        {isPrivacy ? (
          // 개인 정보 수집 및 이용 동의
          <View style={styles.privacyContentWrapper}>
            <View style={styles.table}>
              <View style={styles.headerRow}>
                {PRIVACY_TABLE_HEADERS.map((title, i) => (
                  <View key={title} style={[styles.titleCell, i === 1 && styles.middleCell]}>
                    <Text style={styles.headerText}>{title}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.dataRow}>
                {PRIVACY_TABLE_DATA.map((text, i) => (
                  <View key={i} style={[styles.dataCell, i === 1 && styles.middleCell]}>
                    <Text style={styles.dataText}>{text}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.subInfo}>
              <Text style={styles.infoText}>※</Text>
              <Text style={[styles.infoText, styles.textFlex]}>
                회사는 콘텐츠산업진흥법, 전자상거래 등에서의 소비자 보호에 관한 법률, 약관의 규제에 관한 법률, 전자문서
                및 전자거래기본법, 전자금융거래법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 개인정보 보호법 등
                관련 법령을 위배하지 않는 범위에서 본 약관을 개정할 수 있습니다.
              </Text>
            </View>
          </View>
        ) : (
          // 마케팅 정보 수신 동의
          <View style={styles.marketingContentWrapper}>
            <Text style={styles.mainAgreeText}>
              스캡쳐는 회원님이 동의하신 개인 정보를 이용하여 푸시 알림, SMS(MMS), 이메일을 통해 서비스 이벤트 및
              업데이트, 마케팅 정보, 고객 맞춤 서비스 정보를 전송할 수 있습니다.
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
                <Text style={styles.subAgreeText}>
                  {
                    '광고성정보수신의 변경은 "마이페이지 > 설정 (서비스 이용 동의) > 개인 정보 수집 및 마케팅 수신 동의" 에서 언제든지 변경할 수 있습니다.'
                  }
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>

      <View>
        <Divider />
        <Button text="확인하기" onPress={handleConfirm} />
      </View>
    </View>
  );
};

export default TermsAgreementDetail;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'space-between',
  },

  // 개인 정보 스타일
  privacyContentWrapper: {
    paddingTop: hp(32),
    paddingHorizontal: wp(20),
    gap: hp(23),
  },

  table: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
  },

  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
  },

  titleCell: {
    flex: 1,
    paddingVertical: hp(16),
    alignItems: 'center',
    justifyContent: 'center',
  },

  dataRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#ECECEC',
  },

  dataCell: {
    flex: 1,
    paddingVertical: hp(12),
    paddingHorizontal: wp(10),
  },

  middleCell: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ECECEC',
  },

  headerText: {
    color: '#434343',
    fontSize: wp(12),
    fontFamily: 'Pretendard600',
    textAlign: 'center',
    lineHeight: hp(18),
  },

  dataText: {
    color: '#434343',
    fontSize: wp(12),
    fontFamily: 'Pretendard400',
    lineHeight: hp(18),
  },

  subInfo: {
    flexDirection: 'row',
    gap: wp(4),
  },

  infoText: {
    color: '#767676',
    fontSize: wp(13),
    fontFamily: 'Pretendard400',
    lineHeight: hp(18),
  },

  textFlex: {
    flex: 1,
    flexShrink: 1,
  },

  // 마케팅 스타일
  marketingContentWrapper: {
    paddingTop: hp(23),
    paddingHorizontal: wp(20),
    gap: hp(8),
  },

  mainAgreeText: {
    color: '#505050',
    fontFamily: 'Pretendard400',
    fontSize: wp(14),
    lineHeight: hp(20),
    letterSpacing: wp(-0.35),
  },

  agreeContent: {
    gap: hp(8),
  },

  optionRow: {
    flexDirection: 'row',
    gap: wp(4),
  },

  circleIcon: {
    marginTop: hp(9),
  },

  subAgreeText: {
    flex: 1,
    flexShrink: 1,
    color: '#767676',
    fontFamily: 'Pretendard400',
    fontSize: wp(13),
    lineHeight: hp(18),
    letterSpacing: wp(-0.325),
  },
});
