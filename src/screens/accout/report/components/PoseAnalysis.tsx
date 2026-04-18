import { FlatList, StyleSheet, Text, View } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { BlurView } from 'expo-blur';

import PoseAnalysisIcon from '@/assets/images/report/poseAnalysisIcon.svg';
import ReportTitle from './ReportTitle';
import { hp, wp } from '@/utils/dimension';
import PoseButton from '@/screens/replay/components/PoseButton';
import { useEffect, useRef, useState } from 'react';
import PoseAnalysisCard from './PoseAnalysisCard';
import ShotIcon from '@/assets/images/report/shotIcon.svg';
import ScoreIcon from '@/assets/images/report/scoreIcon.svg';
import AnalysisStateCard from './AnalysisStateCard';
import { useQuery } from '@tanstack/react-query';
import { DUMMY_REPORT_ANALYSIS, ShotPoseDto } from '@/constants/dummyReportAnalysis';
import { LinearGradient } from 'expo-linear-gradient';
import { getComment, getImprovePoint, getTotalScore } from '@/utils/postAnalysisComment';

const POSE_KEYS = ['forehand', 'backhand', 'serve', 'smash'] as const;
type PoseKey = (typeof POSE_KEYS)[number];

const POSE_LABEL: Record<PoseKey, string> = {
  forehand: '포핸드',
  backhand: '백핸드',
  serve: '서브',
  smash: '스매시',
};

const POSE_VIDEOS: Record<PoseKey, number> = {
  forehand: require('@/assets/videos/sampleReportVideo.mp4'),
  backhand: require('@/assets/videos/sampleReportVideo3.mp4'),
  serve: require('@/assets/videos/sampleReportVideo4.mp4'),
  smash: require('@/assets/videos/sampleReportVideo2.mp4'),
};

const VideoItem = ({ source, data }: { source: number; data?: ShotPoseDto }) => {
  const player = useVideoPlayer(source);

  return (
    <View style={styles.videoContainer}>
      <VideoView player={player} style={styles.video} contentFit="cover" />
      <BlurView intensity={10} style={styles.overlay}>
        <View>
          <Text style={styles.labelText}>어깨 회전각</Text>
          <Text style={styles.overlayValue}>{data?.shoulderRotation.value ?? '-'}°</Text>
        </View>
        <View>
          <Text style={styles.labelText}>척추 회전각</Text>
          <Text style={styles.overlayValue}>{data?.spineRotation.value ?? '-'}°</Text>
        </View>
        <View>
          <Text style={styles.labelText}>허리 회전각</Text>
          <Text style={styles.overlayValue}>{data?.waistRotation.value ?? '-'}°</Text>
        </View>
      </BlurView>
    </View>
  );
};

type PoseAnalysisProps = {
  player: 1 | 2 | null;
};

const PoseAnalysis = ({ player }: PoseAnalysisProps) => {
  const [selectedPoseKey, setSelectedPoseKey] = useState<PoseKey | null>(null);
  const flatListRef = useRef<FlatList>(null);

  const { data } = useQuery({
    queryKey: ['reportAnalysis', player],
    queryFn: () => DUMMY_REPORT_ANALYSIS[player!],
    enabled: player !== null,
  });

  const availablePoseKeys = POSE_KEYS.filter((key) => data?.pose[key] != null);
  const selectedPoseData = selectedPoseKey ? data?.pose[selectedPoseKey] : undefined;

  const totalScore = selectedPoseData ? getTotalScore(selectedPoseData) : null;
  const improvePoint = selectedPoseData ? getImprovePoint(selectedPoseData) : null;

  useEffect(() => {
    if (data) {
      setSelectedPoseKey(availablePoseKeys[0] ?? null);
    } else {
      setSelectedPoseKey(null);
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <ReportTitle icon={<PoseAnalysisIcon />} title="경기 자세 분석" />
      <View style={styles.allPose}>
        <View style={styles.poseWrapper}>
          {availablePoseKeys.map((key) => (
            <PoseButton
              key={key}
              text={POSE_LABEL[key]}
              selected={selectedPoseKey === key}
              onPress={() => {
                if (!player) return;
                const index = availablePoseKeys.indexOf(key);
                setSelectedPoseKey(key);
                flatListRef.current?.scrollToIndex({ index, animated: true, viewPosition: 0.5 });
              }}
            />
          ))}
        </View>
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
        ) : (
          <FlatList<PoseKey>
            ref={flatListRef}
            data={availablePoseKeys}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(key) => key}
            renderItem={({ item: key }) => <VideoItem source={POSE_VIDEOS[key]} data={data?.pose[key]} />}
            ItemSeparatorComponent={() => <View style={{ width: wp(10) }} />}
            snapToInterval={wp(350) + wp(10)}
            decelerationRate="fast"
            contentContainerStyle={{ paddingHorizontal: wp(20) }}
            style={{ marginHorizontal: -wp(20) }}
            onMomentumScrollEnd={(e) => {
              const index = Math.round(e.nativeEvent.contentOffset.x / (wp(350) + wp(10)));
              setSelectedPoseKey(availablePoseKeys[index]);
            }}
          />
        )}
        <View style={styles.allCard}>
          <View style={styles.generalCard}>
            <PoseAnalysisCard title="샷 유형" analysisText={data?.pose.shotType ?? '-'} icon={<ShotIcon />} />
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
            <Text style={styles.upgradeText}>
              {improvePoint?.gainText === null ? (
                improvePoint.text
              ) : (
                <>
                  {improvePoint?.text}
                  <Text style={styles.upgradeStrongText}>{improvePoint?.gainText}</Text>
                  {' 향상될 수 있어요'}
                </>
              )}
            </Text>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    overflow: 'hidden',
    gap: hp(8),
  },

  labelText: {
    color: '#FFFFFF',
    fontSize: wp(13),
    fontFamily: 'Pretendard400',
    lineHeight: hp(18.85),
    letterSpacing: wp(-0.325),
  },

  overlayValue: {
    color: '#fff',
    fontSize: wp(18),
    fontFamily: 'Pretendard600',
    lineHeight: hp(25.2),
    letterSpacing: wp(-0.45),
  },

  placeholderWrapper: {
    width: wp(350),
    height: hp(620),
    borderRadius: 8,
  },

  placeholder: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});
