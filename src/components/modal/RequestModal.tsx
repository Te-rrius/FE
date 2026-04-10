import { MatchScheduleDto } from '@/constants/dummySchedule';
import { hp, wp } from '@/utils/dimension';
import { Modal, StyleSheet, Text, View } from 'react-native';
import ButtonGroup from '../common/ButtonGroup';
import { useRouter } from 'expo-router';
import useAuthStore from '@/store/authStore';

import LocationIcon from '@/assets/images/replay/locationIcon.svg';
import ScheduleIcon from '@/assets/images/replay/scheduleIcon.svg';
import LineIcon from '@/assets/images/modal/lineIcon.svg';

interface RequestModalProps {
  schedule: MatchScheduleDto;
  courtName: string;
  onClose: () => void;
  onConfirm: (scheduleId: number) => void;
}

const formatDate = (date: string) => date.replace(/-/g, '.');

const RequestModal = ({ schedule, courtName, onClose, onConfirm }: RequestModalProps) => {
  const router = useRouter();
  const { token } = useAuthStore();

  const handleRequest = () => {
    if (!token) {
      onClose();
    } else {
      // 신청 로직
      onConfirm(schedule.scheduleId);
      router.push('/request-complete');
    }
  };

  return (
    <Modal visible={true} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.titleText}>분석 리포트 신청</Text>
          <Text style={styles.descriptionText}>
            리포트는 신청 후 <Text style={styles.blueText}>24시간 이내</Text>로 완료되며,{`\n`}제작 완료 시{' '}
            <Text style={styles.strongText}>알림톡</Text>을 보내드립니다!
          </Text>
          <View style={styles.reportInfoContainer}>
            <Text style={styles.containerTitle}>신청한 하이라이트 영상</Text>
            <View style={styles.infoContainer}>
              <View style={styles.infoTitle}>
                <LocationIcon />
                <Text style={styles.infoText}>{courtName}</Text>
              </View>
              <View style={styles.infoTitle}>
                <ScheduleIcon />
                <Text style={styles.infoText}>{formatDate(schedule.date)}</Text>
                <LineIcon />
                <Text style={styles.infoText}>{schedule.hours}</Text>
              </View>
            </View>
          </View>
          <ButtonGroup
            leftText="취소"
            rightText="신청하기"
            onLeftPress={onClose}
            onRightPress={handleRequest}
            leftWidth={wp(88)}
          />
        </View>
      </View>
    </Modal>
  );
};

export default RequestModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    width: wp(340),
    padding: wp(20),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: hp(16),
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },

  titleText: {
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

  reportInfoContainer: {
    width: wp(300),
    backgroundColor: '#F5F5F5',
    borderColor: '#E8E8E8',
    padding: wp(16),
    borderRadius: 12,
    gap: hp(12),
    marginBottom: hp(20),
  },

  containerTitle: {
    color: '#505050',
    fontFamily: 'Pretendard600',
    fontSize: wp(12),
    lineHeight: hp(18),
    letterSpacing: wp(-0.3),
  },

  infoTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(6),
  },

  infoContainer: {
    gap: hp(8),
  },

  infoText: {
    color: '#303030',
    fontFamily: 'Pretendard400',
    fontSize: wp(15),
    lineHeight: hp(22),
    letterSpacing: wp(-0.375),
  },
});
