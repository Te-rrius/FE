import { DUMMY_COURTS } from './dummyStadium';

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

export interface MatchScheduleDto {
  scheduleId: number;
  date: string;
  hours: string;
  isRequested: boolean;
}

export interface ReportDummyDto {
  reportId: number;
  date: string;
  stadiumId: number;
  courtId: number;
  scheduleId: number;
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

// 리포트 시간대
export const DUMMY_REPORT_SCHEDULES: Record<number, ReportScheduleDto[]> = {
  1: [
    { scheduleId: 1, date: '2026-04-03', hours: '10:00~11:00', gameType: 'SINGLE' },
    { scheduleId: 2, date: '2026-04-04', hours: '12:00~13:00', gameType: 'DOUBLE' },
    { scheduleId: 3, date: '2026-04-04', hours: '12:00~13:00', gameType: 'DOUBLE' },
    { scheduleId: 4, date: '2026-04-07', hours: '12:00~13:00', gameType: 'DOUBLE' },
    { scheduleId: 5, date: '2026-04-10', hours: '12:00~13:00', gameType: 'DOUBLE' },
    { scheduleId: 6, date: '2026-04-12', hours: '14:00~15:00', gameType: 'DOUBLE' },
  ],
  2: [
    { scheduleId: 7, date: '2026-04-06', hours: '10:00~12:00', gameType: 'SINGLE' },
    { scheduleId: 8, date: '2026-04-08', hours: '14:00~15:00', gameType: 'DOUBLE' },
    { scheduleId: 9, date: '2026-04-09', hours: '09:00~13:00', gameType: 'SINGLE' },
    { scheduleId: 10, date: '2026-04-09', hours: '14:00~16:00', gameType: 'DOUBLE' },
  ],
  3: [
    { scheduleId: 11, date: '2026-04-03', hours: '11:00~12:00', gameType: 'SINGLE' },
    { scheduleId: 12, date: '2026-04-03', hours: '13:00~15:00', gameType: 'DOUBLE' },
    { scheduleId: 13, date: '2026-04-04', hours: '10:00~12:00', gameType: 'SINGLE' },
    { scheduleId: 14, date: '2026-04-08', hours: '10:00~11:00', gameType: 'DOUBLE' },
  ],
  4: [
    { scheduleId: 15, date: '2026-04-04', hours: '11:00~12:00', gameType: 'SINGLE' },
    { scheduleId: 16, date: '2026-04-04', hours: '13:00~15:00', gameType: 'DOUBLE' },
    { scheduleId: 17, date: '2026-04-07', hours: '10:00~12:00', gameType: 'SINGLE' },
    { scheduleId: 18, date: '2026-04-09', hours: '10:00~11:00', gameType: 'DOUBLE' },
  ],
};

// 경기 스케줄
export const DUMMY_MATCH_SCHEDULES: Record<number, MatchScheduleDto[]> = {
  1: [
    { scheduleId: 1, date: '2026-04-08', hours: '10:00~11:00', isRequested: false },
    { scheduleId: 2, date: '2026-04-08', hours: '12:00~14:00', isRequested: false },
    { scheduleId: 3, date: '2026-04-08', hours: '15:00~19:00', isRequested: false },
    { scheduleId: 4, date: '2026-04-09', hours: '09:00~10:00', isRequested: false },
    { scheduleId: 5, date: '2026-04-14', hours: '10:00~12:00', isRequested: false },
    { scheduleId: 6, date: '2026-04-14', hours: '13:00~14:00', isRequested: false },
  ],
  2: [
    { scheduleId: 7, date: '2026-04-08', hours: '09:00~10:00', isRequested: false },
    { scheduleId: 8, date: '2026-04-09', hours: '09:00~10:00', isRequested: false },
    { scheduleId: 9, date: '2026-04-10', hours: '16:00~18:00', isRequested: false },
  ],
  3: [
    { scheduleId: 10, date: '2026-04-08', hours: '12:00~13:00', isRequested: false },
    { scheduleId: 11, date: '2026-04-09', hours: '09:00~10:00', isRequested: false },
    { scheduleId: 12, date: '2026-04-10', hours: '11:00~13:00', isRequested: false },
  ],
  4: [
    { scheduleId: 13, date: '2026-04-08', hours: '10:00~11:00', isRequested: false },
    { scheduleId: 14, date: '2026-04-10', hours: '14:00~15:00', isRequested: false },
  ],
};

export const DUMMY_REPORTS: Record<number, ReportDummyDto> = {
  1: { reportId: 1, date: '2025. 12. 01.', stadiumId: 1, courtId: 1, scheduleId: 1 },
  2: { reportId: 2, date: '2025. 12. 17.', stadiumId: 1, courtId: 2, scheduleId: 7 },
  3: { reportId: 3, date: '2026. 03. 06.', stadiumId: 2, courtId: 3, scheduleId: 11 },
  4: { reportId: 4, date: '2026. 03. 27.', stadiumId: 2, courtId: 4, scheduleId: 15 },
};

export const getReportDetail = (reportId: number) => {
  const report = DUMMY_REPORTS[reportId];
  if (!report) return null;

  const stadium = DUMMY_COURTS.find((s) => s.stadiumId === report.stadiumId);
  const courts = DUMMY_REPORT_COURTS[report.courtId];
  const schedule = DUMMY_REPORT_SCHEDULES[report.courtId]?.find((s) => s.scheduleId === report.scheduleId);
  const matchSchedules = DUMMY_MATCH_SCHEDULES[report.courtId];

  return { report, stadium, courts, schedule, matchSchedules };
};
