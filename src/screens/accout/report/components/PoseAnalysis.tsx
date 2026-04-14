import { StyleSheet, View } from 'react-native';

import PoseAnalysisIcon from '@/assets/images/report/poseAnalysisIcon.svg';
import ReportTitle from './ReportTitle';
import { hp, wp } from '@/utils/dimension';
import PoseButton from '@/screens/replay/components/PoseButton';
import { useState } from 'react';
import AnalysisCard from './AnalysisCard';
import ShotIcon from '@/assets/images/report/shotIcon.svg';
import ScoreIcon from '@/assets/images/report/scoreIcon.svg';
import AnalysisStateCard from './AnalysisStateCard';

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
          <View style={styles.generalCard}>
            <AnalysisCard title="샷 유형" analysisText="백핸드" icon={<ShotIcon />} />
            <AnalysisCard title="종합 점수" analysisText="00.0점" icon={<ScoreIcon />} />
          </View>
          <AnalysisStateCard title="어깨 회전" value={85} recommended={80} comment="이상적인 어깨 회전이에요!" />
          <AnalysisStateCard
            title="척추 회전"
            value={64}
            recommended={80}
            comment="6° 부족해요. 상체를 더 틀어보세요"
          />
          <AnalysisStateCard
            title="허리 회전"
            value={10}
            recommended={80}
            comment="6° 부족해요. 허리를 더 틀어보세요"
          />
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
    justifyContent: 'space-between',
  },
});
