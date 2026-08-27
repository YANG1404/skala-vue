<script setup>
import { RouterLink, RouterView } from 'vue-router'
import UnitToggler from './components/UnitToggler.vue'
</script>

<template>
  <div class="app-container">
    <header class="header-container">
      <nav class="nav-bar">
        <RouterLink to="/" class="nav-link">☁️ 날씨 대시보드</RouterLink>
        <RouterLink to="/favorites" class="nav-link">⭐ 즐겨찾기</RouterLink>
        <RouterLink to="/stats" class="nav-link">📊 날씨 통계</RouterLink>
        <RouterLink to="/settings" class="nav-link">⚙️ 환경설정</RouterLink>
        <RouterLink to="/about" class="nav-link">ℹ️ 서비스 소개</RouterLink>
      </nav>
      
      <!-- 💡 네비게이션 바 우측에 배치될 단위 변경 컴포넌트 -->
      <UnitToggler />
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
}

.header-container {
    display: flex;
    justify-content: space-between; /* 💡 왼쪽은 메뉴, 오른쪽은 버튼으로 양끝으로 쫙 찢어줍니다! */
    align-items: center;
    border-bottom: 2px solid #e0e0e0;
    padding-bottom: 15px;
    margin-bottom: 40px;
}

/* 네비게이션 바 전체 컨테이너 */
.nav-bar {
    display: flex;
    gap: 10px;
}

/* 개별 메뉴 링크 기본 스타일 */
.nav-link {
    text-decoration: none;
    color: #666;
    font-weight: bold;
    padding: 10px 20px;
    border-radius: 8px 8px 0 0; /* 위쪽 모서리만 둥글게 */
    transition: all 0.2s ease;
}

.nav-link:hover {
    background-color: #f8f9fa;
    color: #333;
}

/* 💡 Vue Router가 현재 활성화된 링크에 자동으로 붙여주는 클래스입니다! */
.router-link-active {
    color: #3b82f6;
    background-color: #eff6ff;
    border-bottom: 3px solid #3b82f6;
}
</style>