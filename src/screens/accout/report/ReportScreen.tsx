import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import PageHeader from '@/components/layout/PageHeader';
import Divider from '@/components/common/Divider';
import ReportInfo from './components/ReportInfo';

import ReportDownloadIcon from '@/assets/images/report/reportDownloadIcon.svg';
import SelectArrowIcon from '@/assets/images/report/selectArrowIcon.svg';
import Player1Icon from '@/assets/images/report/player1Icon.svg';
import Player2Icon from '@/assets/images/report/player2Icon.svg';

import { hp, wp } from '@/utils/dimension';
import PoseAnalysis from './components/PoseAnalysis';
import GameAnalysis from './components/GameAnalysis';
import { getReportDetail } from '@/constants/dummySchedule';

type ReportScreenProps = {
  reportId: string | string[];
};

const ReportScreen = ({ reportId }: ReportScreenProps) => {
  const id = Number(Array.isArray(reportId) ? reportId[0] : reportId);
  const detail = getReportDetail(id);

  if (!detail) return null;
  const { report, stadium, courts, schedule, matchSchedules } = detail;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.selectContainer}>
        <PageHeader
          rightContent={
            <Pressable style={styles.headerDownContainer}>
              <Text style={styles.headerDownText}>리포트 다운</Text>
              <ReportDownloadIcon />
            </Pressable>
          }
        />
        <View style={styles.topContainer}>
          <View style={styles.infoContainer}>
            <SelectArrowIcon />
            <Text style={styles.selectText}>
              아래 분석할 <Text style={styles.strongText}>대상을 먼저 선택</Text>해 주세요!
            </Text>
            <SelectArrowIcon />
          </View>
          <View style={styles.playerIcon}>
            {/* 프로필 선택 시 분기 처리 예정 */}
            <Pressable>
              <Player1Icon />
            </Pressable>
            <Pressable>
              <Player2Icon />
            </Pressable>
          </View>
        </View>
        <Divider />
        <View style={styles.reportInfoWrapper}>
          <ReportInfo date={report.date} schedule={schedule} courts={courts} stadium={stadium} />
        </View>
      </View>
      <View style={styles.analysisDetail}>
        <PoseAnalysis />
      </View>
    </ScrollView>
  );
};

export default ReportScreen;

const styles = StyleSheet.create({
  container: {},

  selectContainer: {
    gap: hp(16),
  },

  headerDownContainer: {
    paddingHorizontal: wp(10),
    paddingVertical: hp(6),
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4),
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
  },

  headerDownText: {
    color: '#999999',
    fontFamily: 'Pretendard600',
    fontSize: wp(14),
    lineHeight: hp(20),
    letterSpacing: wp(-0.3),
  },

  topContainer: {
    paddingHorizontal: wp(20),
    gap: hp(16),
    paddingBottom: hp(24),
  },

  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp(14),
    paddingHorizontal: wp(55),
    gap: wp(6),
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
  },

  selectText: {
    color: '#181A1D',
    fontFamily: 'Pretendard600',
    fontSize: wp(13),
    lineHeight: hp(18),
    letterSpacing: wp(-0.3),
  },

  strongText: {
    color: '#4048F7',
  },

  playerIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: wp(60),
  },

  reportInfoWrapper: {
    paddingTop: hp(40),
    paddingBottom: hp(32),
  },

  analysisDetail: {
    paddingHorizontal: wp(20),
    gap: hp(36),
  },
});
