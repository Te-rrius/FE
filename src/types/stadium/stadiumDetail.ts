// 리포트 신청 목록 조회
export interface ScheduleDateResponse {
  date: string;
  dayOfWeek: string;
  hasReport: boolean;
}

export interface ScheduleTimeResponse {
  matchVideoId: number;
  startTime: string;
  endTime: string;
  matchType: 'SINGLES' | 'DOUBLES';
  reportRequested: boolean;
}

export interface ScheduleResponse {
  dates: ScheduleDateResponse[];
  times: ScheduleTimeResponse[];
}
