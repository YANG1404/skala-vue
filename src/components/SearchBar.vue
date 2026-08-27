<script setup>
import { defineEmits,defineProps } from 'vue';

defineProps({ searchQuery: String })

const emit = defineEmits(['update-query'])

const onInput = (event) => {
    emit('update-query',event.target.value)
}
</script>

<template>
    <div>
        <h2>도시 검색</h2>
        <input :value="searchQuery" @input="onInput" placeholder="검색할 도시 이름 입력" class="inputbox"/>
        <p>검색 중인 도시: {{searchQuery}}</p>
    </div>
</template>

<style scoped>
    .inputbox {
        width: 80%;
        height: 40px;
        border: 1px solid #000000;  
        font-size: 20px;
    }
</style>