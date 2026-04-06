import { useState } from 'react';
import DatePicker from '@/components/common/DatePicker';
import DetailToggle from '@/components/common/DetailToggle';
import Divider from '@/components/common/Divider';
import StepScroll from '@/components/common/StepScroll';
import { Pressable, StyleSheet, Text, View } from 'react-native';
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
import NoReportIcon from '@/assets/images/replay/noReportIcon.svg';
import FieldSelector from './FieldSelector';
import { DUMMY_REPORT_COURTS } from '@/constants/reportTimeSchedule';
import DownloadGuide from './DownloadGuide';

interface ReportDownloadTabProps {
  courtId: number;
}

const DOWN_STEPS = [DownStep1Icon, DownStep2Icon, DownStep3Icon];

const ReportDownloadTab = ({ courtId }: ReportDownloadTabProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);
  const [selectedFieldId, setSelectedFieldId] = useState<number | null>(
    DUMMY_REPORT_COURTS[courtId]?.[0]?.courtId ?? null,
  );

  const toDateString = (date: Date) => date.toISOString().split('T')[0]; // 'YYYY-MM-DD'

  const filteredSchedules = selectedFieldId
    ? (DUMMY_REPORT_SCHEDULES[selectedFieldId] ?? []).filter((s) => s.date === toDateString(selectedDate))
    : [];

  const hasAnyReport = filteredSchedules.length > 0;

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedScheduleId(null);
  };

  return (
    <>
      <DetailToggle title="분석 리포트 받아보기">
        <StepScroll images={DOWN_STEPS} />
      </DetailToggle>
      <Divider />
      <View style={styles.bannerWrapper}>
        <ReportDownBanner />
      </View>
      <DatePicker type="download" selectedDate={selectedDate} onSelect={handleDateSelect} />

      <View style={styles.gameInfoWrapper}>
        <View style={styles.infoContainer}>
          <DetailTitle icon={LocationIcon} title="구역명" />
          <FieldSelector
            courtList={DUMMY_REPORT_COURTS[courtId] ?? []}
            selectedFieldId={selectedFieldId}
            onPress={setSelectedFieldId}
          />
        </View>

        <View style={styles.infoContainer}>
          <DetailTitle icon={TimeIcon} title="시간대" />

          {hasAnyReport ? (
            <ReportScheduleList
              scheduleList={filteredSchedules}
              selectedScheduleId={selectedScheduleId}
              onPress={setSelectedScheduleId}
            />
          ) : (
            <DownloadGuide
              icon={<NoReportIcon />}
              mainText="아직 신청된 리포트가 없어요"
              subText={`리포트 신청을 먼저 진행하셔야 받아보실 수 있습니다!\n(리포트 제작은 신청 이후, 24시간 안에 완성됩니다)`}
              onPress={() => {
                /* 신청 화면 이동 */
              }}
            />
          )}
        </View>

        {hasAnyReport && (
          <DownloadGuide
            mainText="다른 시간대 리포트가 궁금하다면?"
            subText={`리포트 신청을 먼저 진행하셔야 받아보실 수 있습니다!\n(리포트 제작은 신청 이후, 24시간 안에 완성됩니다)`}
            onPress={() => {
              /* 신청 화면 이동 */
            }}
          />
        )}
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

  anotherWrppaer: {
    alignItems: 'center',
    gap: hp(28),
    paddingVertical: hp(28),
  },

  anotherText: {
    gap: hp(8),
    textAlign: 'center',
  },

  mainText: {
    color: '#434343',
    fontFamily: 'Pretendard600',
    fontSize: wp(18),
    textAlign: 'center',
    lineHeight: hp(26),
    letterSpacing: wp(-0.45),
  },

  subText: {
    color: '#767676',
    fontFamily: 'Pretendard400',
    fontSize: wp(13),
    textAlign: 'center',
    lineHeight: hp(18),
    letterSpacing: wp(-0.325),
  },

  requestButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#4048F7',
    paddingHorizontal: wp(37.5),
    paddingVertical: hp(9),
    borderRadius: 6,
  },

  requestText: {
    color: '#FFFFFF',
    fontFamily: 'Pretendard600',
    fontSize: wp(13),
    textAlign: 'center',
    lineHeight: hp(18),
    letterSpacing: wp(-0.325),
  },

  noWrapper: {
    alignItems: 'center',
    gap: hp(18),
    paddingVertical: hp(28),
  },
});
