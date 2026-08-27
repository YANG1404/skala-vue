<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseDashboardCard from '../components/BaseDashboardCard.vue' // 예쁜 배경 박스 재사용
import { computed } from 'vue' // vue에서 computed 꺼내오기
import { useConfigStore } from '../stores/configStore' // 스토어 불러오기
import axios from 'axios'


const route = useRoute()
const router = useRouter()

const cityWeather = ref(null)
const tourPlaces = ref([]) // 💡 추천 관광지 목록을 담을 반응형 배열

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
// 💡 발급받은 공공데이터포털 일반 인증키(Decoding)를 여기에 넣으세요!
const TOUR_API_KEY = decodeURIComponent(import.meta.env.VITE_TOUR_API_KEY)

// 화면에 보여줄 1개의 도시 데이터를 담을 변수

const configStore = useConfigStore()

const displayTemp = computed(() => {
    if (!cityWeather.value) return 0 // 데이터 로딩 전 에러 방지
    
    const rawTemp = cityWeather.value.temp
    if (configStore.unit === 'fahrenheit') {
        return Math.round((rawTemp * 9) / 5 + 32)
    }
    return rawTemp
})

const cityQueries = {
    city_01: 'Seoul', city_02: 'Gyeonggi-do', city_03: 'Incheon',
    city_04: 'Gangwon-do', city_05: 'Daejeon', city_06: 'Gwangju',
    city_07: 'Daegu', city_08: 'Busan', city_09: 'Ulsan',
    city_10: 'Jeju', city_11: 'Jeonju', city_12: 'Gyeongju'
}

const cityNames = {
    city_01: '서울', city_02: '경기', city_03: '인천', city_04: '강원',
    city_05: '대전', city_06: '광주', city_07: '대구', city_08: '부산',
    city_09: '울산', city_10: '제주', city_11: '전주', city_12: '경주'
}

const fetchCityWeather = async (cityId) => {
    const query = cityQueries[cityId]
    const name = cityNames[cityId]

    if (!query || !name) return null

    const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather'
    const weatherResponse = await axios.get(weatherUrl, {
        params: {
            q: query,
            appid: API_KEY,
            units: 'metric',
            lang: 'kr'
        }
    })
    const weatherData = weatherResponse.data

    const pollutionUrl = 'https://api.openweathermap.org/data/2.5/air_pollution'
    const pollutionResponse = await axios.get(pollutionUrl, {
        params: {
            lat: weatherData.coord.lat,
            lon: weatherData.coord.lon,
            appid: API_KEY
        }
    })
    const pollutionData = pollutionResponse.data.list?.[0]?.components

    const uvUrl = 'https://api.openweathermap.org/data/2.5/uvi'
    const uvResponse = await axios.get(uvUrl, {
        params: {
            lat: weatherData.coord.lat,
            lon: weatherData.coord.lon,
            appid: API_KEY
        }
    })

    const formatTime = (unixTime) => new Intl.DateTimeFormat('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'UTC'
    }).format(new Date((unixTime + weatherData.timezone) * 1000))

    return {
        id: cityId,
        name,
        temp: weatherData.main.temp,
        apparentTemp: weatherData.main.feels_like,
        status: weatherData.weather[0].description,
        weatherMain: weatherData.weather[0].main,
        humidity: weatherData.main.humidity,
        windSp: weatherData.wind.speed,
        dust: pollutionData?.pm10 ?? 0,
        ultraDust: pollutionData?.pm2_5 ?? 0,
        uv: uvResponse.data.value,
        sunriseTime: formatTime(weatherData.sys.sunrise),
        sunsetTime: formatTime(weatherData.sys.sunset)
    }
}

const fetchTourPlaces = async (cityName, weatherMain, dustValue) => {
    try {
        // 1. 날씨와 미세먼지에 따른 검색 키워드 자동 선정
        // OpenWeatherMap의 날씨 상태(Clear, Rain, Clouds 등)와 미세먼지 수치를 활용합니다.
        let keyword = `${cityName} 공원` // 기본값: 야외 추천
        
        if (weatherMain === 'Rain' || weatherMain === 'Thunderstorm' || dustValue >= 50) {
            keyword = `${cityName} 박물관` // 비가 오거나 미세먼지가 나쁘면 실내 추천
        }

        // 2. 한국관광공사 키워드 검색 API 호출 (JSON 형식, 최대 3개)
        const url = `https://apis.data.go.kr/B551011/KorService2/searchKeyword2`
        const response = await axios.get(url, {
            params: {
                serviceKey: TOUR_API_KEY,
                numOfRows: 3,
                pageNo: 1,
                MobileOS: 'ETC',
                MobileApp: 'WeatherDashboard',
                _type: 'json',
                arrange: 'A', // 정렬 (A: 제목순, O: 제목순 등)
                keyword: keyword
            }
        })

        // API 응답 데이터 구조에 맞춰 장소 아이템 추출
        let items = response.data?.response?.body?.items?.item

        if (!items) {
            const fallbackResponse = await axios.get(url, {
                params: {
                    serviceKey: TOUR_API_KEY,
                    numOfRows: 3,
                    pageNo: 1,
                    MobileOS: 'ETC',
                    MobileApp: 'WeatherDashboard',
                    _type: 'json',
                    arrange: 'A',
                    keyword: cityName
                }
            })
            items = fallbackResponse.data?.response?.body?.items?.item
        }
        tourPlaces.value = Array.isArray(items) ? items : (items ? [items] : [])
        
    } catch (error) {
        console.error('❌ 관광지 데이터를 가져오는 데 실패했습니다:', error)
    }
}

// 컴포넌트가 화면에 나타날 때 실제 날씨와 관광지 데이터를 가져옵니다.
onMounted(async () => {
    const currentId = route.params.cityId

    try {
        cityWeather.value = await fetchCityWeather(currentId)

        if (cityWeather.value) {
            await fetchTourPlaces(
                cityWeather.value.name,
                cityWeather.value.weatherMain,
                cityWeather.value.dust
            )
        }
    } catch (error) {
        console.error('❌ 상세 날씨 데이터를 가져오는 데 실패했습니다:', error)
    }
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
                <h3>📍 {{ cityWeather.name }} 날씨 상세 정보</h3>
                <el-descriptions :column="1" border>
                    <el-descriptions-item label="기온">{{ displayTemp }}{{ configStore.unitSymbol }}</el-descriptions-item>
                    <el-descriptions-item label="날씨">{{ cityWeather.status }}</el-descriptions-item>
                    <el-descriptions-item label="습도">{{ cityWeather.humidity }}%</el-descriptions-item>
                    <el-descriptions-item label="풍속">{{ cityWeather.windSp }}m/s</el-descriptions-item>
                    <el-descriptions-item label="미세먼지">{{ cityWeather.dust }} μg/m³</el-descriptions-item>
                    <el-descriptions-item label="초미세먼지">{{ cityWeather.ultraDust }} μg/m³</el-descriptions-item>
                    <el-descriptions-item label="자외선">{{ cityWeather.uv }}</el-descriptions-item>
                    <el-descriptions-item label="일출/일몰">{{ cityWeather.sunriseTime }} / {{ cityWeather.sunsetTime }}</el-descriptions-item>
                </el-descriptions>
            </div>

            <div class="recommend-section">
                <h4>날씨 데이터 기반 지역 관광지 추천(한국관광공사)</h4>
                <div v-if="tourPlaces.length > 0" class="place-grid">
                    <div v-for="place in tourPlaces" :key="place.contentid" class="place-card">
                        <!-- 관광지 대표 이미지 (있을 경우만 표시) -->
                        <el-image v-if="place.firstimage" :src="place.firstimage" :alt="place.title" fit="cover" class="place-img" />
                        <div class="place-info">
                        <h5>{{ place.title }}</h5>
                        <p class="place-addr">📍 {{ place.addr1 }}</p>
                        </div>
                    </div>
                </div>
                <el-empty v-else description="현재 조건에 맞는 추천 장소가 없습니다." />
            </div>
            
            <el-button class="back-btn" type="primary" @click="router.go(-1)">← 돌아가기</el-button>
        </BaseDashboardCard>
        
        <BaseDashboardCard v-else>
            <el-alert title="데이터를 불러오는 중이거나 잘못된 접근입니다." type="warning" :closable="false" />
            <el-button class="back-btn" type="primary" @click="goBack">돌아가기</el-button>
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
.recommend-section {
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid #eee;
    text-align: left;
}

.recommend-section h4 {
    margin-bottom: 15px;
    color: #333;
    font-size: 1.1rem;
}

.place-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 15px;
}

.place-card {
    background: #f9f9f9;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    display: flex;
    flex-direction: column;
}

.place-img {
    width: 100%;
    height: 120px;
    object-fit: cover;
}

.place-info {
    padding: 12px;
}

.place-info h5 {
    font-size: 1rem;
    margin: 0 0 5px 0;
    color: #222;
}

.place-addr {
    font-size: 0.85rem;
    color: #666;
    margin: 0;
}

.no-place {
    font-size: 0.9rem;
    color: #888;
    font-style: italic;
}
</style>