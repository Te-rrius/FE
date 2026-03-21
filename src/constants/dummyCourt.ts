export interface CourtDto {
  courtId: number;
  name: string;
  location: string;
  image: string;
}

export interface CourtLocationDto {
  city: string;
  region: string[];
}

export const DUMMY_COURTS: CourtDto[] = [
  {
    courtId: 1,
    name: '천마 풋살파크',
    location: '서울시 송파구 성내천로29길 28',
    image: '',
  },
  {
    courtId: 2,
    name: '데일리그라운드 일산 마두점',
    location: '경기도 고양시 일산동구 중앙로 1160',
    image: '',
  },
];
