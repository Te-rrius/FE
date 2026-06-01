import { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, View, ViewToken } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import ReportTitle from './ReportTitle';
import PoseAnalysisCard from './PoseAnalysisCard';
import AnalysisStateCard from './AnalysisStateCard';
import PoseButton from './PoseButton';
import { hp, wp } from '@/utils/dimension';
import { getComment } from '@/utils/postAnalysisComment';
import { MotionAnalysis, ReportDetailResponse } from '@/types/report/reportDetail';

import PoseAnalysisIcon from '@/assets/images/report/poseAnalysisIcon.svg';
import ShotIcon from '@/assets/images/report/shotIcon.svg';
import ScoreIcon from '@/assets/images/report/scoreIcon.svg';

type PoseAnalysisProps = {
  player: 1 | 2 | null;
  report: ReportDetailResponse | undefined;
};

type VideoItemProps = {
  uri: string;
  shoulderRotationAngle: number | null;
  spineRotationAngle: number | null;
  waistRotationAngle: number | null;
};

const VideoItem = ({ uri, shoulderRotationAngle, spineRotationAngle, waistRotationAngle }: VideoItemProps) => {
  const player = useVideoPlayer({ uri });

  return (
    <View style={styles.videoContainer}>
      <VideoView player={player} style={styles.video} contentFit="cover" />
      <BlurView intensity={10} style={styles.overlay}>
        <View>
          <Text style={styles.labelText}>어깨 회전각</Text>
          <Text style={styles.overlayValue}>
            {shoulderRotationAngle != null ? Math.round(shoulderRotationAngle) : '-'}°
          </Text>
        </View>
        <View>
          <Text style={styles.labelText}>척추 회전각</Text>
          <Text style={styles.overlayValue}>{spineRotationAngle != null ? Math.round(spineRotationAngle) : '-'}°</Text>
        </View>
        <View>
          <Text style={styles.labelText}>허리 회전각</Text>
          <Text style={styles.overlayValue}>{waistRotationAngle != null ? Math.round(waistRotationAngle) : '-'}°</Text>
        </View>
      </BlurView>
    </View>
  );
};

const PoseAnalysis = ({ player, report }: PoseAnalysisProps) => {
  const availableShots = [
    ...new Map(report?.motionAnalyses.map((m) => [m.shotType, m.shotTypeName]) ?? []).entries(),
  ].map(([shotType, shotTypeName]) => ({ shotType, shotTypeName }));

  const [selectedShotType, setSelectedShotType] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList<MotionAnalysis>>(null);

  useEffect(() => {
    if (availableShots.length > 0) {
      const isValid = availableShots.some((s) => s.shotType === selectedShotType);
      if (!isValid) {
        setSelectedShotType(availableShots[0].shotType);
      }
    } else {
      setSelectedShotType(null);
    }
  }, [availableShots, selectedShotType]);

  const handleShotTypeChange = (shotType: string) => {
    setSelectedShotType(shotType);
    setActiveIndex(0);
    flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
  };

  const selectedMotions = report?.motionAnalyses.filter((m) => m.shotType === selectedShotType) ?? [];
  const activeMotion = selectedMotions[activeIndex];

  const selectedPoseData = activeMotion
    ? {
        shoulderRotation: { value: activeMotion.shoulderRotationAngle, recommended: 70 },
        spineRotation: { value: activeMotion.spineRotationAngle, recommended: 35 },
        waistRotation: { value: activeMotion.waistRotationAngle, recommended: 40 },
      }
    : undefined;

  const totalScore = activeMotion?.score ?? null;

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems[0]?.index != null) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 50 }).current;

  return (
    <View style={styles.container}>
      <ReportTitle icon={<PoseAnalysisIcon />} title="경기 자세 분석" />
      <View style={styles.allPose}>
        <View style={styles.poseWrapper}>
          {availableShots.map(({ shotType, shotTypeName }) => (
            <PoseButton
              key={shotType}
              text={shotTypeName}
              selected={selectedShotType === shotType}
              onPress={() => handleShotTypeChange(shotType)}
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
        ) : selectedMotions.length > 0 ? (
          <FlatList
            ref={flatListRef}
            data={selectedMotions}
            keyExtractor={(item) => String(item.motionAnalysisId)}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={wp(350) + wp(12)}
            snapToAlignment="start"
            decelerationRate="fast"
            style={styles.list}
            contentContainerStyle={styles.listContent}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            renderItem={({ item }) => (
              <VideoItem
                uri={item.videoUrl}
                shoulderRotationAngle={item.shoulderRotationAngle}
                spineRotationAngle={item.spineRotationAngle}
                waistRotationAngle={item.waistRotationAngle}
              />
            )}
          />
        ) : null}
        <View style={styles.allCard}>
          <View style={styles.generalCard}>
            <PoseAnalysisCard title="샷 유형" analysisText={activeMotion?.shotTypeName ?? '-'} icon={<ShotIcon />} />
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
            <Text style={styles.upgradeText}>{activeMotion?.improvementPoint ?? '-'}</Text>
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

  list: {
    marginHorizontal: -wp(20),
  },

  listContent: {
    paddingHorizontal: wp(20),
    gap: wp(12),
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
    borderColor: 'rgba(255, 255, 255, 0.80)',
    borderRadius: 12,
    paddingVertical: hp(16),
    paddingHorizontal: wp(12),
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
});
