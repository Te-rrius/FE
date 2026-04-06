export interface CourtSelectorDto {
  courtId: number;
  name: string;
}

export const DUMMY_REPORT_COURTS: Record<number, CourtSelectorDto[]> = {
  1: [
    { courtId: 1, name: '1구장' },
    { courtId: 2, name: '2구장' },
  ],
  2: [
    { courtId: 1, name: 'A구장' },
    { courtId: 2, name: 'B구장' },
  ],
};
