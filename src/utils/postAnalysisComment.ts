export type PoseStatus = '양호' | '보통' | '개선 필요';

export interface PoseDetail {
  value: number;
  recommended: number;
}

export interface PoseData {
  shoulderRotation: PoseDetail;
  spineRotation: PoseDetail;
  waistRotation: PoseDetail;
}

type RotationKey = keyof PoseData;

export interface ImprovePointResult {
  text: string;
  gainText: string;
}

const ROTATION_LABEL: Record<RotationKey, string> = {
  shoulderRotation: '어깨 회전',
  spineRotation: '척추 회전',
  waistRotation: '허리 회전',
};

// 항목 점수 (0~100)
export function getItemScore({ value, recommended }: PoseDetail): number {
  if (value <= 0) return 0;
  const rate = (value / recommended) * 100;
  if (rate <= 100) return rate;
  const score = 100 - (rate - 100);
  return Math.max(0, score);
}

// 상태
export function getStatus({ value, recommended }: PoseDetail): PoseStatus {
  if (value <= 0) return '개선 필요';
  const rate = (value / recommended) * 100;
  if (rate >= 93 && rate <= 107) return '양호';
  if (rate >= 80 && rate <= 120) return '보통';
  return '개선 필요';
}

// 종합 점수
export function getTotalScore(pose: PoseData): number {
  const scores = [
    getItemScore(pose.shoulderRotation),
    getItemScore(pose.spineRotation),
    getItemScore(pose.waistRotation),
  ];
  return scores.reduce((acc, s) => acc + s, 0) / 3;
}

// 개선 포인트
export function getImprovePoint(pose: PoseData): ImprovePointResult | { text: string; gainText: null } {
  const keys: RotationKey[] = ['shoulderRotation', 'spineRotation', 'waistRotation'];
  const scores = keys.map((key) => ({ key, score: getItemScore(pose[key]) }));

  const allGood = keys.every((key) => getStatus(pose[key]) === '양호');
  if (allGood) return { text: '전체적으로 좋은 자세예요!', gainText: null };

  const lowest = scores.reduce((acc, cur) => (cur.score < acc.score ? cur : acc));
  const others = scores.filter(({ key }) => key !== lowest.key);
  const improvedTotal = (others[0].score + others[1].score + 100) / 3;
  const current = getTotalScore(pose);
  const gain = Math.round(improvedTotal - current);

  return {
    text: `${ROTATION_LABEL[lowest.key]}을 교정하면 점수가 약 `,
    gainText: `+${gain}점`,
  };
}
