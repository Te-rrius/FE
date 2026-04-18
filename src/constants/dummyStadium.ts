export interface StadiumDto {
  stadiumId: number;
  name: string;
  location: string;
  image: string;
  type: string;
}

export interface StadiumLocationDto {
  city: string;
  region: string[];
}

export const DUMMY_STADIUMS: StadiumDto[] = [
  {
    stadiumId: 1,
    name: '천마 풋살파크',
    location: '서울시 송파구 성내천로29길 28',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6OqB5wGlgjtUIai09yKi_Z9gCa0roO1fjAQ&s',
    type: 'GENERAL',
  },
  {
    stadiumId: 2,
    name: '데일리그라운드 일산 마두점',
    location: '경기도 고양시 일산동구 중앙로 1160',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6OqB5wGlgjtUIai09yKi_Z9gCa0roO1fjAQ&s',
    type: 'GENERAL',
  },
  {
    stadiumId: 3,
    name: '팬텀 실내 풋살장',
    location: '경기도 고양시 일산동구 고봉로658번길 61-36',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6OqB5wGlgjtUIai09yKi_Z9gCa0roO1fjAQ&s',
    type: 'GENERAL',
  },
  {
    stadiumId: 4,
    name: '어썸 풋살파크',
    location: '충청남도 천안시 동남구 수곡1길 7',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6OqB5wGlgjtUIai09yKi_Z9gCa0roO1fjAQ&s',
    type: 'GENERAL',
  },
  {
    stadiumId: 5,
    name: '의정부 허니비 풋살파크',
    location: '경기도 의정부시 용민로 192 8층 옥상',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6OqB5wGlgjtUIai09yKi_Z9gCa0roO1fjAQ&s',
    type: 'GENERAL',
  },
  {
    stadiumId: 6,
    name: '천안 KN풋살파크',
    location: '충청남도 천안시 동남구 용곡동 149-10',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6OqB5wGlgjtUIai09yKi_Z9gCa0roO1fjAQ&s',
    type: 'GENERAL',
  },
  {
    stadiumId: 7,
    name: '레브 풋볼 클럽',
    location: '경기도 안양시 수도권 중심 아카데미',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6OqB5wGlgjtUIai09yKi_Z9gCa0roO1fjAQ&s',
    type: 'ACADEMY',
  },
  {
    stadiumId: 8,
    name: '하이치즈 풋볼 아카데미',
    location: '서울시 동대문구',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6OqB5wGlgjtUIai09yKi_Z9gCa0roO1fjAQ&s',
    type: 'ACADEMY',
  },
  {
    stadiumId: 9,
    name: 'LBFS 트레이닝 센터',
    location: '경기도 이천시 마장면 표교리 491-30',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6OqB5wGlgjtUIai09yKi_Z9gCa0roO1fjAQ&s',
    type: 'PRO',
  },
];
