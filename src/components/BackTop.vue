<template>
    <div>
        <el-backtop :bottom="200">
            <img src="@/assets/up.png" class="up" alt="" />
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
