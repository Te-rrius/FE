export interface CourtDto {
  courtId: number;
  name: string;
}

export interface ReportScheduleDto {
  scheduleId: number;
  date: string;
  hours: string;
  gameType: 'SINGLE' | 'DOUBLE';
}

// 구역명
export const DUMMY_REPORT_COURTS: Record<number, CourtDto[]> = {
  1: [
    { courtId: 1, name: '1코트' },
    { courtId: 2, name: '2코트' },
  ],
  2: [
    { courtId: 3, name: 'A코트' },
    { courtId: 4, name: 'B코트' },
  ],
};

// 시간대
export const DUMMY_REPORT_SCHEDULES: Record<number, ReportScheduleDto[]> = {
  1: [
    { scheduleId: 1, date: '2026-03-31', hours: '10:00~11:00', gameType: 'SINGLE' },
    { scheduleId: 2, date: '2026-04-02', hours: '12:00~13:00', gameType: 'DOUBLE' },
    { scheduleId: 3, date: '2026-04-03', hours: '12:00~13:00', gameType: 'DOUBLE' },
    { scheduleId: 4, date: '2026-04-05', hours: '12:00~13:00', gameType: 'DOUBLE' },
    { scheduleId: 5, date: '2026-04-06', hours: '12:00~13:00', gameType: 'DOUBLE' },
    { scheduleId: 6, date: '2026-04-06', hours: '14:00~15:00', gameType: 'DOUBLE' },
  ],
  2: [{ scheduleId: 7, date: '2026-04-06', hours: '14:00~15:00', gameType: 'SINGLE' }],
  3: [{ scheduleId: 8, date: '2026-04-07', hours: '09:00~10:00', gameType: 'SINGLE' }],
  4: [{ scheduleId: 9, date: '2026-04-07', hours: '11:00~12:00', gameType: 'DOUBLE' }],
};
