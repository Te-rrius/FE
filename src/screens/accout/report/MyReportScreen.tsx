import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import ReportList from './components/ReportList';
import Dropdown from '@/components/common/Dropdown';
import PageHeader from '@/components/layout/PageHeader';
import { hp, wp } from '@/utils/dimension';
import { useMyReportsQuery } from './services/useMyReportsQuery';
import { SortOption } from '@/types/report/report';

const SORT_LABEL: Record<string, SortOption> = {
  '최신 순': 'LATEST',
  '오래된 순': 'OLDEST',
};

const MyReportScreen = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selected, setSelected] = useState<string>('최신 순');

  const { data: reports = [] } = useMyReportsQuery(SORT_LABEL[selected]);

  return (
    <View style={styles.container}>
      <PageHeader title="내 리포트" />
      <View style={styles.content}>
        <View style={styles.reportText}>
          <Text style={styles.titleText}>
            <Text style={styles.strongTitle}>{`지피지기(知彼知己),\n`}</Text>
            지금 여기서 시작.
          </Text>
          <Text
            style={styles.subText}
          >{`내 경기를 알아야 다음이 달라집니다.\n내 리포트를 보면서 경기 내용을 분석해 보세요!`}</Text>
        </View>
        <View>
          <Dropdown
            width={wp(116)}
            selectedText={selected}
            dropdownList={['최신 순', '오래된 순']}
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
            selectDropdownHandler={(option) => {
              setSelected(option);
              setIsDropdownOpen(false);
            }}
          />

          <View style={styles.listWrapper}>
            {reports.map((report) => (
              <ReportList
                key={report.reportId}
                date={report.matchDate}
                onPress={() => router.push({ pathname: '/report/[reportId]', params: { reportId: report.reportId } })}
              />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default MyReportScreen;

const styles = StyleSheet.create({
  container: {
    gap: hp(32),
  },

  content: {
    paddingHorizontal: wp(20),
    gap: hp(20),
  },

  reportText: {
    gap: hp(12),
  },

  titleText: {
    color: '#4048F7',
    fontFamily: 'Pretendard500',
    fontSize: wp(24),
    lineHeight: hp(30),
    letterSpacing: wp(-0.6),
  },

  strongTitle: {
    fontFamily: 'Pretendard700',
  },

  subText: {
    color: '#505050',
    fontFamily: 'Pretendard400',
    fontSize: wp(14),
    lineHeight: hp(20),
    letterSpacing: wp(-0.35),
  },

  listWrapper: {
    paddingTop: hp(11),
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: wp(4),
  },
});
