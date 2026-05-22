import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import PoseAnalysis from './components/PoseAnalysis';
import GameAnalysis from './components/GameAnalysis';
import SceneAnalysis from './components/SceneAnalysis';
import ReportInfo from './components/ReportInfo';
import { useReportDetailQuery } from './services/useReportDetailQuery';
import { useReportDownload } from './services/useReportDownload';
import PageHeader from '@/components/layout/PageHeader';
import Divider from '@/components/common/Divider';
import { hp, wp } from '@/utils/dimension';
import { PlayerTarget } from '@/types/report/reportDetail';

import ActiveDownloadIcon from '@/assets/images/report/activeDownloadIcon.svg';
import InactiveDownloadIcon from '@/assets/images/report/inactiveDownloadIcon.svg';
import SelectArrowIcon from '@/assets/images/report/selectArrowIcon.svg';
import Player1Icon from '@/assets/images/report/player1Icon.svg';
import Player2Icon from '@/assets/images/report/player2Icon.svg';
import DefaultProfileIcon from '@/assets/images/report/defaultProfileIcon.svg';

const PLAYER_TARGET: Record<1 | 2, PlayerTarget> = {
  1: 'PLAYER_ONE',
  2: 'PLAYER_TWO',
};

type ReportScreenProps = {
  matchVideoId: string | string[];
};

const ReportScreen = ({ matchVideoId }: ReportScreenProps) => {
  const [selectedPlayer, setSelectedPlayer] = useState<1 | 2 | null>(null);
  const PlayerIcon = selectedPlayer === 1 ? Player1Icon : selectedPlayer === 2 ? Player2Icon : DefaultProfileIcon;

  const id = Number(Array.isArray(matchVideoId) ? matchVideoId[0] : matchVideoId);
  const target = selectedPlayer !== null ? PLAYER_TARGET[selectedPlayer] : null;

  const { data: report } = useReportDetailQuery(id, target);
  const { mutate: downloadReport } = useReportDownload();

  return (
    <ScrollView>
      <View style={styles.selectContainer}>
        <PageHeader
          rightContent={
            <Pressable
              style={[styles.headerDownContainer, selectedPlayer !== null && styles.headerDownContainerActive]}
              onPress={() => downloadReport(id)}
              disabled={selectedPlayer === null}
            >
              <Text style={[styles.headerDownText, selectedPlayer !== null && styles.headerDownTextActive]}>
                리포트 다운
              </Text>
              {selectedPlayer !== null ? <ActiveDownloadIcon /> : <InactiveDownloadIcon />}
            </Pressable>
          }
        />
        <View style={styles.topContainer}>
          <View style={styles.infoContainer}>
            <SelectArrowIcon />
            <Text style={styles.selectText}>
              아래 분석할 <Text style={styles.strongText}>대상을 먼저 선택</Text>해 주세요!
            </Text>
            <SelectArrowIcon />
          </View>
          <View style={styles.playerIcon}>
            {/* 프로필 선택 시 분기 처리 예정 */}
            <Pressable
              style={[styles.playerIconWrapper, selectedPlayer === 1 && styles.selectedIconWrapper]}
              onPress={() => setSelectedPlayer(1)}
            >
              <Player1Icon />
            </Pressable>
            <Pressable
              style={[styles.playerIconWrapper, selectedPlayer === 2 && styles.selectedIconWrapper]}
              onPress={() => setSelectedPlayer(2)}
            >
              <Player2Icon />
            </Pressable>
          </View>
        </View>
        <Divider />
        <View style={styles.reportInfoWrapper}>
          <ReportInfo
            ProfileIcon={PlayerIcon}
            date={report?.matchDate ?? ''}
            startTime={report?.startTime}
            endTime={report?.endTime}
            stadiumName={report?.stadiumName}
            selectedPlayer={selectedPlayer}
          />
        </View>
      </View>
      <View style={styles.analysisDetail}>
        <PoseAnalysis player={selectedPlayer} report={report} />
        <GameAnalysis player={selectedPlayer} report={report} />
        <SceneAnalysis player={selectedPlayer} report={report} />
      </View>
    </ScrollView>
  );
};

export default ReportScreen;

const styles = StyleSheet.create({
  selectContainer: {
    gap: hp(16),
  },

  headerDownContainer: {
    paddingHorizontal: wp(10),
    paddingVertical: hp(6),
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4),
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
  },

  headerDownContainerActive: {
    borderColor: '#4048F7',
  },

  headerDownText: {
    color: '#999999',
    fontFamily: 'Pretendard600',
    fontSize: wp(14),
    lineHeight: hp(20),
    letterSpacing: wp(-0.3),
  },

  headerDownTextActive: {
    color: '#4048F7',
  },

  topContainer: {
    paddingHorizontal: wp(20),
    gap: hp(16),
    paddingBottom: hp(24),
  },

  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp(14),
    paddingHorizontal: wp(55),
    gap: wp(6),
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
  },

  selectText: {
    color: '#181A1D',
    fontFamily: 'Pretendard600',
    fontSize: wp(13),
    lineHeight: hp(18),
    letterSpacing: wp(-0.3),
  },

  strongText: {
    color: '#4048F7',
  },

  playerIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: wp(60),
  },

  playerIconWrapper: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'transparent',
  },

  selectedIconWrapper: {
    borderColor: '#4048F7',
  },

  reportInfoWrapper: {
    paddingTop: hp(40),
    paddingBottom: hp(32),
  },

  analysisDetail: {
    paddingHorizontal: wp(20),
    gap: hp(36),
  },
});
