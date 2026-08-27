# 프로젝트 결과보고서: SKALA Vue.js 날씨 대시보드

## 1. 프로젝트 개요
*   **목적:** Vue 3 및 Vue Router, Pinia, Axios를 활용한 날씨 대시보드 및 맞춤 관광지 추천 SPA(Single Page Application) 구현
*   **개발 환경:** Vue 3, Vite, Element Plus, OpenWeatherMap API, 한국관광공사 API

## 2. 주요 과제 수행 내역
과제 요구사항에 따른 구현 절차를 이행하고 동작 검증을 완료하였습니다.
*   **데이터 렌더링 및 UI:** `v-for`를 이용한 배열 데이터 출력 및 `v-if`를 활용한 온도 기준(25도) 조건부 렌더링(더움/선선함 라벨) 적용
*   **컴포넌트 모듈화:** 화면을 `WeatherHomeView`, `BaseDashboardCard`, `SearchBar`, `WeatherCard` 등으로 분리하여 단방향 데이터 흐름(Props/Emit) 구조 확립
*   **라우팅(Vue Router):** 지연 로딩(Lazy Loading), `/:cityId` 기반 동적 라우팅, Catch-all 라우팅(404 예외 처리)을 적용하여 페이지 전환 최적화
*   **전역 상태 관리(Pinia):** `configStore`를 생성하여 섭씨/화씨 단위 변환 상태를 전역으로 관리하고 전체 컴포넌트 UI에 동기화
*   **품질 관리 및 배포:** ESLint 품질 점검을 통과하였으며, `.env.local`로 환경변수를 격리한 후 Vercel을 통해 정적 웹 호스팅 배포 완료

## 3. 세부 구현 및 사용자 정의 사항 (Customization)
과제 기본 요구사항을 확장하여 다음과 같은 기능을 독자적으로 기획 및 추가 구현하였습니다.
*   **미세먼지 경보 시스템 전역화:** 미세먼지 수치 50 이상 지역 필터 컴포넌트(`DustFilterButton.vue`)를 분리하고, 상태 변수(`isDustAlertMode`)를 Pinia 스토어로 이관하여 탭 전환 간 상태 유지가 가능하도록 고도화

*   **API 연동 기반 맞춤 관광지 큐레이션:** OpenWeatherMap의 실시간 기상/미세먼지 데이터를 조건부로 분석하여, 맑은 날씨에는 야외 관광지(공원)를, 기상 악화 시에는 실내 시설(박물관)을 한국관광공사 API를 통해 추천하도록 로직 구현 (조건 불일치 시 도시명 기준 재검색 Fallback 프로세스 적용)

*   **상세 페이지 정보 확장 및 UI 라이브러리 적용:** 체감온도, 습도, 풍향/풍속, 자외선 지수, 일출/일몰 시간 데이터를 추가 연동하였으며, Element Plus(`el-descriptions`, `el-image` 등)를 적용하여 정보 전달력 제고
*   **View 확장:** 요구사항을 초과 달성하여 `WeatherFavoritesView`, `WeatherStatsView`, `WeatherSettingsView` 총 3종의 추가 페이지를 설계 및 라우터에 등록

## 4. 트러블슈팅 (문제 정의 및 해결 절차)
개발 중 발생한 주요 이슈사항에 대하여 원인을 분석하고 다음과 같이 해결하였습니다.

*   **이슈 1: 한국관광공사 API 인증 실패 및 서비스 폐기 오류**
    *   **현상 및 원인:** `KorService1` 엔드포인트 폐기 및 Axios `params` 객체 전달 과정에서 환경변수의 인코딩된 API 키가 이중 인코딩되며 400/401 에러 발생
    *   **해결:** 엔드포인트를 `KorService2/searchKeyword2`로 갱신, 미지원 파라미터(`listYN`) 삭제 조치. API 키는 `decodeURIComponent()`로 디코딩 후 전달하여 인증 처리 정상화
*   **이슈 2: 실시간 날씨 API 순회 호출 중단 현상**
    *   **현상 및 원인:** 단일 `try-catch` 블록 내에서 `for`문을 통한 복수 지역 API 호출 시, 특정 지역에서 404 에러 발생 시 반복문 전체가 중단됨
    *   **해결:** `try-catch` 블록을 `for`문 내부로 이동하여, 개별 지역의 호출 실패가 타 지역 데이터 렌더링에 영향을 미치지 않도록 예외 처리 구조 개선
*   **이슈 3: SPA 라우팅 Vercel 배포 후 404 및 401 오류**
    *   **현상 및 원인:** History 모드 라우팅으로 인한 새로고침 경로 이탈 현상 및 Vercel Production 환경변수 누락
    *   **해결:** 루트 디렉토리에 `vercel.json`을 작성하여 모든 요청을 `/index.html`로 리다이렉트(`rewrites`) 처리하고, Vercel 대시보드에 API 환경변수 등록 후 재배포 적용
*   **이슈 4: 한글 검색어 입력 지연 현상**
    *   **현상 및 원인:** 검색창에서 `v-model` 디렉티브 사용 시 한글 자모 조합 과정에서 렌더링 지연 발생
    *   **해결:** `v-model`을 배제하고 `:value` 속성과 `@input` 이벤트를 분리 결합하는 방식으로 양방향 바인딩을 직접 제어하여 지연 문제 해결
