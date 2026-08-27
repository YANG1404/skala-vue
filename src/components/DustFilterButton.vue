<script setup>
import { useConfigStore } from '../stores/configStore'

const configStore = useConfigStore()
</script>

<template>
    <button
        class="filter-btn"
        :class="{ active: configStore.isDustAlertMode }"
        @click="configStore.toggleDustMode()"
    >
        미세먼지 경보 (50 이상) 필터
    </button>
</template>

<style scoped>
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