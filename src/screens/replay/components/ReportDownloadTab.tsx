import { StyleSheet, View } from 'react-native';
import ReportScheduleList from './ReportScheduleList';
import CourtSelector from './CourtSelector';
import { useReportDates } from '../services/useReportDates';
import { useStadiumCourts } from '../services/useStadiumCourts';
import DatePicker from '@/components/common/DatePicker';
import DetailToggle from '@/components/common/DetailToggle';
import Divider from '@/components/common/Divider';
import StepScroll from '@/components/common/StepScroll';
import { hp, wp } from '@/utils/dimension';

import DownStep1Icon from '@/assets/images/common/downStep1Icon.svg';
import DownStep2Icon from '@/assets/images/common/pngIcon/downStep2Icon.png';
import DownStep3Icon from '@/assets/images/common/pngIcon/downStep3Icon.png';
import ReportDownBanner from '@/assets/images/banner/reportDownBanner.svg';

const DOWN_STEPS = [DownStep1Icon, DownStep2Icon, DownStep3Icon];

interface ReportDownloadTabProps {
  stadiumId: number;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  selectedCourtId: number | null;
  setSelectedCourtId: (courtId: number | null) => void;
  goToRequestTab: () => void;
}

const ReportDownloadTab = ({
  stadiumId,
  selectedDate,
  setSelectedDate,
  selectedCourtId,
  setSelectedCourtId,
  goToRequestTab,
}: ReportDownloadTabProps) => {
  const { data: courtList = [] } = useStadiumCourts(stadiumId);
  const { data: reportDates = [] } = useReportDates(stadiumId, selectedCourtId ?? undefined);

  const highlightDates = reportDates.filter((d) => d.hasReport).map((d) => new Date(d.date));

  return (
    <>
      <DetailToggle title="분석 리포트 받아보기">
        <StepScroll images={DOWN_STEPS} />
      </DetailToggle>
      <Divider />
      <View style={styles.bannerWrapper}>
        <ReportDownBanner />
      </View>
      <DatePicker
        type="download"
        selectedDate={selectedDate}
        onSelect={setSelectedDate}
        highlightDates={highlightDates}
      />
      <View style={styles.gameInfoWrapper}>
        <CourtSelector courtList={courtList} selectedCourtId={selectedCourtId} onPress={setSelectedCourtId} />
        <ReportScheduleList
          stadiumId={stadiumId}
          selectedCourtId={selectedCourtId}
          selectedDate={selectedDate}
          onPress={goToRequestTab}
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
