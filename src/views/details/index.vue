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
            <ul>
                <li v-for="item in 400">内容{{ item }}</li>
            </ul>
        </div>

        <div class="blog_comment whites">
            <div class="mb20">
                <el-input class="mb10" maxlength="40" v-model="state.remake" type="textarea" placeholder="友善的评论会发光哦" />
                <el-button class="btns" type="success">评论</el-button>
            </div>
            <div class="list">
                <Comment :remake="item" v-for="item in kk" :key="item.id" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'

const kk = [
    {
        id: 1,
        content: '安德森扩大ask大卡司可是看到篇科普哦扣欧派开怕23怕篇',
        time: '2022年4月23',
        nickname: '阿萨大',
    },
]

onMounted(() => {
    console.log('详情')
})

const state = reactive({
    remake: <string>'',
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
}
</style>
