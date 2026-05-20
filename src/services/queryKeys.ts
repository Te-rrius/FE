export const queryKeys = {
  stadiums: (params?: { province?: string; city?: string; name?: string }) =>
    params ? (['stadiums', params] as const) : (['stadiums'] as const),
};
