export interface StadiumSelectorDto {
  stadiumId: number;
  name: string;
}

export const DUMMY_REPORT_COURTS: Record<number, StadiumSelectorDto[]> = {
  1: [
    { stadiumId: 1, name: '1구장' },
    { stadiumId: 2, name: '2구장' },
  ],
  2: [
    { stadiumId: 1, name: 'A구장' },
    { stadiumId: 2, name: 'B구장' },
  ],
};
