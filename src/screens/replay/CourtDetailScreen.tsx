import Divider from '@/components/common/Divider';
import Tab from '@/components/common/Tab';
import Header from '@/components/layout/Header';
import { DUMMY_COURTS } from '@/constants/dummyCourt';
import { hp, wp } from '@/utils/dimension';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import DetailToggle from '@/components/common/DetailToggle';
import StepScroll from '@/components/common/StepScroll';

import DownStep1Icon from '@/assets/images/common/downStep1Icon.svg';
import DownStep2Icon from '@/assets/images/common/downStep2Icon.svg';
import DownStep3Icon from '@/assets/images/common/downStep3Icon.svg';
import ReportDownBanner from '@/assets/images/banner/reportDownBanner.svg';

import RequestStep1Icon from '@/assets/images/common/requestStep1Icon.svg';
import RequestStep2Icon from '@/assets/images/common/requestStep2Icon.svg';
import ReportRequestBanner from '@/assets/images/banner/reportRequestBanner.svg';

const DOWN_STEPS = [DownStep1Icon, DownStep2Icon, DownStep3Icon];
const REQUEST_STEPS = [RequestStep1Icon, RequestStep2Icon];

interface CourtDetailProps {
  courtId: string | string[];
}

const CourtDetailScreen = ({ courtId }: CourtDetailProps) => {
  const [selectedTab, setSelectedTab] = useState('분석 리포트 다운');

  const id = Array.isArray(courtId) ? Number(courtId[0]) : Number(courtId);
  const court = DUMMY_COURTS.find((c) => c.courtId === id);

  if (!court) return null;

  return (
    <ScrollView>
      <Header />
      <Image source={{ uri: court.image }} style={styles.courtImg} />
      <View style={styles.courtDetailContainer}>
        <View style={styles.courtInfo}>
          <Text style={styles.nameText}>{court.name}</Text>
          <Text style={styles.locationText}>{court.location}</Text>
        </View>
        <Tab
          tabs={[
            { title: '분석 리포트 다운', handler: () => setSelectedTab('분석 리포트 다운') },
            { title: '분석 리포트 신청', handler: () => setSelectedTab('분석 리포트 신청') },
          ]}
          activeTab={selectedTab}
        />
      </View>

      {selectedTab === '분석 리포트 다운' ? (
        <>
          <DetailToggle key="down" title="분석 리포트 받아보기">
            <StepScroll images={DOWN_STEPS} />
          </DetailToggle>
          <Divider />
          <View style={styles.bannerWrapper}>
            <ReportDownBanner />
          </View>
        </>
      ) : (
        <>
          <DetailToggle key="request" title="분석 리포트 신청">
            <StepScroll images={REQUEST_STEPS} />
          </DetailToggle>
          <Divider />
          <View style={styles.bannerWrapper}>
            <ReportRequestBanner />
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default CourtDetailScreen;

const styles = StyleSheet.create({
  courtImg: {
    width: '100%',
    height: hp(220),
  },

  courtDetailContainer: {
    marginTop: -hp(24),
    marginBottom: hp(16),
    backgroundColor: '#FFFFFF',
    paddingTop: hp(20),
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    gap: hp(20),
  },

  courtInfo: {
    gap: hp(4),
    paddingHorizontal: wp(20),
  },

  nameText: {
    color: '#171717',
    fontFamily: 'Pretendard600',
    fontSize: wp(24),
    lineHeight: hp(34),
    letterSpacing: wp(-0.6),
  },

  locationText: {
    color: '#767676',
    fontFamily: 'Pretendard400',
    fontSize: wp(14),
    lineHeight: hp(20),
    letterSpacing: wp(-0.35),
  },

  partition: {
    gap: wp(20),
  },

  bannerWrapper: {
    paddingVertical: hp(20),
  },
});
