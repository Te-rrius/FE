import { DUMMY_STADIUMS } from './dummyStadium';

// 코트
export interface CourtDto {
  courtId: number;
  name: string;
}

// StadiumId → 코트 목록
export const DUMMY_COURTS: Record<number, CourtDto[]> = {
  1: [
    { courtId: 1, name: '1코트' },
    { courtId: 2, name: '2코트' },
  ],
  2: [
    { courtId: 3, name: 'A코트' },
    { courtId: 4, name: 'B코트' },
  ],
};

// 스케줄
export interface ScheduleDto {
  scheduleId: number; // 전역 유일
  courtId: number;
  date: string;
  hours: string;
  gameType: 'SINGLE' | 'DOUBLE';
  isRequested: boolean;
  reportId?: number; // 신청 후 리포트 완성되면 생김
}

// courtId → 경기 목록
export const DUMMY_SCHEDULES: Record<number, ScheduleDto[]> = {
  // 1코트
  1: [
    {
      scheduleId: 1,
      courtId: 1,
      date: '2026-04-12',
      hours: '10:00~11:00',
      gameType: 'SINGLE',
      isRequested: true,
      reportId: 1,
    },
    {
      scheduleId: 2,
      courtId: 1,
      date: '2026-04-16',
      hours: '12:00~13:00',
      gameType: 'DOUBLE',
      isRequested: true,
      reportId: 2,
    },
    { scheduleId: 3, courtId: 1, date: '2026-04-14', hours: '15:00~19:00', gameType: 'SINGLE', isRequested: false },
    { scheduleId: 4, courtId: 1, date: '2026-04-15', hours: '09:00~10:00', gameType: 'DOUBLE', isRequested: false },
  ],
  // 2코트
  2: [
    {
      scheduleId: 5,
      courtId: 2,
      date: '2026-04-13',
      hours: '10:00~12:00',
      gameType: 'SINGLE',
      isRequested: true,
      reportId: 3,
    },
    { scheduleId: 6, courtId: 2, date: '2026-04-13', hours: '14:00~15:00', gameType: 'DOUBLE', isRequested: false },
  ],
  // A코트
  3: [
    {
      scheduleId: 7,
      courtId: 3,
      date: '2026-04-15',
      hours: '11:00~12:00',
      gameType: 'SINGLE',
      isRequested: true,
      reportId: 4,
    },
    { scheduleId: 8, courtId: 3, date: '2026-04-15', hours: '09:00~10:00', gameType: 'DOUBLE', isRequested: false },
  ],
  // B코트
  4: [
    { scheduleId: 9, courtId: 4, date: '2026-04-15', hours: '11:00~12:00', gameType: 'SINGLE', isRequested: false },
    { scheduleId: 10, courtId: 4, date: '2026-04-18', hours: '10:00~12:00', gameType: 'DOUBLE', isRequested: false },
  ],
};

// 리포트
export interface ReportDto {
  reportId: number;
  scheduleId: number; // 경기와 리포트는 무조건 일대일
  stadiumId: number;
  courtId: number;
  date: string;
}

// reportId → 리포트
export const DUMMY_REPORTS: Record<number, ReportDto> = {
  1: { reportId: 1, scheduleId: 1, stadiumId: 1, courtId: 1, date: '2026. 04. 13.' },
  2: { reportId: 2, scheduleId: 2, stadiumId: 1, courtId: 1, date: '2026. 04. 14.' },
  3: { reportId: 3, scheduleId: 5, stadiumId: 1, courtId: 2, date: '2026. 04. 16.' },
  4: { reportId: 4, scheduleId: 7, stadiumId: 2, courtId: 3, date: '2026. 04. 18.' },
};

// 추후 변경 예정
export const getReportDetail = (reportId: number) => {
  const report = DUMMY_REPORTS[reportId];
  if (!report) return null;

  const stadium = DUMMY_STADIUMS.find((s) => s.stadiumId === report.stadiumId);
  const courts = DUMMY_COURTS[report.stadiumId];
  const court = courts?.find((c) => c.courtId === report.courtId);
  const schedule = DUMMY_SCHEDULES[report.courtId]?.find((s) => s.scheduleId === report.scheduleId);

  return { report, stadium, court, schedule };
};
