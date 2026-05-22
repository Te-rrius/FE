import { instance } from '../instance';
import { ApiEnvelope } from '@/types/api.type';
import { StadiumCourts } from '@/types/stadium/court';

// 구장 상세 조회
export const getStadiumCourts = async (stadiumId: number): Promise<ApiEnvelope<StadiumCourts>> => {
  const res = await instance.get(`/stadiums/${stadiumId}`);
  return res.data;
};
