import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/services/queryKeys';
import { ScheduleResponse } from '@/types/stadium/stadiumDetail';
import { getSchedule, ScheduleParams } from '@/apis/stadium/stadiumDetail';

// 리포트 신청 목록 조회
export const useSchedule = (stadiumId: number, params?: ScheduleParams) => {
  return useQuery<ScheduleResponse>({
    queryKey: queryKeys.schedule(stadiumId, params?.date, params?.courtNumber),
    queryFn: async () => {
      const res = await getSchedule(stadiumId, params);
      return res.data;
    },
  });
};
