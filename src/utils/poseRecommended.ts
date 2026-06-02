type PoseRecommended = {
  shoulderRotation: number;
  spineRotation: number;
  waistRotation: number;
};

const POSE_RECOMMENDED: Record<string, PoseRecommended> = {
  FOREHAND: {
    shoulderRotation: 16,
    spineRotation: 10,
    waistRotation: 10,
  },

  BACKHAND: {
    shoulderRotation: 12,
    spineRotation: 7,
    waistRotation: 11,
  },
};

const DEFAULT_POSE_RECOMMENDED: PoseRecommended = {
  shoulderRotation: 35,
  spineRotation: 45,
  waistRotation: 30,
};

export const getPoseRecommended = (shotType: string): PoseRecommended =>
  POSE_RECOMMENDED[shotType] ?? DEFAULT_POSE_RECOMMENDED;
