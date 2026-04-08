import DatePicker from '@/components/common/DatePicker';
import DetailToggle from '@/components/common/DetailToggle';
import Divider from '@/components/common/Divider';
import StepScroll from '@/components/common/StepScroll';
import { StyleSheet, View } from 'react-native';

import ReportRequestBanner from '@/assets/images/banner/reportRequestBanner.svg';

import RequestStep1Icon from '@/assets/images/common/requestStep1Icon.svg';
import RequestStep2Icon from '@/assets/images/common/requestStep2Icon.svg';
import { hp } from '@/utils/dimension';

const REQUEST_STEPS = [RequestStep1Icon, RequestStep2Icon];

interface RequestReportTabProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  selectedCourtId: number | null;
  setSelectedCourtId: (courtId: number | null) => void;
}

const RequestReportTab = ({
  selectedDate,
  setSelectedDate,
  selectedCourtId,
  setSelectedCourtId,
}: RequestReportTabProps) => {
  return (
    <>
      <DetailToggle title="분석 리포트 신청">
        <StepScroll images={REQUEST_STEPS} />
      </DetailToggle>
      <Divider />
      <View style={styles.bannerWrapper}>
        <ReportRequestBanner />
      </View>
      <DatePicker type="request" selectedDate={selectedDate} onSelect={setSelectedDate} />
    </>
  );
};

export default RequestReportTab;

const styles = StyleSheet.create({
  bannerWrapper: {
    paddingVertical: hp(20),
  },
});
