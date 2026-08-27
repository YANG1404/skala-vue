<template>
    <div class="weather-box">
        <!-- 💡 부모 컴포넌트가 작성한 내용이 이 slot 자리에 쏙 들어오게 됩니다! -->
        <slot></slot>
    </div>
</template>

<style scoped>
    /* 기존에 작성하셨던 예쁜 배경 박스 스타일 */
    .weather-box {
        background-color: #e4eaec;
        border: 1px solid #e0e0e0;
        border-radius: 12px;
        padding: 20px;
        margin-bottom: 20px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }
</style>