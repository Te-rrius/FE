import Dropdown from '@/components/common/Dropdown';
import PageHeader from '@/components/layout/PageHeader';
import { hp, wp } from '@/utils/dimension';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ReportCard from './components/ReportCard';

const dummyReports = [
  { id: 1, date: '2026. 06. 05.' },
  { id: 2, date: '2026. 05. 20.' },
  { id: 3, date: '2026. 05. 10.' },
  { id: 4, date: '2026. 04. 30.' },
];

const MyReportScreen = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selected, setSelected] = useState('최신 순');

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
            {dummyReports.map((report) => (
              <ReportCard key={report.id} date={report.date} />
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
