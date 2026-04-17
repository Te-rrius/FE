export interface PoseDetailDto {
  shoulderRotation: { value: number; recommended: number; comment: string };
  spineRotation: { value: number; recommended: number; comment: string };
  waistRotation: { value: number; recommended: number; comment: string };
}

export interface PoseAnalysisDto {
  shotType: string;
  totalScore: string;
  improvePoint: string;
  forehand: PoseDetailDto;
  backhand: PoseDetailDto;
  serve: PoseDetailDto;
  smash: PoseDetailDto;
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
      improvePoint: '허리 회전 교정 시 약 +15점 향상 가능해요',
      forehand: {
        shoulderRotation: { value: 85, recommended: 80, comment: '이상적인 어깨 회전이에요!' },
        spineRotation: { value: 64, recommended: 80, comment: '6° 부족해요. 상체를 더 틀어보세요' },
        waistRotation: { value: 10, recommended: 80, comment: '허리를 더 틀어보세요' },
      },
      backhand: {
        shoulderRotation: { value: 78, recommended: 80, comment: '조금 더 돌려보세요' },
        spineRotation: { value: 80, recommended: 80, comment: '이상적인 척추 회전이에요!' },
        waistRotation: { value: 60, recommended: 80, comment: '20° 부족해요' },
      },
      serve: {
        shoulderRotation: { value: 90, recommended: 80, comment: '훌륭한 어깨 회전이에요!' },
        spineRotation: { value: 75, recommended: 80, comment: '5° 부족해요' },
        waistRotation: { value: 70, recommended: 80, comment: '10° 부족해요' },
      },
      smash: {
        shoulderRotation: { value: 88, recommended: 80, comment: '이상적인 어깨 회전이에요!' },
        spineRotation: { value: 72, recommended: 80, comment: '8° 부족해요' },
        waistRotation: { value: 65, recommended: 80, comment: '15° 부족해요' },
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
      totalScore: '72.0점',
      improvePoint: '어깨 회전 방향을 교정하면 점수가 약 +10점 향상될 수 있어요',
      forehand: {
        shoulderRotation: { value: 70, recommended: 80, comment: '10° 부족해요. 어깨를 더 돌려보세요' },
        spineRotation: { value: 82, recommended: 80, comment: '이상적인 척추 회전이에요!' },
        waistRotation: { value: 55, recommended: 80, comment: '25° 부족해요. 허리를 더 틀어보세요' },
      },
      backhand: {
        shoulderRotation: { value: 65, recommended: 80, comment: '15° 부족해요' },
        spineRotation: { value: 78, recommended: 80, comment: '조금 더 틀어보세요' },
        waistRotation: { value: 50, recommended: 80, comment: '30° 부족해요' },
      },
      serve: {
        shoulderRotation: { value: 75, recommended: 80, comment: '5° 부족해요' },
        spineRotation: { value: 80, recommended: 80, comment: '이상적인 척추 회전이에요!' },
        waistRotation: { value: 60, recommended: 80, comment: '20° 부족해요' },
      },
      smash: {
        shoulderRotation: { value: 72, recommended: 80, comment: '8° 부족해요' },
        spineRotation: { value: 76, recommended: 80, comment: '4° 부족해요' },
        waistRotation: { value: 58, recommended: 80, comment: '22° 부족해요' },
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
