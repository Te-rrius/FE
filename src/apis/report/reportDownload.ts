import { instance } from '@/apis/instance';
import { ApiEnvelope } from '@/types/api.type';
import { ReportDateResponse } from '@/types/report/reportDownload';

// 리포트 다운로드 목록 조회 - 날짜별 리포트 존재 여부 (8일)
export const getReportDates = async (stadiumId: number): Promise<ApiEnvelope<ReportDateResponse[]>> => {
  const res = await instance.get(`/stadiums/${stadiumId}/report-downloads/dates`);
  return res.data;
};
