import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/services/queryKeys';
import { ReportDateResponse } from '@/types/report/reportDownload';
import { getReportDates } from '@/apis/report/reportDownload';

// 리포트 다운로드 목록 조회 - 날짜별 리포트 존재 여부 (8일)
export const useReportDates = (stadiumId: number) => {
  return useQuery<ReportDateResponse[]>({
    queryKey: queryKeys.reportDates(stadiumId),
    queryFn: async () => {
      const res = await getReportDates(stadiumId);
      return res.data;
    },
  });
};
