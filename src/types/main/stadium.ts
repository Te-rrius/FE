export interface StadiumResponse {
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
