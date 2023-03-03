<template>
    <div class="safe_area">
        <el-tabs tab-position="left" class="demo-tabs">
            <el-tab-pane label="图片操作">
                <div class="upload">
                    <Upload></Upload>
                </div>
            </el-tab-pane>
            <el-tab-pane label="随机密钥">随机密钥</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
</script>

<style scoped lang="scss">
.safe_area {
    margin: 20px auto;
    min-height: 80vh;
    background-color: #fff;
    .demo-tabs {
        padding: 20px 0;
		.upload {
			padding: 0 20px;
		}
    }
}
</style>
