import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postReportRequest } from '@/apis/stadium/stadiumDetail';
import { queryKeys } from '@/services/queryKeys';

interface ReportRequestParams {
  stadiumId: number;
  matchVideoId: number;
}

// 리포트 신청
export const useReportRequest = () =>
  useMutation({
    mutationFn: ({ stadiumId, matchVideoId }: ReportRequestParams) => postReportRequest(stadiumId, matchVideoId),
  });
