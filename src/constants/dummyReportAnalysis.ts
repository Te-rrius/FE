export interface PoseAnalysisDto {
  shotType: string;
  totalScore: string;
  shoulderRotation: { value: number; recommended: number; comment: string };
  spineRotation: { value: number; recommended: number; comment: string };
  waistRotation: { value: number; recommended: number; comment: string };
  improvePoint: string;
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
      totalScore: '87.5점',
      shoulderRotation: { value: 85, recommended: 80, comment: '이상적인 어깨 회전이에요!' },
      spineRotation: { value: 64, recommended: 80, comment: '6° 부족해요. 상체를 더 틀어보세요' },
      waistRotation: { value: 10, recommended: 80, comment: '허리를 더 틀어보세요' },
      improvePoint: '허리 회전 교정 시 약 +15점 향상 가능해요',
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
      totalScore: '72.0점',
      shoulderRotation: { value: 70, recommended: 80, comment: '10° 부족해요. 어깨를 더 돌려보세요' },
      spineRotation: { value: 82, recommended: 80, comment: '이상적인 척추 회전이에요!' },
      waistRotation: { value: 55, recommended: 80, comment: '25° 부족해요. 허리를 더 틀어보세요' },
      improvePoint: '어깨 회전 방향을 교정하면 점수가 약 +10점 향상될 수 있어요',
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
