<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
    router.push('/')
}
</script>

<template>
    <div class="not-found-container">
        <h1>🌞 ❓</h1>
        <h2>페이지를 찾을 수 없습니다.</h2>
        <p>요청하신 주소가 존재하지 않거나, 아직 개발되지 않았습니다.</p>
        <button class="home-btn" @click="goHome">날씨 메인으로 이동</button>
    </div>
</template>

<style scoped>
.not-found-container {
    text-align: center;
    padding: 100px 20px;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    max-width: 500px;
    margin: 50px auto;
}
h1 {
    font-size: 5rem;
    margin: 0 0 20px 0;
}
h2 {
    color: #333;
    margin-bottom: 10px;
}
p {
    color: #666;
    margin-bottom: 30px;
}
.home-btn {
    padding: 12px 30px;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 30px; /* 둥근 버튼 */
    cursor: pointer;
    font-weight: bold;
    font-size: 1rem;
}
.home-btn:hover {
    background-color: #2563eb;
}
</style>