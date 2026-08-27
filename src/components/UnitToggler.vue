<script setup>
import { useConfigStore } from '../stores/configStore'

// 1. 만들어둔 스토어를 불러와 변수에 담아줍니다. (이제 이 변수로 Store에 접근합니다!)
const configStore = useConfigStore()
</script>

<template>
    <div class="unit-toggler">
        <!-- 2. Store의 State(unit)와 Getter(unitSymbol)를 꺼내서 화면에 보여줍니다 -->
        <span class="unit-text">
            날씨단위: {{ configStore.unit === 'celsius' ? '섭씨' : '화씨' }} ({{ configStore.unitSymbol }})
        </span>
        
        <!-- 3. 버튼 클릭 시 Store의 Action(toggleUnit)을 실행시킵니다 -->
        <button class="toggle-btn" @click="configStore.toggleUnit()">단위변경</button>
    </div>
</template>

<style scoped>
.unit-toggler {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.9rem;
    color: #555;
    background-color: #f8f9fa;
    padding: 8px 12px;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
}
.toggle-btn {
    padding: 6px 12px;
    background-color: #4f5968;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.8rem;
    font-weight: bold;
}
.toggle-btn:hover {
    background-color: #3b4452;
}
</style>