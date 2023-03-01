<template>
    <div class="loader">
        <div class="loader__bar" style="--line-index: 1"></div>
        <div class="loader__bar" style="--line-index: 2"></div>
        <div class="loader__bar" style="--line-index: 3"></div>
        <div class="loader__bar" style="--line-index: 4"></div>
        <div class="loader__bar" style="--line-index: 5"></div>
        <div class="loader__ball"></div>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.loader {
    position: relative;
}

.loader__bar {
    position: absolute;
    bottom: 0;
    left: calc((var(--line-index) - 1) * 15px);
    width: 10px;
    height: 50px;
    background: #33cc99;
    transform-origin: center bottom;
    box-shadow: 1px 1px 0 rgba(0, 0, 0, 0.2);
    animation: bar 4s infinite;
}

.loader__ball {
    position: absolute;
    bottom: 10px;
    left: 0;
    width: 10px;
    height: 10px;
    background: #09f;
    border-radius: 50%;
    animation: ball 4s infinite;
}

@keyframes ball {
    0%,
    100% {
        transform: translate(0, 0);
    }
    5% {
        transform: translate(8px, -14px);
    }
    10% {
        transform: translate(15px, -10px);
    }
    17% {
        transform: translate(23px, -24px);
    }
    20% {
        transform: translate(30px, -20px);
    }
    27% {
        transform: translate(38px, -24px);
    }
    30% {
        transform: translate(45px, -10px);
    }
    37% {
        transform: translate(53px, -14px);
    }
    40%,
    50% {
        transform: translate(60px, 0);
    }
    57% {
        transform: translate(53px, -14px);
    }
    60% {
        transform: translate(45px, -10px);
    }
    67% {
        transform: translate(37px, -24px);
    }
    70% {
        transform: translate(30px, -20px);
    }
    77% {
        transform: translate(22px, -24px);
    }
    80% {
        transform: translate(15px, -10px);
    }
    87% {
        transform: translate(7px, -14px);
    }
    90% {
        transform: translate(0, 0px);
    }
}

@keyframes bar {
    0%,
    100% {
        transform: scaleY(calc(var(--line-index) * 0.2));
    }
    50% {
        transform: scaleY(calc((6 - var(--line-index)) * 0.2));
    }
}
</style>
