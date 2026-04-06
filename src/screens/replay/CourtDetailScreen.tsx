import Tab from '@/components/common/Tab';
import Header from '@/components/layout/Header';
import { DUMMY_COURTS } from '@/constants/dummyCourt';
import { hp, wp } from '@/utils/dimension';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import ReportDownloadTab from './components/ReportDownloadTab';
import RequestReportTab from './components/RequestReportTab';

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

      {selectedTab === '분석 리포트 다운' ? <ReportDownloadTab courtId={id} /> : <RequestReportTab />}
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
});
