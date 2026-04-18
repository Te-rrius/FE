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

// 문구
export function getComment(key: RotationKey, detail: PoseDetail): string {
  const { value, recommended } = detail;
  const status = getStatus(detail);
  const diff = Math.abs(Math.round(recommended - value));

  if (value <= 0) return '반대 방향으로 회전되고 있어요. 방향을 확인해보세요.';

  const rate = (value / recommended) * 100;
  const isUnder = rate < 93;
  const isOver = rate > 107;

  const label = ROTATION_LABEL[key];

  const bodyPart = key === 'shoulderRotation' ? '어깨를' : key === 'spineRotation' ? '상체를' : '허리를';

  if (status === '양호') return `이상적인 ${label}이에요!`;

  if (isUnder) {
    if (status === '개선 필요') return `${diff}° 부족해요. ${bodyPart} 더 틀어보세요.`;
    return `${diff}° 부족해요. ${bodyPart} 더 틀어보세요.`;
  }

  if (isOver) {
    if (status === '개선 필요') return `${diff}°나 초과됐어요. 회전 범위를 크게 줄여야 해요.`;
    return `${diff}°만큼 과도해요. 회전을 조금 줄여보세요.`;
  }

  return '';
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
export function getImprovePoint(pose: PoseData): string {
  const keys: RotationKey[] = ['shoulderRotation', 'spineRotation', 'waistRotation'];
  const scores = keys.map((key) => ({ key, score: getItemScore(pose[key]) }));

  const allGood = scores.every(({ key }) => getStatus(pose[key]) === '양호');
  if (allGood) return '전체적으로 좋은 자세예요!';

  const lowest = scores.reduce((acc, cur) => (cur.score < acc.score ? cur : acc));
  const others = scores.filter(({ key }) => key !== lowest.key);
  const improvedTotal = (others[0].score + others[1].score + 100) / 3;
  const current = getTotalScore(pose);
  const gain = Math.round(improvedTotal - current);

  return `${ROTATION_LABEL[lowest.key]}을 교정하면 점수가 약 +${gain}점 향상될 수 있어요`;
}
