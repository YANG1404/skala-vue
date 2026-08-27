<script setup>
import { useConfigStore } from '../stores/configStore'

const configStore = useConfigStore()
</script>

<template>
    <!-- 버튼 클릭 시 스토어의 함수를 바로 실행합니다 -->
    <button 
        class="filter-btn" 
        :class="{ active: configStore.isDustAlertMode }" 
        @click="configStore.toggleDustMode()"
    >
        😷 미세먼지 경보 (50 이상) 필터
    </button>
</template>

<style scoped>
    /* 부모 파일에 있던 버튼 관련 CSS를 이곳으로 모두 가져옵니다 */
    .filter-btn {
        padding: 8px 16px;
        border: 2px solid #e0e0e0;
        background-color: #ffffff;
        color: #888;
        border-radius: 20px;
        cursor: pointer;
        font-weight: bold;
        font-size: 0.9rem;
        transition: all 0.2s ease;
    }

    .filter-btn.active {
        border-color: #f63b3b;      
        background-color: #ffefef;  
        color: #f63b3b;             
        box-shadow: 0 2px 4px rgba(59, 130, 246, 0.1);
    }
</style>