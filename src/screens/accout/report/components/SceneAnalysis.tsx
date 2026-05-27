import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { LinearGradient } from 'expo-linear-gradient';
import ReportTitle from './ReportTitle';
import { hp, wp } from '@/utils/dimension';
import { HighlightVideo, ReportDetailResponse } from '@/types/report/reportDetail';

import SceneAnalysisIcon from '@/assets/images/report/sceneAnalysisIcon.svg';
import BestSceneIcon from '@/assets/images/report/bestSceneIcon.svg';
import WorstSceneIcon from '@/assets/images/report/worstSceneIcon.svg';
import PlayButtonIcon from '@/assets/images/report/playButtonIcon.svg';

type SceneAnalysisProps = {
  player: 1 | 2 | null;
  report: ReportDetailResponse | undefined;
};

const VideoItem = ({ uri }: { uri: string }) => {
  const player = useVideoPlayer({ uri });
  const [playing, setPlaying] = useState(false);

  const handlePress = () => {
    if (playing) {
      player.pause();
    } else {
      player.play();
    }
    setPlaying(!playing);
  };

  return (
    <View style={styles.videoContainer}>
      <VideoView player={player} style={styles.video} contentFit="cover" />
      {!playing && (
        <Pressable style={styles.playButton} onPress={handlePress}>
          <PlayButtonIcon />
        </Pressable>
      )}
    </View>
  );
};

type SceneSectionProps = {
  player: 1 | 2 | null;
  videos: HighlightVideo[];
  titleIcon: React.ReactNode;
  titleText: React.ReactNode;
};

const SceneSection = ({ player, videos, titleIcon, titleText }: SceneSectionProps) => {
  return (
    <View style={styles.sceneWrapper}>
      <View style={styles.sceneTitle}>
        {titleIcon}
        <Text style={styles.titleText}>{titleText}</Text>
      </View>
      {player !== null && videos.length > 0 ? (
        <FlatList
          data={videos}
          keyExtractor={(item) => String(item.highlightVideoId)}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          snapToInterval={wp(350) + wp(12)}
          snapToAlignment="start"
          decelerationRate="fast"
          renderItem={({ item }) => <VideoItem uri={item.videoUrl} />}
        />
      ) : (
        <LinearGradient
          colors={['#E9E9E9', '#FCFCFC']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.placeholder}
        >
          <PlayButtonIcon />
        </LinearGradient>
      )}
    </View>
  );
};

const SceneAnalysis = ({ player, report }: SceneAnalysisProps) => {
  const winningVideos = report?.highlightVideos.filter((v) => v.videoType === 'WINNING_SHOT') ?? [];
  const worstVideos = report?.highlightVideos.filter((v) => v.videoType === 'WORST_SHOT') ?? [];

  return (
    <View style={styles.container}>
      <ReportTitle icon={<SceneAnalysisIcon />} title="최고의 장면 / 아쉬운 장면" />
      <SceneSection
        player={player}
        videos={winningVideos}
        titleIcon={<BestSceneIcon />}
        titleText={
          <>
            <Text style={styles.bestText}>최고</Text>의 장면
          </>
        }
      />
      <SceneSection
        player={player}
        videos={worstVideos}
        titleIcon={<WorstSceneIcon />}
        titleText={
          <>
            <Text style={styles.worstText}>아쉬운</Text> 장면
          </>
        }
      />
    </View>
  );
};

export default SceneAnalysis;

const styles = StyleSheet.create({
  container: {
    gap: hp(16),
  },

  sceneWrapper: {
    gap: hp(8),
  },

  sceneTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4),
  },

  titleText: {
    color: '#212121',
    fontFamily: 'Pretendard600',
    fontSize: wp(16),
    lineHeight: hp(24),
    letterSpacing: wp(-0.4),
  },

  bestText: {
    color: '#43A047',
  },

  worstText: {
    color: '#E65100',
  },

  video: {
    width: wp(350),
    height: hp(195),
  },

  videoContainer: {
    width: wp(350),
    height: hp(195),
    borderRadius: 12,
    overflow: 'hidden',
  },

  playButton: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },

  list: {
    marginHorizontal: -wp(20),
  },

  listContent: {
    paddingHorizontal: wp(20),
    gap: wp(12),
  },

  placeholder: {
    width: wp(350),
    height: hp(195),
    borderRadius: 12,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
