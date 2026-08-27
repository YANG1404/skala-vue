<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-container">
    <header>
      <!-- 💡 메뉴가 5개로 늘어났습니다! -->
      <nav class="nav-bar">
        <RouterLink to="/" class="nav-link">☁️ 날씨 대시보드</RouterLink>
        <RouterLink to="/favorites" class="nav-link">⭐ 즐겨찾기</RouterLink>
        <RouterLink to="/stats" class="nav-link">📊 날씨 통계</RouterLink>
        <RouterLink to="/settings" class="nav-link">⚙️ 환경설정</RouterLink>
        <RouterLink to="/about" class="nav-link">ℹ️ 서비스 소개</RouterLink>
      </nav>
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

/* 네비게이션 바 전체 컨테이너 */
.nav-bar {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 40px;
    border-bottom: 2px solid #e0e0e0;
    padding-bottom: 15px;
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