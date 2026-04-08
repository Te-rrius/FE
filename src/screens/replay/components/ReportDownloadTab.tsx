import DatePicker from '@/components/common/DatePicker';
import DetailToggle from '@/components/common/DetailToggle';
import Divider from '@/components/common/Divider';
import StepScroll from '@/components/common/StepScroll';
import { StyleSheet, View } from 'react-native';
import { hp, wp } from '@/utils/dimension';
import ReportScheduleList from './ReportScheduleList';
import CourtSelector from './CourtSelector';
import { DUMMY_REPORT_COURTS } from '@/constants/reportTimeSchedule';

import DownStep1Icon from '@/assets/images/common/downStep1Icon.svg';
import DownStep2Icon from '@/assets/images/common/downStep2Icon.svg';
import DownStep3Icon from '@/assets/images/common/downStep3Icon.svg';
import ReportDownBanner from '@/assets/images/banner/reportDownBanner.svg';

interface ReportDownloadTabProps {
  stadiumId: number;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  selectedCourtId: number | null;
  setSelectedCourtId: (courtId: number | null) => void;
}

const DOWN_STEPS = [DownStep1Icon, DownStep2Icon, DownStep3Icon];

const ReportDownloadTab = ({
  stadiumId,
  selectedDate,
  setSelectedDate,
  selectedCourtId,
  setSelectedCourtId,
}: ReportDownloadTabProps) => {
  return (
    <>
      <DetailToggle title="분석 리포트 받아보기">
        <StepScroll images={DOWN_STEPS} />
      </DetailToggle>
      <Divider />
      <View style={styles.bannerWrapper}>
        <ReportDownBanner />
      </View>
      <DatePicker type="download" selectedDate={selectedDate} onSelect={setSelectedDate} />
      <View style={styles.gameInfoWrapper}>
        <CourtSelector
          stadiumList={DUMMY_REPORT_COURTS[stadiumId] ?? []}
          selectedCourtId={selectedCourtId}
          onPress={setSelectedCourtId}
        />
        <ReportScheduleList
          selectedCourtId={selectedCourtId}
          selectedDate={selectedDate}
          onPress={() => {
            /* 신청 화면 이동 */
          }}
        />
      </View>
    </>
  );
};

export default ReportDownloadTab;

const styles = StyleSheet.create({
  bannerWrapper: {
    paddingVertical: hp(20),
  },

  gameInfoWrapper: {
    paddingTop: hp(24),
    paddingHorizontal: wp(20),
    gap: hp(32),
  },
});
