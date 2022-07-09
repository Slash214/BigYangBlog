<template>
    <header class="headers">
        <div class="safe_area">
            <div class="logo">
                <router-link tag="h4" to="/">大羊博客</router-link>
                <a target="_blank" href="https://github.com/Slash214/vite-vue3-lovehaha-webSite">GitHub</a>
                <router-link tag="a" to="/about">关于项目</router-link>
                <router-link tag="a" to="/admin" v-if="isLogin">增加博客</router-link>
            </div>
            <div class="link">
                <el-button v-if="!isLogin" type="success" plain @click="changeDialog">管理员登录</el-button>
                <div v-else class="info">
                    <el-avatar :src="userinfo.avatar" :size="45"></el-avatar>
                    <span>{{ userinfo.nickname }}</span>
                </div>
            </div>
        </div>
    </header>
    <el-dialog
        :close-on-click-modal="false"
        v-model="dialogVisible"
        title="管理员登陆"
        width="400px"
        :before-close="changeDialog"
    >
        <div class="dialog">
            <el-input placeholder="用户名" v-model="username" maxlength="20"></el-input>
            <el-input placeholder="请输入密码" v-model="password" type="password"></el-input>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="changeDialog">取消</el-button>
                <el-button type="primary" @click="login">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { onMounted, ref } from 'vue'
import { usrLogin } from '@/api'


const dialogVisible = ref<boolean>(false)
const username = ref<string>('')
const password = ref<string>('')
const isLogin = ref<boolean>(false)
const userinfo = ref<any>({})

onMounted(() => {
    const token = localStorage.getItem('BigYangBlog_Token')
    const userInfo: any = localStorage.getItem('BigYangBlog_userinfo')
    if (token) {
        console.log('管理员登录')
        userinfo.value = JSON.parse(userInfo)
        isLogin.value = true
    } else isLogin.value = false
})

const login = async () => {
    console.log('登录')
    console.log(username.value, password.value)
    const { data, code, message } = await usrLogin({
        username: username.value,
        password: password.value,
    })

    if (message && code !== 200) {
        ElMessage.error(message)
        isLogin.value = false
        return
    }

    let { token, id, avatar, nickname, level } = data || {}

    localStorage.setItem('BigYangBlog_Token', token)
    let item = { id, avatar, nickname, level }
    userinfo.value = item
    localStorage.setItem('BigYangBlog_userinfo', JSON.stringify(item))
    console.log('data', data)
    ElMessage.success('登陆成功... 正在重新加载...')
    setTimeout(() => {
        changeDialog()
        isLogin.value = true
    }, 800)
}

const changeDialog = () => {
    dialogVisible.value = !dialogVisible.value
}
</script>

<style scoped lang="scss">
.headers {
    height: $h60;
    line-height: $h60;
    background-color: #fff;
    .safe_area {
        @include flex-auto(false, space-between);
        height: $h60;
        line-height: $h60;
        .logo {
            width: 50%;
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
        .link {
            .info {
                @include flex-auto(center);
                span {
                    padding-left: 10px;
                    color: #6fccee
                }
            }
        }
    }
}

.dialog {
    @include flex-auto(center, center, column);
    .el-input {
        width: 50%;
        margin: 0 auto;
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    }
}
</style>
