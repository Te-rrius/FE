import { Pressable, StyleSheet, Text, View } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';

import ReportTitle from './ReportTitle';
import SceneAnalysisIcon from '@/assets/images/report/sceneAnalysisIcon.svg';
import BestSceneIcon from '@/assets/images/report/bestSceneIcon.svg';
import WorstSceneIcon from '@/assets/images/report/worstSceneIcon.svg';
import { hp, wp } from '@/utils/dimension';
import { useState } from 'react';
import PlayButtonIcon from '@/assets/images/report/playButtonIcon.svg';
import { LinearGradient } from 'expo-linear-gradient';

type SceneAnalysisProps = {
  player: 1 | 2 | null;
};

const SceneAnalysis = ({ player }: SceneAnalysisProps) => {
  const bestScene = useVideoPlayer(require('@/assets/videos/bestSceneVideo.mp4'));
  const worstScene = useVideoPlayer(require('@/assets/videos/worstSceneVideo.mp4'));
  const [bestPlaying, setBestPlaying] = useState(false);
  const [worstPlaying, setWorstPlaying] = useState(false);

  const onPress = (
    videoPlayer: ReturnType<typeof useVideoPlayer>,
    playing: boolean,
    setPlaying: (v: boolean) => void,
  ) => {
    if (playing) {
      videoPlayer.pause();
    } else {
      videoPlayer.play();
    }
    setPlaying(!playing);
  };

  return (
    <View style={styles.container}>
      <ReportTitle icon={<SceneAnalysisIcon />} title="최고의 장면 / 아쉬운 장면" />
      <View style={styles.sceneWrapper}>
        <View style={styles.sceneTitle}>
          <BestSceneIcon />
          <Text style={styles.titleText}>
            <Text style={styles.bestText}>최고</Text>의 장면
          </Text>
        </View>
        {/* 베스트 영상 추가 예정 */}
        {player !== null ? (
          <View style={styles.videoContainer}>
            <VideoView player={bestScene} style={styles.video} contentFit="cover" />
            {!bestPlaying && (
              <Pressable style={styles.playButton} onPress={() => onPress(bestScene, bestPlaying, setBestPlaying)}>
                <PlayButtonIcon />
              </Pressable>
            )}
          </View>
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
      <View style={styles.sceneWrapper}>
        <View style={styles.sceneTitle}>
          <WorstSceneIcon />
          <Text style={styles.titleText}>
            <Text style={styles.worstText}>아쉬운</Text> 장면
          </Text>
        </View>
        {/* 워스트 영상 추가 예정 */}
        {player !== null ? (
          <View style={styles.videoContainer}>
            <VideoView player={worstScene} style={styles.video} contentFit="cover" />
            {!worstPlaying && (
              <Pressable style={styles.playButton} onPress={() => onPress(worstScene, worstPlaying, setWorstPlaying)}>
                <PlayButtonIcon />
              </Pressable>
            )}
          </View>
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
    borderRadius: 12,
    overflow: 'hidden',
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

  placeholder: {
    width: wp(350),
    height: hp(195),
    borderRadius: 12,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
