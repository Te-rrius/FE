import type { StadiumResponse, StadiumQueryParams } from '@/types/stadium/stadium';
import { instance } from '../instance';
import { ApiEnvelope } from '@/types/api.type';

// 구장 목록 전체 조회
export const getStadiums = async (params?: StadiumQueryParams): Promise<ApiEnvelope<StadiumResponse[]>> => {
  const res = await instance.get('/stadiums', { params });
  return res.data;
};
