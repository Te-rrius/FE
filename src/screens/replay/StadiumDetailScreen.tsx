import Tab from '@/components/common/Tab';
import Header from '@/components/layout/Header';
import { hp, wp } from '@/utils/dimension';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import ReportDownloadTab from './components/ReportDownloadTab';
import RequestReportTab from './components/RequestReportTab';
import { useLocalSearchParams } from 'expo-router';

const StadiumDetailScreen = () => {
  const { stadiumId, name, imageUrl, address } = useLocalSearchParams<{
    stadiumId: string;
    name: string;
    imageUrl: string;
    address: string;
  }>();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTab, setSelectedTab] = useState('분석 리포트 다운');
  const [selectedCourtId, setSelectedCourtId] = useState<number | null>(null);

  const id = Number(stadiumId);

  return (
    <ScrollView>
      <Header />
      <Image source={{ uri: imageUrl }} style={styles.stadiumImg} />
      <View style={styles.stadiumDetailContainer}>
        <View style={styles.stadiumInfo}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.locationText}>{address}</Text>
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
          goToRequestTab={() => setSelectedTab('분석 리포트 신청')}
        />
      ) : (
        <RequestReportTab
          stadiumId={id}
          stadiumName={name}
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
