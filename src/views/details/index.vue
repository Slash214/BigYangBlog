<template>
    <div class="safe_area">
        <div class="blog_title whites">
            <h1 class="title mb20">刚学会Transform，你告诉我就要被移除了</h1>
            <div class="info">
                <el-avatar :size="50" src="https://img.pinkyang.cn/2022.07.01-girl.jpeg" />
                <div class="user">
                    <span>不务正业的程序员</span>
                    <time>2022年7月1日 11：45</time>
                </div>
                <el-button type="primary" plain>+点赞</el-button>
            </div>
        </div>

        <div class="blog_content whites">
            <MdViewer :value="state.content" />
        </div>

        <div class="blog_comment whites">
            <div class="mb20">
                <el-input
                    class="mb10"
                    maxlength="40"
                    v-model="state.remake"
                    type="textarea"
                    placeholder="友善的评论会发光哦"
                />
                <el-button class="btns" type="success">评论</el-button>
            </div>
            <div class="list">
                <Comment :remake="item" v-for="item in kk" :key="item.id" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { grtBlogDetails } from '@/api'
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const kk = [
    {
        id: 1,
        content: '安德森扩大ask大卡司可是看到篇科普哦扣欧派开怕23怕篇',
        time: '2022年4月23',
        nickname: '阿萨大',
    },
]

const state = reactive({
    remake: <string>'',
    content: <any>``
})



onMounted(async () => {
    console.log('详情')
    let id = route.params.id
    console.log(route.params)
    const { data, code } = await grtBlogDetails({ blogid: +id })

    console.log(data, code)
    if (code === 200) {
        state.content = data.content
        console.warn(data.content)
    }
})





</script>

<style scoped lang="scss">
.safe_area {
    min-height: 90vh;
    .whites {
        background-color: $white;
        padding: 20px;
    }
    .blog_title {
        margin-top: 20px;
        .title {
            @include font-set($font32, #222, 600, 1.3);
        }
        .info {
            @include flex-auto(center, space-between);
        }
        .user {
            width: 87%;
            height: 40px;
            @include flex-auto(false, space-between, column);
            span {
                @include font-set($font16, #515151, false, 1.4);
            }
            time {
                @include font-set($font14, #8a8a8a, false, 1.4);
            }
        }
    }
    .blog_comment {
        margin: 20px 0;
        .btns {
            display: flex;
            flex-direction: row-reverse;
        }
    }
    .blog_content {
        .viewer {
            min-height: 50vh;
            width: 100%;
        }
    }
}
</style>
