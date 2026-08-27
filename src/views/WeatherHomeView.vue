// weatherList 항목(열) 추가
/* weatherList 항목 
id(key), 
name(지역), 
temp(온도), 
tempGap(전날과의 온도차이), 
status(기상상태), 
apparentTemp(체감온도), 
humidity(습도),
windDirect(풍향),
windSp(풍속),
dust(미세먼지),
ultraDust(초미세먼지),
uv(자외선),
sunriseTime(예상일출시간),
sunsetTime(예상일몰시간),
*/
<script setup>
import {ref, computed, watch, watchEffect, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useConfigStore } from '../stores/configStore'
import BaseDashboardCard from '../components/BaseDashboardCard.vue'
import SearchBar from '../components/SearchBar.vue'
import WeatherCard from '../components/WeatherCard.vue'
import DustFilterButton from '../components/DustFilterButton.vue'
import axios from 'axios'
const weatherList = ref([
  {
    id: 'city_01',
    name: '서울',
    temp: 26.5,
    tempGap: 1.2,
    status: '맑음',
    apparentTemp: 27.8,
    humidity: 55,
    windDirect: '북동',
    windSp: 2.3,
    dust: 45,       // ㎍/㎥ 단위 기준 수치
    ultraDust: 22,  // ㎍/㎥ 단위 기준 수치
    uv: 7,          // UV 지수 (0~11+)
    sunriseTime: '06:05',
    sunsetTime: '19:23'
  },
  {
    id: 'city_02',
    name: '경기',
    temp: 25.0,
    tempGap: -0.5,
    status: '구름조금',
    apparentTemp: 26.1,
    humidity: 60,
    windDirect: '북동',
    windSp: 1.8,
    dust: 52,
    ultraDust: 45,
    uv: 5,
    sunriseTime: '06:06',
    sunsetTime: '19:22'
  },
  {
    id: 'city_03',
    name: '인천',
    temp: 24.2,
    tempGap: 0.0,
    status: '흐림',
    apparentTemp: 25.5,
    humidity: 70,
    windDirect: '북서',
    windSp: 4.1,
    dust: 25,
    ultraDust: 12,
    uv: 2,
    sunriseTime: '06:07',
    sunsetTime: '19:24'
  },
  {
    id: 'city_04',
    name: '강원',
    temp: 21.5,
    tempGap: -2.3,
    status: '비',
    apparentTemp: 21.0,
    humidity: 85,
    windDirect: '동',
    windSp: 3.5,
    dust: 18,
    ultraDust: 9,
    uv: 1,
    sunriseTime: '05:58',
    sunsetTime: '19:15'
  },
  {
    id: 'city_05',
    name: '대전',
    temp: 28.1,
    tempGap: 2.5,
    status: '맑음',
    apparentTemp: 29.5,
    humidity: 50,
    windDirect: '남서',
    windSp: 1.2,
    dust: 85,
    ultraDust: 55,
    uv: 9,
    sunriseTime: '06:04',
    sunsetTime: '19:18'
  },
  {
    id: 'city_06',
    name: '광주',
    temp: 29.3,
    tempGap: 1.8,
    status: '구름많음',
    apparentTemp: 31.0,
    humidity: 65,
    windDirect: '남',
    windSp: 2.0,
    dust: 40,
    ultraDust: 20,
    uv: 6,
    sunriseTime: '06:08',
    sunsetTime: '19:20'
  },
  {
    id: 'city_07',
    name: '대구',
    temp: 31.2,
    tempGap: 3.1,
    status: '맑음',
    apparentTemp: 33.5,
    humidity: 45,
    windDirect: '동',
    windSp: 1.5,
    dust: 55,
    ultraDust: 15,
    uv: 10,
    sunriseTime: '05:59',
    sunsetTime: '19:12'
  },
  {
    id: 'city_08',
    name: '부산',
    temp: 27.8,
    tempGap: 0.5,
    status: '맑음',
    apparentTemp: 29.1,
    humidity: 60,
    windDirect: '남동',
    windSp: 4.5,
    dust: 28,
    ultraDust: 14,
    uv: 8,
    sunriseTime: '05:57',
    sunsetTime: '19:10'
  },
  {
    id: 'city_09',
    name: '울산',
    temp: 28.5,
    tempGap: 1.0,
    status: '구름조금',
    apparentTemp: 30.2,
    humidity: 55,
    windDirect: '남동',
    windSp: 3.8,
    dust: 30,
    ultraDust: 18,
    uv: 7,
    sunriseTime: '05:56',
    sunsetTime: '19:09'
  },
  {
    id: 'city_10',
    name: '제주',
    temp: 26.0,
    tempGap: -1.2,
    status: '비',
    apparentTemp: 27.5,
    humidity: 90,
    windDirect: '남서',
    windSp: 6.5,
    dust: 15,
    ultraDust: 8,
    uv: 2,
    sunriseTime: '06:12',
    sunsetTime: '19:21'
  },
  {
    id: 'city_11',
    name: '전주',
    temp: 28.5,
    tempGap: 1.5,
    status: '구름많음',
    apparentTemp: 30.1,
    humidity: 60,
    windDirect: '서',
    windSp: 2.1,
    dust: 42,
    ultraDust: 25,
    uv: 6,
    sunriseTime: '06:06',
    sunsetTime: '19:19'
  },
  {
    id: 'city_12',
    name: '경주',
    temp: 30.0,
    tempGap: 2.0,
    status: '맑음',
    apparentTemp: 32.2,
    humidity: 50,
    windDirect: '남동',
    windSp: 1.8,
    dust: 35,
    ultraDust: 16,
    uv: 9,
    sunriseTime: '05:58',
    sunsetTime: '19:11'
  }
])
//반응형 변수
const searchQuery = ref('')
const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요.')
//나만의 반응형 변수
const isDustAlertMode = ref(false)
const configStore = useConfigStore()
const router = useRouter()
const API_KEY = 'e744be6ad3d213b5fdb13f1f5277fa15'

const getWindDirection = (degree) => {
  const directions = ['북', '북동', '동', '남동', '남', '남서', '서', '북서']
  return directions[Math.round(degree / 45) % 8]
}

const formatTime = (unixTime, timezone) => {
  return new Intl.DateTimeFormat('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC'
  }).format(new Date((unixTime + timezone) * 1000))
}

const fetchRealWeather = async () => {
    // 💡 OWM API가 정확히 인식할 수 있도록 한글-영문 매칭 테이블을 만듭니다.
    const cityEngNames = {
        '서울': 'Seoul', '경기': 'Gyeonggi-do', '인천': 'Incheon', 
        '강원': 'Gangwon-do', '대전': 'Daejeon', '광주': 'Gwangju', 
        '대구': 'Daegu', '부산': 'Busan', '울산': 'Ulsan', 
        '제주': 'Jeju', '전주': 'Jeonju', '경주': 'Gyeongju'
    }

    // weatherList 배열을 돌면서 각각의 도시 날씨를 요청합니다.
    for (let i = 0; i < weatherList.value.length; i++) {
        const city = weatherList.value[i]
        
        // 💡 매칭 테이블에서 영어 이름을 가져옵니다.
        const engName = cityEngNames[city.name] 
        
        // 💡 try-catch를 for문 안으로 넣어서, 하나가 실패해도 다음 도시로 넘어가게 합니다!
        try {
            // 1. 기존: 실시간 날씨 데이터 요청
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${engName}&appid=${API_KEY}&units=metric&lang=kr`
            const response = await axios.get(url)
            const realData = response.data

            weatherList.value[i].temp = realData.main.temp           
            weatherList.value[i].apparentTemp = realData.main.feels_like
            weatherList.value[i].humidity = realData.main.humidity   
            weatherList.value[i].windSp = realData.wind.speed        
            weatherList.value[i].windDirect = getWindDirection(realData.wind.deg)
            weatherList.value[i].status = realData.weather[0].description 
            weatherList.value[i].sunriseTime = formatTime(realData.sys.sunrise, realData.timezone)
            weatherList.value[i].sunsetTime = formatTime(realData.sys.sunset, realData.timezone)
            
            // 💡 2. 추가: 방금 받아온 데이터에서 위도(lat)와 경도(lon) 추출
            const lat = realData.coord.lat
            const lon = realData.coord.lon

            // 💡 3. 추가: 추출한 위경도로 대기오염도 API 호출
            const pollutionUrl = 'https://api.openweathermap.org/data/2.5/air_pollution'
            const pollutionResponse = await axios.get(pollutionUrl, {
              params: { lat, lon, appid: API_KEY }
            })
            const pollutionData = pollutionResponse.data

            // 💡 4. 추가: 미세먼지(PM10) 수치를 진짜 데이터로 덮어씌우기
            // (OWM 데이터 구조상 list[0].components.pm10 에 미세먼지 값이 있습니다)
            weatherList.value[i].dust = pollutionData.list[0].components.pm10
            weatherList.value[i].ultraDust = pollutionData.list[0].components.pm2_5

            const uvUrl = 'https://api.openweathermap.org/data/2.5/uvi'
            const uvResponse = await axios.get(uvUrl, {
              params: { lat, lon, appid: API_KEY }
            })
            weatherList.value[i].uv = uvResponse.data.value
            
        } catch (error) {
            // 어떤 도시에서 에러가 났는지 콘솔에 띄워줍니다.
            console.error(`❌ [${city.name}] 날씨 데이터를 가져오는데 실패했습니다.`, error)
        }
    }
    console.log("✅ 실시간 날씨 데이터 연동 완료!")
}

// 💡 화면이 처음 켜질 때(Mount) 위에서 만든 함수를 자동으로 실행합니다.
onMounted(() => {
    fetchRealWeather()
})

//computed
// 날씨 리스트 중 사용자가 입력한 검색어(searchQuery)에 포함된 항목만 필터링
const filteredWeatherList= computed(()=>{
  return weatherList.value.filter((weather) => {
    return weather.name.includes(searchQuery.value) 
  })
})
const dustfilteredList = computed(()=> {
  if(configStore.isDustAlertMode){
    return filteredWeatherList.value.filter((weather)=>{
      return weather.dust >= 50
    })
  }
  return filteredWeatherList.value
})

// 반응형 함수
const showDetail = (cityId) => {
  // window.alert()는 지우고, router.push()를 사용해 해당 경로로 강제 이동시킵니다.
  router.push('/weather/' + cityId) 
}
const updateMessage = (cityName) => {
    selectedCityInfo.value = `[${cityName}]이 선택되었습니다.`
}

//watch,watchEffect
watch (selectedCityInfo,(newInfo,oldInfo)=>{
  console.log(`[watch 감지] 상태 바 문구 업테이트: ${oldInfo} -> ${newInfo}`)
})
watchEffect(() => {
  console.log(`[watchEffect 자동 감지] 현재 검색어 ${searchQuery.value}에 매칭되는 API 데이터 서칭`)
}) 
watchEffect(()=>{
  console.log(`[watchEffect 자동 감지]미세 먼지 경보 지역 표시 : ${isDustAlertMode.value}`)
})





</script>

<template>
    <h1>오늘의 날씨</h1>
    <BaseDashboardCard>
        <SearchBar :searchQuery="searchQuery" @update-query="searchQuery = $event"/>
    </BaseDashboardCard>
    
    <BaseDashboardCard>
        
        <div class="stats-header">
            <h2>지역별 날씨 현황</h2>
            <DustFilterButton />
        </div>
        <ul class="card-container" v-if="dustfilteredList.length > 0">
            <WeatherCard 
                v-for="weather in dustfilteredList" 
                :key="weather.id" 
                :weather="weather"
                @select-card="updateMessage"
                @click-detail="showDetail"
            />
        </ul>
        <p v-else> 검색 결과와 일치하는 도시가 없습니다.</p>

    </BaseDashboardCard>
        <div class="selected-info">
            <p>{{ selectedCityInfo }}</p>
        </div>
    <div>

    </div>
    

</template>

<style scoped>
    /* 카드들을 격자(Grid)로 배치하는 부모용 CSS */
    .card-container {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); 
        gap: 20px;
    }
    
    .selected-info {
        font-size: 1.1rem;
        background-color: #b8ffa7;
        padding: 5px; 
        border-radius: 5px; 
        color: rgb(17, 117, 0);
    }

    /* === 미세먼지 필터 버튼 및 헤더 디자인 === */
    
    /* 제목과 버튼을 양끝 정렬하여 한 줄에 배치 */
    .stats-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }

    .stats-header h2 {
        margin: 0; /* 제목의 기본 여백 제거 */
    }

    /* 토글 버튼 기본 (꺼진 상태) */
    .filter-btn {
        padding: 8px 16px;
        border: 2px solid #e0e0e0;
        background-color: #ffffff;
        color: #888;
        border-radius: 20px; /* 둥근 알약 모양 */
        cursor: pointer;
        font-weight: bold;
        font-size: 0.9rem;
        transition: all 0.2s ease; /* 부드러운 색상 전환 효과 */
    }

    /* 토글 버튼 활성화 (켜진 상태) */
    .filter-btn.active {
        border-color: #f63b3b;      /* 파란색 테두리 */
        background-color: #ffefef;  /* 연한 파란색 배경 */
        color: #f63b3b;             /* 파란색 글씨 */
        box-shadow: 0 2px 4px rgba(59, 130, 246, 0.1);
    }

</style>