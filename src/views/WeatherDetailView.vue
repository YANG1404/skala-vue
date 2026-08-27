<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseDashboardCard from '../components/BaseDashboardCard.vue' // 예쁜 배경 박스 재사용
import { computed } from 'vue' // vue에서 computed 꺼내오기
import { useConfigStore } from '../stores/configStore' // 스토어 불러오기


const route = useRoute()
const router = useRouter()

// 화면에 보여줄 1개의 도시 데이터를 담을 변수
const cityWeather = ref(null)

const configStore = useConfigStore()

const displayTemp = computed(() => {
    if (!cityWeather.value) return 0 // 데이터 로딩 전 에러 방지
    
    const rawTemp = cityWeather.value.temp
    if (configStore.unit === 'fahrenheit') {
        return Math.round((rawTemp * 9) / 5 + 32)
    }
    return rawTemp
})

// 💡 과제 요구사항: 도시 코드에 해당하는 Mock Data를 임시로 활용 (Home에 있던 배열 복사)
const weatherList = [
    { id: 'city_01', name: '서울', temp: 26.5, status: '맑음', humidity: 55, windSp: 2.3 },
    { id: 'city_02', name: '경기', temp: 25.0, status: '구름조금', humidity: 60, windSp: 1.8 },
    { id: 'city_03', name: '인천', temp: 24.2, status: '흐림', humidity: 70, windSp: 4.1 },
    // (여기에 나머지 도시 데이터도 복사해서 넣어주세요!)
]

// 컴포넌트가 화면에 나타날 때(Mount 시점) 데이터를 찾습니다.
onMounted(() => {
    // 1. 주소창(/weather/:cityId)에서 cityId 값을 가져옵니다. (예: 'city_01')
    const currentId = route.params.cityId
    
    // 2. 전체 날씨 리스트에서 id가 똑같은 도시를 찾아 cityWeather 변수에 넣습니다.
    cityWeather.value = weatherList.find(weather => weather.id === currentId)
})

const goBack = () => {
    router.push('/') // 메인 화면으로 돌아가기
}
</script>

<template>
    <div class="detail-container">
        <h2>🗺️ 지역별 상세 기상 관측 정보</h2>
        
        <!-- 데이터를 찾기 전이거나 잘못된 주소로 왔을 때 에러 방지용 v-if -->
        <BaseDashboardCard v-if="cityWeather">
            <div class="detail-info">
                <h3>📍 지정 지역: 대한민국 {{ cityWeather.name }}</h3>
                <p>🌡️ 실시간 기온: {{ displayTemp }}{{ configStore.unitSymbol }}</p>
                <p>🌤️ 기상 현황: {{ cityWeather.status }}</p>
                <p>💧 대기 습도: {{ cityWeather.humidity }}%</p>
                <p>🌬️ 현재 풍속: {{ cityWeather.windSp }}m/s</p>
            </div>
            
            <button class="back-btn" @click="goBack">← 메인 대시보드로 돌아가기</button>
        </BaseDashboardCard>
        
        <BaseDashboardCard v-else>
            <p>데이터를 불러오는 중이거나 잘못된 접근입니다.</p>
            <button class="back-btn" @click="goBack">돌아가기</button>
        </BaseDashboardCard>
    </div>
</template>

<style scoped>
.detail-container {
    max-width: 600px;
    margin: 0 auto;
}
.detail-info {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 30px;
}
.back-btn {
    padding: 10px 20px;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
}
.back-btn:hover {
    background-color: #2563eb;
}
</style>