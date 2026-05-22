import { StyleSheet, Text, View } from 'react-native';
import RequestScheduleList from './RequestScheduleList';
import { useSchedule } from '../services/useSchedule';
import DatePicker from '@/components/common/DatePicker';
import DetailToggle from '@/components/common/DetailToggle';
import Divider from '@/components/common/Divider';
import StepScroll from '@/components/common/StepScroll';
import { hp, wp } from '@/utils/dimension';
import { toDateString } from '@/utils/date';

import ReportRequestBanner from '@/assets/images/banner/reportRequestBanner.svg';
import RequestStep1Icon from '@/assets/images/common/requestStep1Icon.svg';
import RequestStep2Icon from '@/assets/images/common/requestStep2Icon.svg';
import ScheduleIcon from '@/assets/images/replay/scheduleIcon.svg';
import Dropdown from '@/components/common/Dropdown';
import LocationIcon from '@/assets/images/replay/locationIcon.svg';
import { useState } from 'react';
import { useStadiumCourts } from '../services/useStadiumCourts';

const REQUEST_STEPS = [RequestStep1Icon, RequestStep2Icon];

interface RequestReportTabProps {
  stadiumId: number;
  stadiumName: string;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  selectedCourtId: number | null;
  setSelectedCourtId: (courtId: number | null) => void;
}

const RequestReportTab = ({
  stadiumId,
  stadiumName,
  selectedDate,
  selectedCourtId,
  setSelectedDate,
  setSelectedCourtId,
}: RequestReportTabProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { data: courtList = [] } = useStadiumCourts(stadiumId);

  const selectedCourt = courtList.find((c) => c.courtId === selectedCourtId) ?? null;

  const selectDropdownHandler = (option: string) => {
    const court = courtList.find((c) => c.name === option);
    setSelectedCourtId(court?.courtId ?? null);
    setIsDropdownOpen(false);
  };

  const { data: scheduleData } = useSchedule(stadiumId, {
    date: toDateString(selectedDate),
    courtNumber: selectedCourtId ?? undefined,
  });

  const times = scheduleData?.times ?? [];

  return (
    <>
      <DetailToggle title="분석 리포트 신청">
        <StepScroll images={REQUEST_STEPS} />
      </DetailToggle>
      <Divider />
      <View style={styles.bannerWrapper}>
        <ReportRequestBanner />
      </View>
      <View style={styles.titleRow}>
        <LocationIcon />
        <Text style={styles.titleText}>구역명</Text>
      </View>
      <View style={styles.courtNameWrapper}>
        <Dropdown
          width={wp(350)}
          selectedText={selectedCourt?.name ?? ''}
          dropdownList={courtList.map((c) => c.name)}
          isDropdownOpen={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
          selectDropdownHandler={selectDropdownHandler}
          courtText="코트"
        />
      </View>
      <View style={styles.wrapper}>
        <View style={styles.titleRow}>
          <ScheduleIcon />
          <Text style={styles.titleText}>날짜 & 시간</Text>
        </View>
        <DatePicker type="request" selectedDate={selectedDate} onSelect={setSelectedDate} />
        <View style={styles.timeList}>
          <RequestScheduleList
            times={times}
            stadiumId={stadiumId}
            stadiumName={stadiumName}
            selectedDate={selectedDate}
            selectedCourtId={selectedCourtId}
          />
        </View>
      </View>
    </>
  );
};

export default RequestReportTab;

const styles = StyleSheet.create({
  wrapper: {
    gap: hp(12),
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(6),
    paddingHorizontal: wp(20),
    paddingTop: wp(24),
  },

  titleText: {
    color: '#5C5C5C',
    fontFamily: 'Pretendard600',
    fontSize: wp(14),
    lineHeight: hp(20),
    letterSpacing: wp(-0.35),
  },

  bannerWrapper: {
    paddingTop: hp(20),
  },

  courtNameWrapper: {
    paddingTop: hp(24),
    paddingBottom: hp(8),
    paddingHorizontal: wp(20),
    gap: hp(32),
  },

  timeList: {
    paddingHorizontal: wp(20),
  },
});
