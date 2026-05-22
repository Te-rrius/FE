import { useQuery } from '@tanstack/react-query';
import { getStadiumCourts } from '@/apis/stadium/court';
import { Court } from '@/types/stadium/court';
import { queryKeys } from '@/services/queryKeys';

// 구장 상세 조회
export const useStadiumCourts = (stadiumId: number) => {
  return useQuery({
    queryKey: queryKeys.stadiumCourts(stadiumId),
    queryFn: () => getStadiumCourts(stadiumId),
    select: (res): Court[] =>
      res.data.courtNumbers.map((n) => ({
        courtId: n,
        name: String(n),
      })),
  });
};
