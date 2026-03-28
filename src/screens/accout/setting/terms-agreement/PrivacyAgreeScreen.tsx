import { StyleSheet, View, Text } from 'react-native'; // 컴포넌트 내부
import AgreeHeader from './components/AgreeHeader';
import { hp, wp } from '@/utils/dimension';

const PrivacyAgreeScreen = () => {
  return (
    <>
      <AgreeHeader title="개인 정보 수집 및 이용 동의" />
      <View style={styles.contentWrapper}>
        <View style={styles.table}>
          <View style={styles.headerRow}>
            {['수집/이용 목적', '수집 항목', '보유 및 이용 기간'].map((title, i) => (
              <View key={title} style={[styles.titleCell, i === 1 && styles.middleCell]}>
                <Text style={styles.headerText}>{title}</Text>
              </View>
            ))}
          </View>
          <View style={styles.dataRow}>
            {[
              '서비스/업데이트 정보 제공, 맞춤형 서비스/광고 제공, 이벤트/마케팅/광고 활용',
              '회원 번호, 이름, ID, 이메일 주소, 휴대폰 번호, 디바이스 토큰, 서비스 이용 기록, 성별, 생년월일, ADID, 국가',
              '동의 철회 또는 회원 탈퇴 시까지',
            ].map((text, i) => (
              <View key={i} style={[styles.dataCell, i === 1 && styles.middleCell]}>
                <Text style={styles.dataText}>{text}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.subInfo}>
          <Text style={styles.infoText}>※</Text>
          <Text style={[styles.infoText, styles.textBody]}>
            회사는 콘텐츠산업진흥법, 전자상거래 등에서의 소비자 보호에 관한 법률, 약관의 규제에 관한 법률, 전자문서 및
            전자거래기본법, 전자금융거래법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 개인정보 보호법 등 관련
            법령을 위배하지 않는 범위에서 본 약관을 개정할 수 있습니다.
          </Text>
        </View>
      </View>
    </>
  );
};

export default PrivacyAgreeScreen;

const styles = StyleSheet.create({
  contentWrapper: {
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

  textBody: {
    flex: 1,
    flexShrink: 1,
  },
});
