import { getMyReports } from '@/apis/report/report';
import { queryKeys } from '@/services/queryKeys';
import { SortOption } from '@/types/report/report';
import { useQuery } from '@tanstack/react-query';

// 리포트 전체 조회
export const useMyReportsQuery = (sort: SortOption) => {
  return useQuery({
    queryKey: queryKeys.myReports(sort),
    queryFn: () => getMyReports(sort),
    select: (res) => res.data,
  });
};
