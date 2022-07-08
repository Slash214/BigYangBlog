<template>
    <div class="comment">
        <el-avatar src="https://img.pinkyang.cn/2022.07.01-girl.jpeg" :size="50"></el-avatar>
        <div class="content">
            <div class="info">
                <span>{{ remake.nickname }}</span>
                <span>{{ remake.ago }}</span>
            </div>
            <p>{{ remake.content }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { comment } from '@/typings'

const props = defineProps({
    remake: {
        type: Object,
        default: () => <comment>{},
    },
})
</script>

<style scoped lang="scss">
.comment {
    width: 100%;
    margin-bottom: 20px;
    @include flex-auto(center);
    .el-avatar {
        margin-right: 15px;
    }
    .content {
        padding-top: 15px;
        flex: 1;
        .info {
			@include flex-auto(center, space-between);
            span {
                display: inline-block;
                padding-bottom: 10px;
                line-height: 1.5;
                color: #333;
            }
        }
        p {
            @include font-set($font14, #666, false, 1.4);
        }
    }
}
</style>
