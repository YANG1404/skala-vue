<script setup>
import { defineProps, defineEmits } from 'vue'

// 1. 부모로부터 현재 알림 모드가 켜져있는지(true/false) 상태를 받습니다.
defineProps({
    isDustAlertMode: Boolean
})

// 2. 부모에게 쏴줄 이벤트 이름표를 만듭니다.
const emit = defineEmits(['toggle-dust-mode'])
</script>

<template>
    <!-- 💡 클릭 시 직접 값을 바꾸지 않고, 부모에게 'toggle-dust-mode' 신호를 보냅니다 -->
    <button 
        class="filter-btn" 
        :class="{ active: isDustAlertMode }" 
        @click="emit('toggle-dust-mode')"
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