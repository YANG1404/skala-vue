<script setup>
import BaseDashboardCard from '../components/BaseDashboardCard.vue'
</script>

<template>
    <BaseDashboardCard>
        <h2>⚙️ 환경설정</h2>
        <div class="setting-item">
            <label>온도 단위</label>
            <select>
                <option>섭씨 (°C)</option>
                <option>화씨 (°F)</option>
            </select>
        </div>
        <div class="setting-item">
            <label>미세먼지 알림 수신</label>
            <input type="checkbox" checked />
        </div>
    </BaseDashboardCard>
</template>

<style scoped>
.setting-item {
    margin-bottom: 20px;
    font-size: 1.1rem;
}
.setting-item label {
    display: inline-block;
    width: 200px;
    font-weight: bold;
}
</style>