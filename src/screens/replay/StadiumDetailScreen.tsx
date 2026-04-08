import Tab from '@/components/common/Tab';
import Header from '@/components/layout/Header';
import { DUMMY_COURTS } from '@/constants/dummyStadium';
import { DUMMY_REPORT_COURTS } from '@/constants/reportTimeSchedule';
import { hp, wp } from '@/utils/dimension';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import ReportDownloadTab from './components/ReportDownloadTab';
import RequestReportTab from './components/RequestReportTab';

interface StadiumDetailProps {
  stadiumId: string | string[];
}

const StadiumDetailScreen = ({ stadiumId }: StadiumDetailProps) => {
  const [selectedTab, setSelectedTab] = useState('분석 리포트 다운');

  const id = Array.isArray(stadiumId) ? Number(stadiumId[0]) : Number(stadiumId);
  const stadium = DUMMY_COURTS.find((c) => c.stadiumId === id);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCourtId, setSelectedCourtId] = useState<number | null>(
    DUMMY_REPORT_COURTS[id]?.[0]?.stadiumId ?? null,
  );

  if (!stadium) return null;

  return (
    <ScrollView>
      <Header />
      <Image source={{ uri: stadium.image }} style={styles.stadiumImg} />
      <View style={styles.stadiumDetailContainer}>
        <View style={styles.stadiumInfo}>
          <Text style={styles.nameText}>{stadium.name}</Text>
          <Text style={styles.locationText}>{stadium.location}</Text>
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
        <ReportDownloadTab
          stadiumId={id}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedCourtId={selectedCourtId}
          setSelectedCourtId={setSelectedCourtId}
        />
      ) : (
        <RequestReportTab
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedCourtId={selectedCourtId}
          setSelectedCourtId={setSelectedCourtId}
        />
      )}
    </ScrollView>
  );
};

export default StadiumDetailScreen;

const styles = StyleSheet.create({
  stadiumImg: {
    width: '100%',
    height: hp(220),
  },

  stadiumDetailContainer: {
    marginTop: -hp(24),
    marginBottom: hp(16),
    backgroundColor: '#FFFFFF',
    paddingTop: hp(20),
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    gap: hp(20),
  },

  stadiumInfo: {
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
});
