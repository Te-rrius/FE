import { StyleSheet, Text, View } from 'react-native';
import ReportTitle from './ReportTitle';
import SceneAnalysisIcon from '@/assets/images/report/sceneAnalysisIcon.svg';
import BestSceneIcon from '@/assets/images/report/bestSceneIcon.svg';
import WorstSceneIcon from '@/assets/images/report/worstSceneIcon.svg';
import { hp, wp } from '@/utils/dimension';

const SceneAnalysis = () => {
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
      </View>
      <View style={styles.sceneWrapper}>
        <View style={styles.sceneTitle}>
          <WorstSceneIcon />
          <Text style={styles.titleText}>
            <Text style={styles.worstText}>아쉬운</Text> 장면
          </Text>
        </View>
        {/* 워스트 영상 추가 예정 */}
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
});
