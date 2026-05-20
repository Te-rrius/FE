import { useQuery } from '@tanstack/react-query';
import { getReportDetail } from '@/apis/report/reportDetail';
import { queryKeys } from '@/services/queryKeys';
import { PlayerTarget } from '@/types/report/reportDetail';

export const useReportDetailQuery = (matchVideoId: number, target: PlayerTarget | null) => {
  return useQuery({
    queryKey: queryKeys.reportDetail(matchVideoId, target),
    queryFn: () => getReportDetail(matchVideoId, target!),
    select: (res) => res.data,
    enabled: target !== null,
  });
};
