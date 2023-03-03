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
    <template v-if="state.flag">
        <Popup :show="state.flag" :update-data="updateData" @onCancel="onCancel" @onSuccess="sumbit" />
    </template>
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
// import 'juejin-markdown-themes/dist/scrolls-light.css'
import 'juejin-markdown-themes/dist/geek-black.min.css'
import { nextTick, onMounted, reactive, ref } from 'vue'
import { addBlog, getBlogDetails, updateBlog } from '@/api'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import axios from 'axios'
const plugins = [gfm(), highlight(), breaks(), frontmatter(), footnotes(), gemoji(), mediumZoom()]



const route = useRoute()
const router = useRouter()
const state = reactive({
    value: <string>'',
    maxLength: <number>200,
    title: <string>'',
    flag: <boolean>false,
    type: <string>'add',
    blogId: 0,
})
const updateData = ref<any>({})

onMounted(() => {
    console.log('start')
    let id = route?.params?.id
    console.log('id', id)
    // 开始更新的逻辑
    if (id && id !== '0') {
        updateInfo(+id)
        state.blogId = +id
        state.type = 'update'
    }

    // 隐藏右边目录
    // nextTick(() => {
    //     let rightMenu: any = document.querySelector('.bytemd-toolbar-right')
    //     console.log(rightMenu)
    //     rightMenu.style = "display: none;"
    // })
})

const handleChange = (val: any) => {
    // console.warn(val)
    state.value = val
}

const uploadImage = async (files: any) => {
    console.log('files', files)
    const {
        data: { url },
    } = await sumbitImage(files[0])
    console.warn('图片链接', url)
    return [
        {
            title: files.map((i: any) => i.name),
            url,
        },
    ]
}

const sumbitImage = async (file: any) => {
    const data = new FormData()
    data.append('file', file)
    // 服务器图片接口地址，
    const result = await axios.post('', data, {
        headers: { 'content-Type': 'multipart/form-data' },
    })
    console.log(result)
    return result?.data
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

    // 更新逻辑
    if (state.type === 'update') {
        let items = JSON.parse(item)
        fixBlogDetail(items)
        return
    }

    const { data, code } = await addBlog({
        title,
        desc,
        content: value,
        cover,
        tag: JSON.stringify(label),
    })

    console.log(data, code)

    if (code === 200) {
        ElMessage.success('增加成功...,正在返回首页')
        setTimeout(() => {
            router.push('/')
        }, 1000)
    }
}

const onCancel = () => {
    state.flag = !state.flag
}

const gohome = () => {
    router.push('/')
}

const updateInfo = async (id: number) => {
    const { data, code } = await getBlogDetails({ blogid: id, type: 'update' })
    console.log(data)
    if (code !== 200) {
        console.log('请求失败')
        return
    }
    let { info, detail } = data || {}
    state.value = detail?.content
    state.title = info?.title
    updateData.value = info
}

const fixBlogDetail = async (item: any) => {
    let { value, title, blogId } = state
    let { desc, cover, label } = item
    const { data, code } = await updateBlog({
        id: blogId,
        title,
        desc,
        content: value,
        cover,
        tag: JSON.stringify(label),
    })

    if (code === 200) {
        ElMessage.success('更新成功...,正在返回首页')
        setTimeout(() => {
            console.log(data)
            router.back()
        }, 1000)
    }
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
