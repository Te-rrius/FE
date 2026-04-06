export interface ReportScheduleDto {
  scheduleId: number;
  date: string;
  hours: string;
  gameType: 'SINGLE' | 'DOUBLE';
}

export const DUMMY_REPORT_SCHEDULES: Record<number, ReportScheduleDto[]> = {
  1: [
    { scheduleId: 1, date: '2026-03-31', hours: '10:00~11:00', gameType: 'SINGLE' },
    { scheduleId: 2, date: '2026-04-02', hours: '12:00~13:00', gameType: 'DOUBLE' },
    { scheduleId: 3, date: '2026-04-03', hours: '12:00~13:00', gameType: 'DOUBLE' },
    { scheduleId: 4, date: '2026-04-05', hours: '12:00~13:00', gameType: 'DOUBLE' },
    { scheduleId: 5, date: '2026-04-06', hours: '12:00~13:00', gameType: 'DOUBLE' },
    { scheduleId: 6, date: '2026-04-06', hours: '12:00~13:00', gameType: 'DOUBLE' },
  ],
  2: [{ scheduleId: 1, date: '2026-04-06', hours: '14:00~15:00', gameType: 'SINGLE' }],
};
