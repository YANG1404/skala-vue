<script setup>
import { useRouter } from 'vue-router'
import BaseDashboardCard from '../components/BaseDashboardCard.vue' // 예쁜 배경 재사용!

const router = useRouter()

const goHome = () => {
    router.push('/')
}
</script>

<template>
    <div class="about-container">
        <BaseDashboardCard>
            <h2>ℹ️ 서비스 소개</h2>
            <div class="content">
                <p>본 앱은 Vue 3 및 Vue Router 4 기반으로 제작된 실습용 기상 관측 대시보드 시스템입니다.</p>
                <ul>
                    <li><code>components/</code> 폴더 내부의 독립 부품 연동</li>
                    <li>클라이언트 사이드 라우팅을 통한 새로고침 없는 화면 전환</li>
                    <li>URL 파라미터를 활용한 실시간 데이터 매칭</li>
                </ul>
            </div>
            <button class="home-btn" @click="goHome">대시보드 홈으로 이동</button>
        </BaseDashboardCard>
    </div>
</template>

<style scoped>
.about-container {
    max-width: 800px;
    margin: 0 auto;
}
.content {
    line-height: 1.8;
    margin: 20px 0;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
}
.content ul {
    margin-top: 15px;
    padding-left: 20px;
}
.content li {
    margin-bottom: 8px;
}
.home-btn {
    width: 100%;
    padding: 12px;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    font-size: 1rem;
}
.home-btn:hover {
    background-color: #2563eb;
}
</style>