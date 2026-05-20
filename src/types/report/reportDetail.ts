// 리포트 상세 조회
export type PlayerTarget = 'PLAYER_ONE' | 'PLAYER_TWO';

export interface MaterialResponse {
  materialType: 'MOTION' | 'WINNING_SHOT' | 'WORST_SHOT';
  materialTypeName: string;
  videoUrl: string;
}

export interface ReportDetailResponse {
  reportId: number;
  matchVideoId: number;
  matchDate: string;
  startTime: string;
  endTime: string;
  stadiumName: string;
  target: PlayerTarget;
  targetName: string;
  shotType: string;
  shotTypeName: string;
  maxSpeed: number;
  shoulderRotationAngle: number;
  spineRotationAngle: number;
  waistRotationAngle: number;
  averageRallyCount: number;
  maxRallyCount: number;
  minRallyCount: number;
  totalShotCount: number;
  improvementPoint: string;
  firstServeSuccessRate: number;
  secondServeSuccessRate: number;
  firstServeRate: number;
  materials: MaterialResponse[];
}
