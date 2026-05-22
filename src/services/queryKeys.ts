export const queryKeys = {
  stadiums: (params?: { province?: string; city?: string; name?: string }) =>
    params ? (['stadiums', params] as const) : (['stadiums'] as const),
  user: ['user'] as const,
  myReports: (sort: string) => ['myReports', sort] as const,
  reportDetail: (matchVideoId: number, target: string | null) => ['reportDetail', matchVideoId, target] as const,
  schedule: (stadiumId: number, date?: string, courtNumber?: number) =>
    ['schedule', stadiumId, date, courtNumber] as const,
  reportDates: (stadiumId: number, courtNumber?: number) =>
    courtNumber !== undefined ? ['reportDates', stadiumId, courtNumber] : ['reportDates', stadiumId],
  reportTimes: (stadiumId: number, date?: string, courtNumber?: number) =>
    ['reportTimes', stadiumId, date, courtNumber] as const,
  stadiumCourts: (stadiumId: number) => ['stadiumCourts', stadiumId] as const,
};
