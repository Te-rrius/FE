import { instance } from '@/apis/instance';
import { ApiEnvelope, ApiEnvelopeNullable } from '@/types/api.type';
import { ScheduleResponse } from '@/types/stadium/stadiumDetail';

export interface ScheduleParams {
  date?: string;
  courtNumber?: number;
}

// 리포트 신청 목록 조회
export const getSchedule = async (
  stadiumId: number,
  params?: ScheduleParams,
): Promise<ApiEnvelope<ScheduleResponse>> => {
  const res = await instance.get(`/stadiums/${stadiumId}/report-requests`, { params });
  return res.data;
};

// 리포트 신청
export const postReportRequest = async (
  stadiumId: number,
  matchVideoId: number,
): Promise<ApiEnvelopeNullable<null>> => {
  const res = await instance.post(`/stadiums/${stadiumId}/report-requests/${matchVideoId}`);
  return res.data;
};
