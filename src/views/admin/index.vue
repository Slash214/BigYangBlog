<template>
    <div class="admin">
        <div class="opts">
            <div class="left">
                <input class="custinput" v-model="state.title" placeholder="输入文章标题..." maxlength="80" />
            </div>
            <div class="right">
                <el-button @click="gohome">返回首页</el-button>
                <el-button @click="onCancel" type="primary">发布</el-button>
                <el-avatar
                    src="https://img2.baidu.com/it/u=2744676768,2143551610&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=502"
                    :size="45"
                ></el-avatar>
            </div>
        </div>
        <Editor
            class="editos"
            :value="state.value"
            :plugins="plugins"
            :locale="zhHans"
            @change="handleChange"
            :uploadImages="uploadImage"
        />
    </div>
    <Popup :show="state.flag" @onCancel="onCancel" @onSuccess="sumbit" />
</template>

<script setup lang="ts">
import 'bytemd/dist/index.css'
import { Editor } from '@bytemd/vue-next'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import breaks from '@bytemd/plugin-breaks'
import footnotes from '@bytemd/plugin-footnotes'
import frontmatter from '@bytemd/plugin-frontmatter'
import gemoji from '@bytemd/plugin-gemoji'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import zhHans from 'bytemd/locales/zh_Hans.json'
import 'juejin-markdown-themes/dist/juejin.min.css'
import { onMounted, reactive } from 'vue'
import { addBlog } from '@/api'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
const plugins = [gfm(), highlight(), breaks(), frontmatter(), footnotes(), gemoji(), mediumZoom()]

const router = useRouter()
const state = reactive({
    value: <string>'',
    maxLength: <number>200,
    title: <string>'',
    flag: <boolean>false
})

onMounted(() => {
    console.log('start')
})

const handleChange = (val: any) => {
    // console.warn(val)
    state.value = val
}

const uploadImage = async (files: any) => {
    console.log('files', files)
    return [
        {
            title: files.map((i: any) => i.name),
            url: 'http',
        },
    ]
}

// 这里去提交
const sumbit = async (item: any) => {
    // console.log(item)
    // console.log(JSON.parse(item))
    // value 富文本 md 内容，  title 博客标题    item 封面，标签，desc 文章摘要
    let { title, value } = state
    let { desc, cover, label } = JSON.parse(item)
    if (!title || !value) {
        ElMessage.warning('请填写标题和文章内容')
        return
    }

    const { data, code } = await addBlog({
        title,
        desc,
        content: value,
        cover,
        tag: JSON.stringify(label)
    })

    console.log(data, code)

    if (code === 200) {
        ElMessage.success('增加成功...,正在返回首页')
        setTimeout(() => {
            router.push('/')
        }, 1000);
    }
    
}

const onCancel = () => {
   state.flag = !state.flag
}


const gohome = () => {
    router.push('/')
}

</script>

<style lang="scss">
.admin {
    touch-action: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    .opts {
        padding: 0 40px;
        background-color: $white;
        border: 0 1px 0 1px solid #e1e4e8;
        @include flex-auto(center, space-between);
        height: 63px;
        .left {
            width: 70%;
            flex: 1 1 auto;
            height: 100%;
            @include flex-auto(center);
            .custinput {
                font-size: 24px;
                font-weight: 500;
                color: #1d2129;
                border: none;
                outline: none;
                box-sizing: border-box;
                width: 100%;
            }
        }
        .right {
            flex: 1;
            @include flex-auto(center);
            .el-button {
                border-radius: 0px;
                margin-right: 10px;
            }
            .el-avatar {
                margin-left: 20px;
            }

        }
    }
    .editos {
        .bytemd {
            height: calc(100vh - 63px) !important;
        }
    }
}
</style>
