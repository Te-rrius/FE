import { instance } from '../instance';
import { ApiEnvelope } from '@/types/api.type';
import { UserResponse } from '@/types/account/user';

// 회원 정보 조회
export const getUser = async (): Promise<ApiEnvelope<UserResponse>> => {
  const res = await instance.get('/users');
  return res.data;
};
