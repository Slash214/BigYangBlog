<template>
    <header class="headers">
        <div class="safe_area">
            <div class="logo">
                <router-link tag="h4" to="/">大羊博客</router-link>
                <a target="_blank" href="https://github.com/Slash214/vite-vue3-lovehaha-webSite">GitHub</a>
                <router-link tag="a" to="/about">关于项目</router-link>
                <router-link tag="a" to="/admin">增加博客</router-link>
            </div>
            <div class="link">
                <el-button type="success" plain @click="login">管理员登录</el-button>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
    const token = localStorage.getItem('token')
    if (token) {
        console.log('管理员登录')
    }
})

const login = async () => {
    console.log('登录')
}
</script>

<style scoped lang="scss">
.headers {
    height: $h60;
    line-height: $h60;
    background-color: #fff;
    .safe_area {
        @include flex-auto(center, space-between);
        .logo {
            width: 50%;
            @include flex-auto();
            h4 {
                @include font-set($font18, $black, 600, 1.5);
                line-height: $h60;
                width: 120px;
                //   text-align: center;
            }
            a {
                padding-right: 30px;
				display: inline-block;
				line-height: 1.5;
                color: #888;
                &:hover {
                    color: #753bfe;
                }
            }
        }
    }
}
</style>
