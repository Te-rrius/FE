export const queryKeys = {
  stadiums: (params?: { province?: string; city?: string; name?: string }) =>
    params ? (['stadiums', params] as const) : (['stadiums'] as const),
  user: ['user'] as const,
  myReports: (sort: string) => ['myReports', sort] as const,
  reportDetail: (matchVideoId: number, target: string | null) => ['reportDetail', matchVideoId, target] as const,
};
