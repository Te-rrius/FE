// 구장 목록 전체 조회
export interface StadiumResponse {
  stadiumId: number;
  name: string;
  imageUrl: string;
  province: string;
  city: string;
  address: string;
}

export interface StadiumQueryParams {
  province?: string;
  city?: string;
  name?: string;
}
