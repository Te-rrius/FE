import Tab from '@/components/common/Tab';
import Header from '@/components/layout/Header';
import { DUMMY_COURTS } from '@/constants/dummyStadium';
import { hp, wp } from '@/utils/dimension';
import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import ReportDownloadTab from './components/ReportDownloadTab';
import RequestReportTab from './components/RequestReportTab';
import { DUMMY_REPORT_COURTS } from '@/constants/dummySchedule';
import { useQuery } from '@tanstack/react-query';

interface StadiumDetailProps {
  stadiumId: string | string[];
}

// 수정 예정
// 구장 상세 정보
const fetchCourtDetail = async (id: number) => DUMMY_COURTS.find((c) => c.stadiumId === id) ?? null;
// 해당 구장 코트 목록
const fetchReportCourts = async (id: number) => DUMMY_REPORT_COURTS[id] ?? [];

const StadiumDetailScreen = ({ stadiumId }: StadiumDetailProps) => {
  const [selectedTab, setSelectedTab] = useState('분석 리포트 다운');

  const id = Array.isArray(stadiumId) ? Number(stadiumId[0]) : Number(stadiumId);
  const { data: stadium } = useQuery({
    queryKey: ['court', id],
    queryFn: () => fetchCourtDetail(id),
  });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const { data: reportCourts = [] } = useQuery({
    queryKey: ['reportCourts', id],
    queryFn: () => fetchReportCourts(id),
  });

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
