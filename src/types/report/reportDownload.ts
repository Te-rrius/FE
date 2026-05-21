// 리포트 존재 여부
export interface ReportDateResponse {
  date: string;
  dayOfWeek: string;
  hasReport: boolean;
}

// 리포트 시간대 조회
export interface ReportTimeResponse {
  matchVideoId: number;
  startTime: string;
  endTime: string;
  matchType: 'SINGLES' | 'DOUBLES';
  reportRequested: boolean;
}
