import { instance } from '../instance';
import { ApiEnvelope } from '@/types/api.type';
import { PlayerTarget, ReportDetailResponse } from '@/types/report/reportDetail';

// 리포트 상세 조회
export const getReportDetail = async (
  matchVideoId: number,
  target: PlayerTarget,
): Promise<ApiEnvelope<ReportDetailResponse>> => {
  const res = await instance.get(`/reports/match-videos/${matchVideoId}`, {
    params: { target },
  });
  return res.data;
};
