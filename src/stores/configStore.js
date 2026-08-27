import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// 'config'는 이 스토어의 고유한 이름(ID)입니다.
// 관례적으로 use + 스토어이름 + Store 형태로 변수명을 짓습니다.
export const useConfigStore = defineStore('config', () => {
  
  // 1. State (상태) : 컴포넌트의 ref()와 똑같습니다.
  const unit = ref('celsius')
  const unitSymbol = computed(() => { return unit.value === 'celsius' ? '°C' : '°F' })
  const toggleUnit = () => { unit.value = unit.value === 'celsius' ? 'fahrenheit' : 'celsius' }

// 💡 --- 새로 추가할 미세먼지 관련 코드 ---
  // 1. State: 미세먼지 모드 켜짐/꺼짐 상태 (기본값: false)
  const isDustAlertMode = ref(false)
  
  // 2. Action: 미세먼지 모드를 껐다 켰다 하는 함수
  const toggleDustMode = () => {
    isDustAlertMode.value = !isDustAlertMode.value
  }

  // 3. 잊지 말고 return 바구니에 추가해서 내보내주세요!
  return { 
    unit, unitSymbol, toggleUnit, 
    isDustAlertMode, toggleDustMode // 💡 여기 추가!
  }
})