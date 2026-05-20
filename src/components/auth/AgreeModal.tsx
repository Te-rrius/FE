import { hp, wp } from '@/utils/dimension';
import { StyleSheet, Text, View } from 'react-native';
import Checkbox from '@/components/common/Checkbox';
import Divider from '../common/Divider';
import AgreeModalOption from '../common/AgreeModalOption';
import Button from '../common/Button';
import { useTermAgreeStore } from '@/stores/termAgreeStore';
import useAuthStore from '@/stores/authStore';

const AgreeModal = () => {
  const { closeAgreeModal } = useAuthStore();
  const { isPrivacyAgreed, isMarketingAgreed, setPrivacyAgreed, setMarketingAgreed } = useTermAgreeStore();

  const allChecked = isPrivacyAgreed && isMarketingAgreed;

  const toggleAll = () => {
    const next = !allChecked;
    setPrivacyAgreed(next);
    setMarketingAgreed(next);
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.contentWrapper}>
          <Text style={styles.agreeTtitle}>{`스캡쳐(Scapture) 서비스 이용을 위해\n다음 약관에 동의해 주세요.`}</Text>
          <View style={styles.agreeTop}>
            <View style={styles.agreeCheck}>
              <Checkbox isChecked={allChecked} onToggleCheckHandler={toggleAll} />
              <Text style={styles.agreeText}>약관에 모두 동의합니다.</Text>
            </View>
            <Divider />
          </View>
        </View>
        <View>
          <AgreeModalOption content="(필수) 스캡쳐 서비스 이용 약관 동의" isChecked={true} />
          <AgreeModalOption
            content="(선택) 개인 정보 수집 및 이용 동의"
            isChecked={isPrivacyAgreed}
            onToggleCheckHandler={() => setPrivacyAgreed(!isPrivacyAgreed)}
          />
          <AgreeModalOption
            content="(선택) 마케팅 정보 수신 동의"
            isChecked={isMarketingAgreed}
            onToggleCheckHandler={() => setMarketingAgreed(!isMarketingAgreed)}
          />
        </View>
      </View>
      <Button text="동의하고 시작하기" onPress={closeAgreeModal} />
    </View>
  );
};

export default AgreeModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingTop: hp(28),
    paddingBottom: hp(29),
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },

  wrapper: {
    paddingHorizontal: wp(20),
    gap: hp(8),
  },

  contentWrapper: {
    gap: hp(24),
  },

  agreeTtitle: {
    color: '#212121',
    fontFamily: 'Pretendard600',
    fontSize: wp(20),
    lineHeight: hp(28),
    letterSpacing: wp(-0.5),
  },

  agreeTop: {
    gap: hp(8),
  },

  agreeCheck: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(12),
    gap: wp(12),
  },

  agreeText: {
    color: '#171717',
    fontFamily: 'Pretendard600',
    fontSize: wp(16),
    lineHeight: hp(24),
    letterSpacing: wp(-0.4),
  },
});
