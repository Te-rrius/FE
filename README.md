# 🎾 테리우스 (Terrius) — Frontend

> **당신의 모든 랠리를 데이터로 기록합니다.**
>
> _"인생네컷처럼 기록하고, 프로 선수처럼 분석받는다."_

코트에 설치된 카메라로 촬영된 테니스 경기 영상을 **하이라이트 클립**으로 남기는 것을 넘어,
**자세 분석 · 경기 분석 데이터 리포트**까지 제공하는 테니스 성장 리포트 서비스의 프론트엔드입니다.

**Expo + React Native** 기반의 크로스플랫폼 모바일 앱으로,
**카카오 소셜 로그인**, **경기 영상 재생**, **분석 리포트 시각화**를 담당합니다.

---

## 🔹 주요 기능

### 1. 🔐 인증
- 카카오 소셜 로그인 (`@react-native-kakao`)
- JWT 기반 인증 상태 관리 (`AsyncStorage` 토큰 저장)
- 로그인 시 약관 동의 모달 노출

### 2. 🏟️ 경기장 / 코트 탐색
- 경기장 목록 조회 (지역·도시·이름 필터)
- 경기장 상세 정보
- 코트별 영상이 존재하는 날짜 / 시간대 선택

### 3. 🎥 경기 영상 & 리포트 신청
- 경기 영상 재생 (`expo-video`)
- 특정 경기 영상에 대한 **리포트 분석 신청**
- 신청 가능한 영상 목록 / 신청 현황 조회

### 4. 📊 리포트 조회
- 내 리포트 목록 (정렬 지원)
- 선수별(`PLAYER_ONE` / `PLAYER_TWO`) 리포트 상세

리포트는 다음 3단위의 분석 데이터로 시각화됩니다.

| 단위 | 내용 |
|---|---|
| 🎯 **경기(Match)** | 최고 타구 속도, 평균/최대/최소 랠리 횟수, 총 샷 수, 퍼스트/세컨드 서브 성공률 및 비중 |
| 🎾 **샷(Shot)** | 샷 종류(서브·포핸드·백핸드·발리·스매시) 태깅, 방향 및 코트 내 착지점 |
| 👤 **자세(Biomechanics)** | 샷별 어깨/척추/허리 회전각, 개선 포인트, 점수 |

- 자세 교정이 필요한 구간의 **하이라이트 영상** 제공

---

## 🚀 기술 스택

- **Language**: TypeScript 5.9

  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" />

- **Framework**: React Native 0.83 + React 19

  <img src="https://img.shields.io/badge/React%20Native-61DAFB?style=flat-square&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/React%2019-61DAFB?style=flat-square&logo=react&logoColor=black" />

- **플랫폼**: Expo ~55 (expo-dev-client)

  <img src="https://img.shields.io/badge/Expo-000020?style=flat-square&logo=expo&logoColor=white" />

- **라우팅**: Expo Router ~55

  <img src="https://img.shields.io/badge/Expo%20Router-000020?style=flat-square&logo=expo&logoColor=white" />

- **서버 상태 관리**: TanStack Query v5

  <img src="https://img.shields.io/badge/TanStack%20Query-FF4154?style=flat-square&logo=reactquery&logoColor=white" />

- **클라이언트 상태 관리**: Zustand v5

  <img src="https://img.shields.io/badge/Zustand-443E38?style=flat-square&logo=zustand&logoColor=white" />

- **HTTP 통신**: Axios 1.16

  <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white" />

- **인증**: @react-native-kakao (Core + User)

  <img src="https://img.shields.io/badge/Kakao%20Login-FFCD00?style=flat-square&logo=kakao&logoColor=black" />

- **영상 재생**: expo-video

  <img src="https://img.shields.io/badge/expo--video-000020?style=flat-square&logo=expo&logoColor=white" />

- **UI**: expo-linear-gradient, expo-blur, react-native-svg

  <img src="https://img.shields.io/badge/react--native--svg-FFB13B?style=flat-square&logo=svg&logoColor=black" />

- **영속 스토리지**: AsyncStorage

  <img src="https://img.shields.io/badge/AsyncStorage-61DAFB?style=flat-square&logo=react&logoColor=black" />

- **Linting / Formatting**: ESLint 9 + Prettier

  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white" />
  <img src="https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=black" />

---

## 🏗️ 아키텍처 개요

```
📱 Mobile Expo App (iOS / Android)
    │  카카오 로그인 · JWT (AsyncStorage)
    │
    ├─ Expo Router        (파일 기반 라우팅)
    ├─ TanStack Query     (서버 상태 · 캐싱)
    ├─ Zustand            (전역 클라이언트 상태)
    └─ Axios              (API 통신)
          │
          ▼
    🌐 Server (Spring Boot)
```

---

## 📁 프로젝트 구조

```
FE/
└─ src/
   ├─ app/                    # Expo Router 파일 기반 라우팅
   │  ├─ (public)/            # 인증 불필요 (로그인, 경기장, 약관)
   │  ├─ (private)/           # 인증 필요 (마이페이지, 리포트, 리플레이)
   │  └─ _layout.tsx
   ├─ screens/                # 각 라우트의 실제 화면 컴포넌트
   ├─ components/             # 공통 · 도메인 컴포넌트
   │  ├─ auth/
   │  ├─ common/
   │  ├─ layout/
   │  └─ modal/
   ├─ apis/                   # Axios 인스턴스 · API 함수
   ├─ services/               # TanStack Query 키 관리
   ├─ stores/                 # Zustand 전역 상태
   ├─ types/                  # TypeScript 타입 정의
   ├─ utils/                  # 유틸 함수
   └─ assets/                 # 이미지 · 폰트 · 영상
```

---

## 👥 팀 구성 (Frontend)

<table>
  <tr>
    <td align="center" width="180">
      <a href="https://github.com/a-neey">
        <img src="https://github.com/a-neey.png" width="120" height="120" style="border-radius:50%" /><br/>
        <b>예나</b>
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">Frontend</td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/a-neey">@a-neey</a></td>
  </tr>
</table>
