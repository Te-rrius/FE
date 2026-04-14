import { StyleSheet, View } from 'react-native';

import PoseAnalysisIcon from '@/assets/images/report/poseAnalysisIcon.svg';
import ReportTitle from './ReportTitle';
import { hp, wp } from '@/utils/dimension';
import PoseButton from '@/screens/replay/components/PoseButton';
import { useState } from 'react';
import AnalysisCard from './AnalysisCard';
import ShotIcon from '@/assets/images/report/shotIcon.svg';
import ScoreIcon from '@/assets/images/report/scoreIcon.svg';

const POSES = ['포핸드', '백핸드', '서브', '스매시'] as const;

const PoseAnalysis = () => {
  const [selectedPose, setSelectedPose] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <ReportTitle icon={<PoseAnalysisIcon />} title="경기 자세 분석" />
      <View style={styles.allPose}>
        <View style={styles.poseWrapper}>
          {POSES.map((pose) => (
            <PoseButton key={pose} text={pose} selected={selectedPose === pose} onPress={() => setSelectedPose(pose)} />
          ))}
        </View>
        {/* 영상 삽입 예정 */}
        <View style={styles.allCard}>
          <AnalysisCard title="샷 유형" analysisText="백핸드" icon={<ShotIcon />} />
          <AnalysisCard title="종합 점수" analysisText="00.0점" icon={<ScoreIcon />} />
        </View>
      </View>
    </View>
  );
};

export default PoseAnalysis;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(20),
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
