import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/services/queryKeys';
import { ReportDateResponse } from '@/types/report/reportDownload';
import { getReportDates } from '@/apis/report/reportDownload';

// 리포트 다운로드 목록 조회 - 날짜·구장별 시간대 목록
export const useReportDates = (stadiumId: number) => {
  return useQuery<ReportDateResponse[]>({
    queryKey: queryKeys.reportDates(stadiumId),
    queryFn: async () => {
      const res = await getReportDates(stadiumId);
      return res.data;
    },
  });
};
