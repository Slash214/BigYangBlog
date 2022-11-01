<template>
    <div>
        <el-backtop :bottom="200">
            <!-- <div
                style="
                    height: 100%;
                    width: 100%;
                    background-color: var(--el-bg-color-overlay);
                    box-shadow: var(--el-box-shadow-lighter);
                    text-align: center;
                    line-height: 40px;
                    color: #1989fa;
                "
            >
                Top
            </div> -->
            <img src="@/assets/up.png" class="up" alt="">
        </el-backtop>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.up {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
}
</style>
