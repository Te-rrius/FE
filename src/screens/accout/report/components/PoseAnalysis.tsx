import { StyleSheet, Text, View } from 'react-native';

import PoseAnalysisIcon from '@/assets/images/report/poseAnalysisIcon.svg';
import ReportTitle from './ReportTitle';
import { hp, wp } from '@/utils/dimension';
import PoseButton from '@/screens/replay/components/PoseButton';
import { useState } from 'react';
import PoseAnalysisCard from './PoseAnalysisCard';
import ShotIcon from '@/assets/images/report/shotIcon.svg';
import ScoreIcon from '@/assets/images/report/scoreIcon.svg';
import AnalysisStateCard from './AnalysisStateCard';
import { useQuery } from '@tanstack/react-query';
import { DUMMY_REPORT_ANALYSIS } from '@/constants/dummyReport';

const POSES = ['포핸드', '백핸드', '서브', '스매시'] as const;

type PoseAnalysisProps = {
  player: 1 | 2 | null;
};

const PoseAnalysis = ({ player }: PoseAnalysisProps) => {
  const [selectedPose, setSelectedPose] = useState<string | null>(null);

  const { data } = useQuery({
    queryKey: ['reportAnalysis', player],
    queryFn: () => DUMMY_REPORT_ANALYSIS[player!],
    enabled: player !== null,
  });

  return (
    <View style={styles.container}>
      <ReportTitle icon={<PoseAnalysisIcon />} title="경기 자세 분석" />
      <View style={styles.allPose}>
        <View style={styles.poseWrapper}>
          {POSES.map((pose) => (
            <PoseButton
              key={pose}
              text={pose}
              selected={selectedPose === pose}
              onPress={() => player && setSelectedPose(pose)}
            />
          ))}
        </View>
        <View style={styles.allCard}>
          <View style={styles.generalCard}>
            <PoseAnalysisCard title="샷 유형" analysisText={data ? data.pose.shotType : '-'} icon={<ShotIcon />} />
            <PoseAnalysisCard title="종합 점수" analysisText={data ? data.pose.totalScore : '-'} icon={<ScoreIcon />} />
          </View>
          <AnalysisStateCard
            title="어깨 회전"
            value={data?.pose.shoulderRotation.value ?? null}
            recommended={80}
            comment={data?.pose.shoulderRotation.comment ?? ''}
          />
          <AnalysisStateCard
            title="척추 회전"
            value={data?.pose.spineRotation.value ?? null}
            recommended={80}
            comment={data?.pose.spineRotation.comment ?? ''}
          />
          <AnalysisStateCard
            title="허리 회전"
            value={data?.pose.waistRotation.value ?? null}
            recommended={80}
            comment={data?.pose.waistRotation.comment ?? ''}
          />
          <View style={styles.upgradeContainer}>
            <Text style={styles.upgradeTitle}>개선 포인트</Text>
            <Text style={styles.upgradeText}>{data?.pose.improvePoint ?? '-'}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default PoseAnalysis;

const styles = StyleSheet.create({
  container: {
    gap: hp(20),
  },

  allPose: {
    gap: hp(12),
  },

  poseWrapper: {
    flexDirection: 'row',
    gap: wp(8),
  },

  allCard: {
    gap: hp(8),
  },

  generalCard: {
    flexDirection: 'row',
    gap: wp(8),
  },

  upgradeContainer: {
    padding: 16,
    backgroundColor: '#F7F7FB',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 20,
    gap: hp(8),
  },

  upgradeTitle: {
    color: '#4048F7',
    fontSize: wp(15),
    fontFamily: 'Pretendard600',
    lineHeight: hp(21.75),
    letterSpacing: wp(-0.375),
  },

  upgradeText: {
    color: '#505050',
    fontSize: wp(14),
    fontFamily: 'Pretendard400',
    lineHeight: hp(20),
    letterSpacing: wp(-0.35),
  },

  upgradeStrongText: {
    fontFamily: 'Pretendard600',
  },
});
