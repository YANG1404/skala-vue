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
import {ref, computed, watch, watchEffect} from 'vue'
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
const isDustAlertMode = ref(true)



//computed
// 날씨 리스트 중 사용자가 입력한 검색어(searchQuery)에 포함된 항목만 필터링
const filteredWeatherList= computed(()=>{
  return weatherList.value.filter((weather) => {
    return weather.name.includes(searchQuery.value) 
  })
})
const dustfilteredList = computed(()=> {
  if(isDustAlertMode.value){
    return filteredWeatherList.value.filter((weather)=>{
      return weather.dust>=50
    })
  }
  return filteredWeatherList.value
})

// 반응형 함수
const showDetail = (cityName, status) => {
window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
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
    <h1>과제 1: 날씨 (Mockup)</h1>
    <button @click="isDustAlertMode = !isDustAlertMode">미세먼지 경보 on/off </button>
    <p>미세먼지 경보 지역 필터: {{ isDustAlertMode }}</p>
    <div class="weather searching">
        <h2>도시 검색</h2>
        <input :value="searchQuery" @input="searchQuery = $event.target.value" placeholder="검색할 도시 이름 입력" class="inputbox"/>
        <p>검색 중인 도시: {{searchQuery}}</p>

    </div>
    
    <div class="weather stats">
        <h2>지역별 날씨 현황</h2>
        <ul class="card-container" v-if="dustfilteredList.length > 0">
            <li @click="updateMessage(weather.name)" v-for="weather in dustfilteredList" :key="weather.id" class="weather-card" >
                <h3>{{weather.name}}</h3>
                <p >현재 온도: {{ weather.temp }}</p>
                <p class="hot" v-if="weather.temp >= 25.0">🔥 더움</p>
                <p class="cool" v-else>🍃 선선함</p>
                <button @click.stop="showDetail(weather.name, weather.status)">상세보기</button>
            </li>
        </ul>
        <p v-else> 검색 결과와 일치하는 도시가 없습니다.</p>
    </div>
        <p>{{ selectedCityInfo }}</p>
    <div>

    </div>
    

</template>

<style scoped>
    .weather {
        background-color: #e4eaec;      /* 배경색 흰색 */
        border: 1px solid #e0e0e0;      /* 연한 회색 테두리 */
        border-radius: 12px;            /* 모서리 둥글게 */
        padding: 20px;                  /* 안쪽 여백 */
        margin-bottom: 20px;            /* 박스 아래쪽 바깥 여백 (박스 간 간격) */
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); /* 부드러운 그림자 */
    }
    .inputbox {
        width: 80%;
        height: 40px;
        border: 1px solid #000000;  
        font-size: 20px;
    }

    /* === 추가할 카드 디자인 CSS === */

    /* 1. 리스트 컨테이너 설정 (Grid 레이아웃) */
    .card-container {
        list-style: none;         /* 기본 리스트 점 없애기 */
        padding: 0;               /* 기본 여백 없애기 */
        margin: 0;
        display: grid;            /* 격자 형태 레이아웃 사용 */
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); /* 화면 크기에 맞춰 카드 개수 자동 조절 */
        gap: 16px;                /* 카드 사이의 간격 */
    }

    /* 2. 개별 카드 디자인 */
    .weather-card {
        background-color: #f8f9fa;          /* 카드 배경색 (아주 연한 회색) */
        border: 1px solid #e0e0e0;          /* 카드 테두리 */
        border-radius: 8px;                 /* 카드 모서리 둥글게 */
        padding: 20px;                      /* 카드 안쪽 여백 */
        text-align: center;                 /* 글자 가운데 정렬 */
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02); /* 옅은 그림자 */
        transition: transform 0.2s ease;    /* 애니메이션 속도 설정 */
    }

    /* 마우스 올렸을 때 애니메이션 (선택사항) */
    .weather-card:hover {
        transform: translateY(-5px);        /* 위로 살짝 떠오르는 효과 */
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1); /* 그림자 진하게 */
    }

    /* 3. 카드 안의 텍스트 디자인 */
    .weather-card h3 {
        margin: 0 0 10px 0;
        font-size: 1.2rem;
        color: #333;
    }
    
    .weather-card .hot {
        margin: 0;
        font-size: 1.1rem;
        font-weight: bold;
        color: #ff0000; /* 온도 글자색 (파란색) */
    }

    .weather-card .cool {
        margin: 0;
        font-size: 1.1rem;
        font-weight: bold;
        color: #007bff; /* 온도 글자색 (파란색) */
    }

</style>