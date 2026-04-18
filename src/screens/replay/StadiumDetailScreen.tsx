import Tab from '@/components/common/Tab';
import Header from '@/components/layout/Header';
import { hp, wp } from '@/utils/dimension';
import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import ReportDownloadTab from './components/ReportDownloadTab';
import RequestReportTab from './components/RequestReportTab';
import { useQuery } from '@tanstack/react-query';
import { DUMMY_STADIUMS } from '@/constants/dummyStadium';
import { DUMMY_COURTS } from '@/constants/dummySchedule';

interface StadiumDetailProps {
  stadiumId: string | string[];
}

// 수정 예정
// 구장 상세 정보
const fetchStadiumDetail = async (id: number) => DUMMY_STADIUMS.find((s) => s.stadiumId === id) ?? null;

const fetchCourts = async (id: number) => DUMMY_COURTS[id] ?? [];

const StadiumDetailScreen = ({ stadiumId }: StadiumDetailProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTab, setSelectedTab] = useState('분석 리포트 다운');

  const id = Array.isArray(stadiumId) ? Number(stadiumId[0]) : Number(stadiumId);

  const { data: stadium } = useQuery({
    queryKey: ['stadium', id],
    queryFn: () => fetchStadiumDetail(id),
  });

  const { data: reportCourts = [] } = useQuery({
    queryKey: ['courts', id],
    queryFn: () => fetchCourts(id),
  }); // 해당 구장 코트 목록

  // 코트 목록 로드 후 첫 번째 코트를 기본 선택값으로 설정
  const [selectedCourtId, setSelectedCourtId] = useState<number | null>(null);
  useEffect(() => {
    if (reportCourts.length > 0) {
      setSelectedCourtId(reportCourts[0].courtId);
    }
  }, [reportCourts]);

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
          goToRequestTab={() => setSelectedTab('분석 리포트 신청')}
        />
      ) : (
        <RequestReportTab
          stadiumId={id}
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
