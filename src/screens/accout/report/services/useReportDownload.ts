import { useMutation } from '@tanstack/react-query';
import { postReportDownload } from '@/apis/report/reportDetail';

// 리포트 다운로드
export const useReportDownload = () => {
  return useMutation({
    mutationFn: (matchVideoId: number) => postReportDownload(matchVideoId),
  });
};
