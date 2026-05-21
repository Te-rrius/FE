import { instance } from '@/apis/instance';
import { ApiEnvelope } from '@/types/api.type';
import { ReportDateResponse, ReportTimeResponse } from '@/types/report/reportDownload';

export interface ReportTimesParams {
  date?: string;
  courtNumber?: number;
}

// 리포트 다운로드 목록 조회 - 날짜별 리포트 존재 여부 (8일)
export const getReportDates = async (stadiumId: number): Promise<ApiEnvelope<ReportDateResponse[]>> => {
  const res = await instance.get(`/stadiums/${stadiumId}/report-downloads/dates`);
  return res.data;
};

// 리포트 다운로드 목록 조회 - 날짜·구장별 시간대 목록
export const getReportTimes = async (
  stadiumId: number,
  params?: ReportTimesParams,
): Promise<ApiEnvelope<ReportTimeResponse[]>> => {
  const res = await instance.get(`/stadiums/${stadiumId}/report-downloads/times`, { params });
  return res.data;
};
