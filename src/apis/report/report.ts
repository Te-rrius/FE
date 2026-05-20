import { instance } from '../instance';
import { ApiEnvelope } from '@/types/api.type';
import { MyReportResponse, SortOption } from '@/types/report/report';

// 리포트 전체 조회
export const getMyReports = async (sort: SortOption): Promise<ApiEnvelope<MyReportResponse[]>> => {
  const res = await instance.get('/reports/my', { params: { sort } });
  return res.data;
};
