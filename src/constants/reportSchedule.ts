export interface ReportScheduleDto {
  scheduleId: number;
  hours: string;
  gameType: 'SINGLE' | 'DOUBLE';
}

export const DUMMY_REPORT_SCHEDULES: Record<number, ReportScheduleDto[]> = {
  1: [
    { scheduleId: 1, hours: '10:00~11:00', gameType: 'SINGLE' },
    { scheduleId: 2, hours: '12:00~13:00', gameType: 'DOUBLE' },
  ],
  2: [{ scheduleId: 3, hours: '14:00~15:00', gameType: 'SINGLE' }],
};
