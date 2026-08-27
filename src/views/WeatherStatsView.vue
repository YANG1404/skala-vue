<script setup>
import BaseDashboardCard from '../components/BaseDashboardCard.vue'
</script>

<template>
    <BaseDashboardCard>
        <h2>📊 전국 날씨 통계 요약</h2>
        <ul>
            <li>🔥 <b>가장 더운 지역:</b> 대구 (31.2°C)</li>
            <li>🍃 <b>가장 선선한 지역:</b> 강원 (21.5°C)</li>
            <li>😷 <b>미세먼지 최악:</b> 대전 (85 ㎍/㎥)</li>
            <li>💧 <b>가장 습한 지역:</b> 제주 (90%)</li>
        </ul>
    </BaseDashboardCard>
</template>

<style scoped>
li {
    margin-bottom: 10px;
    font-size: 1.1rem;
}
</style>