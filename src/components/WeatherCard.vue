<script setup>
import { defineProps, defineEmits, computed } from 'vue' // 💡 computed 추가
import { useConfigStore } from '../stores/configStore'  // 💡 스토어 불러오기

// 1. props를 변수에 담아줍니다.
const props = defineProps({
    weather: Object
})

const emit = defineEmits(['select-card', 'click-detail'])

// 2. 스토어 장착
const configStore = useConfigStore()

// 3. 온도 변환 로직 (computed를 쓰면 스위치를 누를 때마다 자동으로 재계산됩니다!)
const displayTemp = computed(() => {
    const rawTemp = props.weather.temp // 원본 섭씨 온도
    
    if (configStore.unit === 'fahrenheit') {
        // 화씨로 변환 (과제 요구사항 공식)
        return Math.round((rawTemp * 9) / 5 + 32) 
    }
    return rawTemp // 섭씨면 원본 그대로 반환
})




</script>

<template>
    <li @click="emit('select-card', weather.name)" class="weather-card">
        <h3>{{ weather.name }}</h3>
        <div class="main-temp">{{ displayTemp }}{{ configStore.unitSymbol }}</div>
        <p class="hot" v-if="weather.temp >= 25.0">🔥 더움</p>
        <p class="cool" v-else>🍃 선선함</p>
        <div class="temp-gap">
            어제보다 {{ Math.abs(weather.tempGap) }}°
            <span v-if="weather.tempGap > 0" class="up">↑</span>
            <span v-else-if="weather.tempGap < 0" class="down">↓</span>
            <span v-else>-</span>
            / {{ weather.status }}
        </div>

        <div class="sub-info">
            체감 {{ weather.apparentTemp }}° &bull; 습도 {{ weather.humidity }}% &bull; {{ weather.windDirect }}풍 {{ weather.windSp }}m/s
        </div>

        <div class="detail-boxes">
            <div class="info-box dust"><span class="label">미세먼지</span><span class="value">{{ weather.dust }}</span></div>
            <div class="info-box ultra-dust"><span class="label">초미세먼지</span><span class="value">{{ weather.ultraDust }}</span></div>
            <div class="info-box uv"><span class="label">자외선</span><span class="value">{{ weather.uv }}</span></div>
            <div class="info-box sunrise"><span class="label">일출</span><span class="value">{{ weather.sunriseTime }}</span></div>
            <div class="info-box sunset"><span class="label">일몰</span><span class="value">{{ weather.sunsetTime }}</span></div>
        </div>

        <button class="detail-btn" @click.stop="emit('click-detail', weather.id)">상세보기</button>
    </li>
</template>

<style scoped>
.weather-card {
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 16px;
    padding: 24px;
    text-align: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.weather-card .hot { background-color: #dc2626; padding: 5px; border-radius: 5px; color: white; }
.weather-card .cool { background-color: #3b82f6; padding: 5px; border-radius: 5px; color: white; }

.weather-card:hover { transform: translateY(-5px); box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1); }

.weather-card h3 { margin: 0; font-size: 1.2rem; color: #555; }

.main-temp {
    margin: 10px 0;
    color: #222;
    font-size: 3.5rem;
    font-weight: 800;
    line-height: 1;
    text-align: center;
}

.temp-gap {
    margin-bottom: 8px;
    color: #333;
    font-size: 1.1rem;
    font-weight: bold;
}

.temp-gap .up { color: #f56c6c; }
.temp-gap .down { color: #409eff; }

.sub-info {
    margin-bottom: 20px;
    color: #666;
    font-size: 0.9rem;
    font-weight: 500;
}

.detail-boxes {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 8px;
    width: 100%;
    margin-bottom: 16px;
}

.info-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 12px 4px;
    border-radius: 8px;
}

.info-box .label { font-size: 0.75rem; color: #555; }
.info-box .value { font-size: 1rem; font-weight: bold; }
.info-box.dust, .info-box.ultra-dust { background-color: #eff6ff; color: #3b82f6; }
.info-box.uv { background-color: #f0fdf4; color: #22c55e; }
.info-box.sunrise { background-color: #fffbeb; color: #f59e0b; }
.info-box.sunset { background-color: #ffe4dc; color: #f5360b; }

.detail-btn {
    width: 100%;
    padding: 10px;
    background-color: #f3f4f6;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    color: #555;
    margin-top: auto;
}

.detail-btn:hover { background-color: #e5e7eb; }
</style>