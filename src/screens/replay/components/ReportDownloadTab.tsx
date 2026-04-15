import DatePicker from '@/components/common/DatePicker';
import DetailToggle from '@/components/common/DetailToggle';
import Divider from '@/components/common/Divider';
import StepScroll from '@/components/common/StepScroll';
import { StyleSheet, View } from 'react-native';
import { hp, wp } from '@/utils/dimension';
import ReportScheduleList from './ReportScheduleList';
import CourtSelector from './CourtSelector';

import DownStep1Icon from '@/assets/images/common/downStep1Icon.svg';
import DownStep2Icon from '@/assets/images/common/downStep2Icon.svg';
import DownStep3Icon from '@/assets/images/common/downStep3Icon.svg';
import ReportDownBanner from '@/assets/images/banner/reportDownBanner.svg';
import { useQuery } from '@tanstack/react-query';
import { DUMMY_COURTS, DUMMY_SCHEDULES } from '@/constants/dummySchedule';

interface ReportDownloadTabProps {
  stadiumId: number;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  selectedCourtId: number | null;
  setSelectedCourtId: (courtId: number | null) => void;
  goToRequestTab: () => void;
}

const DOWN_STEPS = [DownStep1Icon, DownStep2Icon, DownStep3Icon];

// 수정 예정
// 선택된 코드 일정
const fetchCourts = async (id: number) => DUMMY_COURTS[id] ?? [];
// 다운탭: isRequested && reportId 있는 것만
// StadiumDetailScreen 중복 분리 예정
const fetchDownloadSchedules = async (courtId: number) =>
  (DUMMY_SCHEDULES[courtId] ?? []).filter((s) => s.isRequested && s.reportId);

const ReportDownloadTab = ({
  stadiumId,
  selectedDate,
  setSelectedDate,
  selectedCourtId,
  setSelectedCourtId,
  goToRequestTab,
}: ReportDownloadTabProps) => {
  const { data: courtList = [] } = useQuery({
    queryKey: ['courts', stadiumId],
    queryFn: () => fetchCourts(stadiumId),
  });

  // 선택된 코트의 일정 목록
  const { data: schedules = [] } = useQuery({
    queryKey: ['downloadSchedules', selectedCourtId],
    queryFn: () => fetchDownloadSchedules(selectedCourtId!),
    enabled: selectedCourtId !== null,
  });

  // 리포트 있는 날짜만 캘린더에 하이라이트
  const reportDates = schedules.map((s) => new Date(s.date));

  return (
    <>
      <DetailToggle title="분석 리포트 받아보기">
        <StepScroll images={DOWN_STEPS} />
      </DetailToggle>
      <Divider />
      <View style={styles.bannerWrapper}>
        <ReportDownBanner />
      </View>
      <DatePicker type="download" selectedDate={selectedDate} onSelect={setSelectedDate} highlightDates={reportDates} />
      <View style={styles.gameInfoWrapper}>
        <CourtSelector courtList={courtList} selectedCourtId={selectedCourtId} onPress={setSelectedCourtId} />
        <ReportScheduleList selectedCourtId={selectedCourtId} selectedDate={selectedDate} onPress={goToRequestTab} />
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
