import { useQuery } from '@tanstack/react-query';
import { getReportTimes, ReportTimesParams } from '@/apis/report/reportDownload';
import { queryKeys } from '@/services/queryKeys';
import { ReportTimeResponse } from '@/types/report/reportDownload';

// 리포트 시간대 조회
export const useReportTimes = (stadiumId: number, params?: ReportTimesParams) => {
  return useQuery<ReportTimeResponse[]>({
    queryKey: queryKeys.reportTimes(stadiumId, params?.date, params?.courtNumber),
    queryFn: async () => {
      const res = await getReportTimes(stadiumId, params);
      return res.data;
    },
  });
};
