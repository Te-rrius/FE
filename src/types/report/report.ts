// 리포트 전체 조회
export interface MyReportResponse {
  reportId: number;
  matchDate: string;
}

export type SortOption = 'LATEST' | 'OLDEST';
