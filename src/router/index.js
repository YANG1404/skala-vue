import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // 1. 메인 대시보드 (기본 주소)
      path: '/',
      name: 'home',
      // 💡 지연 로딩(Lazy Loading): 첫 화면 로딩 속도를 빠르게 하기 위해, 
      // 이 주소로 이동할 때만 파일을 불러오도록 화살표 함수 방식을 사용합니다.
      component: () => import('../views/WeatherHomeView.vue')
    },
    {
      // 2. 서비스 소개 페이지
      path: '/about',
      name: 'about',
      component: () => import('../views/WeatherAboutView.vue')
    },
    {
      // 3. 지역별 상세 페이지 (동적 라우팅)
      // 💡 ':cityId' 부분은 변수처럼 작동하여 /weather/city_01, /weather/city_02 등을 모두 다 처리합니다.
      path: '/weather/:cityId',
      name: 'weather-detail',
      component: () => import('../views/WeatherDetailView.vue')
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('../views/WeatherFavoritesView.vue')
    },
    {
      path: '/stats',
      name: 'stats',
      component: () => import('../views/WeatherStatsView.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/WeatherSettingsView.vue')
    },
    {
      // 4. Catch-all Route (404 에러 페이지)
      // 💡 사용자가 위에서 정의하지 않은 이상한 주소(예: /abcde)를 입력하고 들어왔을 때 잡아냅니다.
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue')
    }
  ],
})

export default router
