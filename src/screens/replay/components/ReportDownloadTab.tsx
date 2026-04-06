import { useState } from 'react';
import DatePicker from '@/components/common/DatePicker';
import DetailToggle from '@/components/common/DetailToggle';
import Divider from '@/components/common/Divider';
import StepScroll from '@/components/common/StepScroll';
import { StyleSheet, View } from 'react-native';
import { hp, wp } from '@/utils/dimension';
import DetailTitle from './DetailTitle';
import ReportScheduleList from './ReportScheduleList';
import { DUMMY_REPORT_SCHEDULES } from '@/constants/reportSchedule';

import LocationIcon from '@/assets/images/replay/locationIcon.svg';
import TimeIcon from '@/assets/images/replay/timeIcon.svg';
import DownStep1Icon from '@/assets/images/common/downStep1Icon.svg';
import DownStep2Icon from '@/assets/images/common/downStep2Icon.svg';
import DownStep3Icon from '@/assets/images/common/downStep3Icon.svg';
import ReportDownBanner from '@/assets/images/banner/reportDownBanner.svg';
import FieldSelector from './FieldSelector';
import { DUMMY_REPORT_COURTS } from '@/constants/reportTimeSchedule';

interface ReportDownloadTabProps {
  courtId: number;
}

const DOWN_STEPS = [DownStep1Icon, DownStep2Icon, DownStep3Icon];

const ReportDownloadTab = ({ courtId }: ReportDownloadTabProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

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
        <View style={styles.infoContainer}>
          <DetailTitle icon={LocationIcon} title="구역명" />
          <FieldSelector courtList={DUMMY_REPORT_COURTS[courtId] ?? []} />
        </View>
        <View style={styles.infoContainer}>
          <DetailTitle icon={TimeIcon} title="시간대" />
          <ReportScheduleList scheduleList={DUMMY_REPORT_SCHEDULES[courtId] ?? []} />
        </View>
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
    gap: hp(32),
  },

  infoContainer: {
    paddingHorizontal: wp(20),
    gap: hp(8),
  },
});
