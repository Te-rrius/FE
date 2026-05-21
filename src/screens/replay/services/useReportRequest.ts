import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postReportRequest } from '@/apis/stadium/stadiumDetail';
import { queryKeys } from '@/services/queryKeys';

interface ReportRequestParams {
  stadiumId: number;
  matchVideoId: number;
}

// 리포트 신청
export const useReportRequest = (date?: string, courtNumber?: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ stadiumId, matchVideoId }: ReportRequestParams) => postReportRequest(stadiumId, matchVideoId),
    onSuccess: (_, { stadiumId }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.schedule(stadiumId, date, courtNumber),
      });
    },
  });
};
