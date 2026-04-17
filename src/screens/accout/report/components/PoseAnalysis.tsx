import { FlatList, StyleSheet, Text, View } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';

import PoseAnalysisIcon from '@/assets/images/report/poseAnalysisIcon.svg';
import ReportTitle from './ReportTitle';
import { hp, wp } from '@/utils/dimension';
import PoseButton from '@/screens/replay/components/PoseButton';
import { useRef, useState } from 'react';
import PoseAnalysisCard from './PoseAnalysisCard';
import ShotIcon from '@/assets/images/report/shotIcon.svg';
import ScoreIcon from '@/assets/images/report/scoreIcon.svg';
import AnalysisStateCard from './AnalysisStateCard';
import { useQuery } from '@tanstack/react-query';
import { DUMMY_REPORT_ANALYSIS } from '@/constants/dummyReportAnalysis';

const POSES = ['포핸드', '백핸드', '서브', '스매시'] as const;

const POSE_VIDEOS = [
  { pose: '포핸드', source: require('@/assets/videos/sampleReportVideo.mp4') },
  { pose: '백핸드', source: require('@/assets/videos/sampleReportVideo2.mp4') },
  { pose: '서브', source: require('@/assets/videos/sampleReportVideo3.mp4') },
  { pose: '스매시', source: require('@/assets/videos/sampleReportVideo4.mp4') },
];

const VideoItem = ({ source }: { source: number }) => {
  const player = useVideoPlayer(source);
  return (
    <View style={styles.videoContainer}>
      <VideoView player={player} style={styles.video} contentFit="cover" nativeControls />
    </View>
  );
};

type PoseAnalysisProps = {
  player: 1 | 2 | null;
};

const PoseAnalysis = ({ player }: PoseAnalysisProps) => {
  const [selectedPose, setSelectedPose] = useState<string | null>(null);
  const flatListRef = useRef<FlatList>(null);

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
              onPress={() => {
                const index = POSES.indexOf(pose);
                setSelectedPose(pose);
                flatListRef.current?.scrollToIndex({ index, animated: true, viewPosition: 0.5 });
              }}
            />
          ))}
        </View>
        <FlatList
          ref={flatListRef}
          data={POSE_VIDEOS}
          horizontal // 가로 스크롤
          showsHorizontalScrollIndicator={false} // 스크롤바 숨김
          keyExtractor={(item) => item.pose}
          renderItem={({ item }) => <VideoItem source={item.source} />}
          ItemSeparatorComponent={() => <View style={{ width: wp(10) }} />} // 아이템 사이 간격
          snapToInterval={wp(350) + wp(10)} // 아이템 너비 + 갭 단위로 스냅
          decelerationRate="fast" // 정확하게 한 칸씩 이동
          contentContainerStyle={{ paddingHorizontal: wp(20) }}
          style={{ marginHorizontal: -wp(20) }} // 부모 패딩 상쇄
          onMomentumScrollEnd={(e) => {
            // 스와이프 후 멈췄을 때
            const index = Math.round(e.nativeEvent.contentOffset.x / (wp(350) + wp(10))); // 현재 인덱스 계산
            setSelectedPose(POSES[index]); // 버튼 선택 상태 동기화
          }}
        />
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
});
