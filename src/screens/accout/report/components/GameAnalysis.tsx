import { StyleSheet, Text, View } from 'react-native';
import ReportTitle from './ReportTitle';
import GameAnalysisIcon from '@/assets/images/report/gameAnalysisIcon.svg';
import GameAnalysisCard from './GameAnalysisCard';
import ServeDataCard from './ServeDataCard';
import { ReportDetailResponse } from '@/types/report/reportDetail';
import { hp, wp } from '@/utils/dimension';

import AvgRallyIcon from '@/assets/images/report/avgRallyIcon.svg';
import MaxRallyIcon from '@/assets/images/report/maxRallyIcon.svg';
import MinRallyIcon from '@/assets/images/report/minRallyIcon.svg';
import TotalShotIcon from '@/assets/images/report/totalShotIcon.svg';
import FirstServeIcon from '@/assets/images/report/firstServeIcon.svg';
import SecondServeIcon from '@/assets/images/report/secondServeIcon.svg';
import ServeMaxSpeedIcon from '@/assets/images/report/serveMaxSpeedIcon.svg';

const GameAnalysis = ({ player, report }: { player: 1 | 2 | null; report: ReportDetailResponse | undefined }) => {
  return (
    <View style={styles.container}>
      <ReportTitle icon={<GameAnalysisIcon />} title="경기 단위 분석" />
      <View style={styles.dataContainer}>
        <View style={styles.containerTitle}>
          <View style={styles.titleLine} />
          <Text style={styles.titleText}>랠리 통계</Text>
        </View>
        <View style={styles.grid}>
          <View style={styles.row}>
            <GameAnalysisCard
              title="평균 랠리 횟수"
              icon={<AvgRallyIcon />}
              analysisText={report ? String(report.averageRallyCount) : '-'}
              unit="회"
            />
            <GameAnalysisCard
              title="최대 랠리 횟수"
              icon={<MaxRallyIcon />}
              analysisText={report ? String(report.maxRallyCount) : '-'}
              unit="회"
            />
          </View>
          <View style={styles.row}>
            <GameAnalysisCard
              status="active"
              title="총 샷 수"
              icon={<TotalShotIcon />}
              analysisText={report ? String(report.totalShotCount) : '-'}
              unit="개"
            />
            <GameAnalysisCard
              title="최소 랠리 횟수"
              icon={<MinRallyIcon />}
              analysisText={report ? String(report.minRallyCount) : '-'}
              unit="회"
            />
          </View>
        </View>
      </View>
      <View style={styles.dataContainer}>
        <View style={styles.containerTitle}>
          <View style={styles.titleLine} />
          <Text style={styles.titleText}>서브 데이터</Text>
        </View>
        <View style={styles.serveGrid}>
          {report ? (
            <>
              <View style={styles.serveRow}>
                <ServeDataCard
                  title="퍼스트 서브 성공률"
                  icon={<FirstServeIcon />}
                  value={report.firstServeSuccessRate}
                />
                <View style={{ flex: 100 - report.firstServeSuccessRate }} />
              </View>
              <View style={styles.serveRow}>
                <ServeDataCard
                  title="세컨드 서브 성공률"
                  icon={<SecondServeIcon />}
                  value={report.secondServeSuccessRate}
                  status="active"
                />
                <View style={{ flex: 100 - report.secondServeSuccessRate }} />
              </View>
              <View style={styles.serveRow}>
                <ServeDataCard
                  title="서브 최고 속도"
                  unit="km/h"
                  icon={<ServeMaxSpeedIcon />}
                  value={report.maxSpeed}
                />
                <View style={{ flex: 90 }} />
              </View>
            </>
          ) : (
            <>
              <View style={[styles.serveRow, { height: hp(111) }]} />
              <View style={[styles.serveRow, { height: hp(111) }]} />
              <View style={[styles.serveRow, { height: hp(111) }]} />
            </>
          )}
        </View>
      </View>
      <View style={styles.dataContainer}>
        <View style={styles.containerTitle}>
          <View style={styles.titleLine} />
          <Text style={styles.titleText}>샷 개수 분석</Text>
        </View>
        <View style={styles.serveGrid}>
          {report ? (
            <>
              <View style={styles.serveRow}>
                <ServeDataCard title="포핸드 개수" icon={<FirstServeIcon />} value={62} height={90} unit="개" />
                <View style={{ flex: 100 - 62 }} />
              </View>
              <View style={styles.serveRow}>
                <ServeDataCard
                  title="백핸드 개수"
                  icon={<SecondServeIcon />}
                  value={37}
                  height={90}
                  status="active"
                  unit="개"
                />
                <View style={{ flex: 100 - 37 }} />
              </View>
            </>
          ) : (
            <>
              <View style={[styles.serveRow, { height: hp(111) }]} />
              <View style={[styles.serveRow, { height: hp(111) }]} />
              <View style={[styles.serveRow, { height: hp(111) }]} />
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default GameAnalysis;

const styles = StyleSheet.create({
  container: {
    gap: hp(12),
  },

  dataContainer: {
    paddingTop: hp(20),
    paddingBottom: hp(12),
    paddingHorizontal: wp(20),
    backgroundColor: '#F5F5F5',
    borderRadius: 24,
    gap: hp(12),
  },

  containerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4),
  },

  titleLine: {
    width: wp(2),
    height: hp(18),
    backgroundColor: '#4048F7',
  },

  titleText: {
    color: '#212121',
    fontSize: wp(18),
    fontFamily: 'Pretendard500',
    lineHeight: hp(25),
    letterSpacing: wp(-0.45),
  },

  grid: {
    gap: hp(8),
  },

  row: {
    flexDirection: 'row',
    gap: wp(8),
  },

  serveGrid: {
    gap: hp(8),
  },

  serveRow: {
    flexDirection: 'row',
    backgroundColor: '#E8E8E8',
    borderRadius: 20,
    overflow: 'hidden',
  },
});
