import { StyleSheet, Text, View } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import ReportTitle from './ReportTitle';
import PoseAnalysisCard from './PoseAnalysisCard';
import AnalysisStateCard from './AnalysisStateCard';
import { hp, wp } from '@/utils/dimension';
import { getComment, getTotalScore } from '@/utils/postAnalysisComment';
import { ReportDetailResponse } from '@/types/report/reportDetail';

import PoseAnalysisIcon from '@/assets/images/report/poseAnalysisIcon.svg';
import ShotIcon from '@/assets/images/report/shotIcon.svg';
import ScoreIcon from '@/assets/images/report/scoreIcon.svg';

type PoseAnalysisProps = {
  player: 1 | 2 | null;
  report: ReportDetailResponse | undefined;
};

const VideoItem = ({ uri }: { uri: string }) => {
  const player = useVideoPlayer({ uri });

  return (
    <View style={styles.videoContainer}>
      <VideoView player={player} style={styles.video} contentFit="cover" />
    </View>
  );
};

const PoseAnalysis = ({ player, report }: PoseAnalysisProps) => {
  const motionVideoUrl = report?.materials.find((m) => m.materialType === 'MOTION')?.videoUrl;

  const selectedPoseData = report
    ? {
        shoulderRotation: { value: report.shoulderRotationAngle, recommended: 70 },
        spineRotation: { value: report.spineRotationAngle, recommended: 40 },
        waistRotation: { value: report.waistRotationAngle, recommended: 55 },
      }
    : undefined;

  const totalScore = selectedPoseData ? getTotalScore(selectedPoseData) : null;

  return (
    <View style={styles.container}>
      <ReportTitle icon={<PoseAnalysisIcon />} title="경기 자세 분석" />
      <View style={styles.allPose}>
        {!player ? (
          <View style={styles.videoContainer}>
            <LinearGradient
              colors={['#E9E9E9', '#FCFCFC']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
            <BlurView intensity={10} style={styles.overlay} />
          </View>
        ) : motionVideoUrl ? (
          <VideoItem uri={motionVideoUrl} />
        ) : null}
        <View style={styles.allCard}>
          <View style={styles.generalCard}>
            <PoseAnalysisCard title="샷 유형" analysisText={report?.shotTypeName ?? '-'} icon={<ShotIcon />} />
            <PoseAnalysisCard
              title="종합 점수"
              analysisText={totalScore != null ? `${totalScore.toFixed(1)}점` : '-'}
              icon={<ScoreIcon />}
            />
          </View>
          <AnalysisStateCard
            title="어깨 회전"
            value={selectedPoseData?.shoulderRotation.value ?? null}
            recommended={selectedPoseData?.shoulderRotation.recommended ?? null}
            comment={selectedPoseData ? getComment('shoulderRotation', selectedPoseData.shoulderRotation) : ''}
          />
          <AnalysisStateCard
            title="척추 회전"
            value={selectedPoseData?.spineRotation.value ?? null}
            recommended={selectedPoseData?.spineRotation.recommended ?? null}
            comment={selectedPoseData ? getComment('spineRotation', selectedPoseData.spineRotation) : ''}
          />
          <AnalysisStateCard
            title="허리 회전"
            value={selectedPoseData?.waistRotation.value ?? null}
            recommended={selectedPoseData?.waistRotation.recommended ?? null}
            comment={selectedPoseData ? getComment('waistRotation', selectedPoseData.waistRotation) : ''}
          />
          <View style={styles.upgradeContainer}>
            <Text style={styles.upgradeTitle}>개선 포인트</Text>
            <Text style={styles.upgradeText}>{report?.improvementPoint ?? '-'}</Text>
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

  videoContainer: {
    width: wp(350),
    aspectRatio: 9 / 16,
    backgroundColor: '#000',
    borderRadius: 12,
    overflow: 'hidden',
  },

  video: {
    width: '100%',
    height: '100%',
  },

  overlay: {
    width: wp(102),
    height: hp(180),
    position: 'absolute',
    bottom: hp(16),
    right: wp(15),
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.10)',
    borderRadius: 12,
    paddingVertical: hp(16),
    paddingHorizontal: wp(12),
    overflow: 'hidden',
    gap: hp(8),
  },
});
