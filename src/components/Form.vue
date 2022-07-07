<template>
    <div class="main">
        <h1 class="title">发布文章</h1>
        <!-- <el-divider /> -->
        <div class="content">
            <div class="item">
                <p>*添加标签</p>
                <el-select v-model="form.current_lbael" filterable placeholder="请选择标签">
                    <el-option v-for="item in form.label" :key="item" :label="item" :value="item" />
                </el-select>
            </div>
            <div class="item">
                <p>文章封面</p>
                <span>asdasd1</span>
            </div>
            <div class="item">
                <p>编辑摘要：</p>
                <el-input v-model="form.desc" maxlength="100" placeholder="输入内容" show-word-limit type="textarea" />
            </div>
        </div>
        <!-- <el-divider /> -->
        <div class="btn">
            <el-button>取消</el-button>
            <el-button type="primary">确定并发布</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { grtTag } from '@/api';
import { onMounted, reactive } from 'vue'


const form = reactive({
    label: ['JavaScript', 'CSS', 'Vue', 'React', 'Angular'],
    current_lbael: <string>'',
    desc: <string>'',
})
</script>

<style scoped lang="scss">
.main {
    width: 100%;
    height: 100%;
    padding: 10px;
    text-align: justify;
    .title {
        @include font-set($font20, #1a1a1a, 500, 1.4);
        padding-top: 10px;
    }
    .content {
        width: 100%;
        .item {
            @include flex-auto();
            margin-top: 20px;
            p {
                width: 100px;
            }
			.f1 {
				flex: 1;
			}
        }
    }
    .btn {
        margin-top: 20px;
        text-align: right;
    }
}
</style>
