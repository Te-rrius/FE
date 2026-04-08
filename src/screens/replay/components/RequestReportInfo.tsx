import { StyleSheet, Text, View } from 'react-native';
import { hp, wp } from '@/utils/dimension';
import DownloadGuide from './DownloadGuide';

import NoReportIcon from '@/assets/images/replay/noReportIcon.svg';
import BlueBangIcon from '@/assets/images/replay/blueBangIcon.svg';

interface RequestReportInfoProps {
  hasAnyReport: boolean;
  selectedDate: Date;
  onPress: () => void;
}

const RequestReportInfo = ({ hasAnyReport, selectedDate, onPress }: RequestReportInfoProps) => {
  // 신청 가능 기한 판단
  const isRecent = (() => {
    const today = new Date();
    const diffDays = Math.floor((today.getTime() - selectedDate.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays < 3;
  })();

  if (!isRecent) {
    return (
      <View style={styles.bangWrapper}>
        <BlueBangIcon />
        <Text style={styles.bangText}>
          리포트 신청은 경기 당일부터 3일 이내에만 가능합니다. 단, 이미 리포트가 제작된 경기 시간대인 경우{' '}
          <Text style={styles.strongBangText}>신청 기한이 지난 이후라도 리포트 신청을 통해</Text> 리포트 받기 권한을
          얻어 해당 리포트를 받아보실 수 있습니다.
        </Text>
      </View>
    );
  }

  if (!hasAnyReport) {
    return (
      <DownloadGuide
        icon={<NoReportIcon />}
        mainText="아직 신청된 리포트가 없어요"
        subText={`리포트 신청을 먼저 진행하셔야 받아보실 수 있습니다!\n(리포트 제작은 신청 이후, 24시간 안에 완성됩니다)`}
        onPress={onPress}
      />
    );
  }

  return (
    <DownloadGuide
      mainText="다른 시간대 리포트가 궁금하다면?"
      subText={`리포트 신청을 먼저 진행하셔야 받아보실 수 있습니다!\n(리포트 제작은 신청 이후, 24시간 안에 완성됩니다)`}
      onPress={onPress}
    />
  );
};

export default RequestReportInfo;

const styles = StyleSheet.create({
  bangWrapper: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 6,
    paddingHorizontal: wp(12),
    paddingVertical: hp(16),
    gap: wp(6),
    marginTop: hp(24),
  },

  bangText: {
    flexShrink: 1,
    color: '#434343',
    fontFamily: 'Pretendard400',
    fontSize: wp(14),
    lineHeight: hp(20),
    letterSpacing: wp(-0.35),
  },

  strongBangText: {
    fontFamily: 'Pretendard600',
  },
});
