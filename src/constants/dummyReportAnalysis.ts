export interface PoseDetailDto {
  value: number;
  recommended: number;
}

export interface ShotPoseDto {
  shoulderRotation: PoseDetailDto;
  spineRotation: PoseDetailDto;
  waistRotation: PoseDetailDto;
}

export interface PoseAnalysisDto {
  shotType: string;
  forehand?: ShotPoseDto;
  backhand?: ShotPoseDto;
  serve?: ShotPoseDto;
  smash?: ShotPoseDto;
}

export interface GameAnalysisDto {
  avgRally: number;
  maxRally: number;
  totalShot: number;
  minRally: number;
  firstServeRate: number;
  secondServeRate: number;
  serveMaxSpeed: number;
}

export interface ReportAnalysisDto {
  pose: PoseAnalysisDto;
  game: GameAnalysisDto;
}

// reportId → 분석 데이터
export const DUMMY_REPORT_ANALYSIS: Record<number, ReportAnalysisDto> = {
  1: {
    pose: {
      shotType: '백핸드',
      backhand: {
        shoulderRotation: { value: 78, recommended: 80 },
        spineRotation: { value: 80, recommended: 80 },
        waistRotation: { value: 60, recommended: 80 },
      },
    },
    game: {
      avgRally: 18,
      maxRally: 24,
      totalShot: 342,
      minRally: 5,
      firstServeRate: 72,
      secondServeRate: 80,
      serveMaxSpeed: 185,
    },
  },
  2: {
    pose: {
      shotType: '포핸드',
      forehand: {
        shoulderRotation: { value: 70, recommended: 80 },
        spineRotation: { value: 82, recommended: 80 },
        waistRotation: { value: 55, recommended: 80 },
      },
      backhand: {
        shoulderRotation: { value: 65, recommended: 80 },
        spineRotation: { value: 78, recommended: 80 },
        waistRotation: { value: 50, recommended: 80 },
      },
      serve: {
        shoulderRotation: { value: 75, recommended: 80 },
        spineRotation: { value: 80, recommended: 80 },
        waistRotation: { value: 60, recommended: 80 },
      },
      smash: {
        shoulderRotation: { value: 72, recommended: 80 },
        spineRotation: { value: 76, recommended: 80 },
        waistRotation: { value: 58, recommended: 80 },
      },
    },
    game: {
      avgRally: 180,
      maxRally: 30,
      totalShot: 280,
      minRally: 12,
      firstServeRate: 65,
      secondServeRate: 45,
      serveMaxSpeed: 185,
    },
  },
};
