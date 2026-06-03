export type PlayerTarget = 'PLAYER_ONE' | 'PLAYER_TWO';

export type ShotType = 'FOREHAND' | 'BACKHAND' | 'SERVE';

export type HighlightVideoType = 'WINNING_SHOT' | 'WORST_SHOT';

export interface MotionAnalysis {
  motionAnalysisId: number;
  videoUrl: string;
  shotType: ShotType;
  shotTypeName: string;
  shoulderRotationAngle: number;
  spineRotationAngle: number;
  waistRotationAngle: number;
  shoulderReferenceValue: number;
  shoulderFeedback: string;
  spineReferenceValue: number;
  spineFeedback: string;
  waistReferenceValue: number;
  waistFeedback: string;
  improvementPoint: string;
  score: number;
}

export interface HighlightVideo {
  highlightVideoId: number;
  videoType: HighlightVideoType;
  videoTypeName: string;
  videoUrl: string;
}

export interface ReportDetailResponse {
  reportId: number;
  matchVideoId: number;
  matchDate: string;
  startTime: string;
  endTime: string;
  stadiumName: string;
  courtNumber: number;
  target: PlayerTarget;
  targetName: string;
  maxSpeed: number;
  averageRallyCount: number;
  maxRallyCount: number;
  minRallyCount: number;
  totalShotCount: number;
  firstServeSuccessRate: number;
  secondServeSuccessRate: number;
  firstServeRate: number;
  motionAnalyses: MotionAnalysis[];
  highlightVideos: HighlightVideo[];
}
