// 리포트 전체 조회
export interface MyReportResponse {
  reportId: number;
  // matchVideoId: number; // 요청 예정
  matchDate: string;
}

export type SortOption = 'LATEST' | 'OLDEST';
